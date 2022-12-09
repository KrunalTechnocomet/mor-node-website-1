'use strict';

const AWS =require('aws-sdk');
const fs =require('fs');
const config =require('config');
const FileType =require('file-type');
const unzipper =require('unzipper');
const path =require('path');

const fs$ = fs.promises;

const s3 = new AWS.S3({
    region: 'us-east-2',
    apiVersion: '2006-03-01',
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY_SECRET,
    params: { Bucket: config.get('S3BUCKET_NAME') },
});

async function uploadFileToS3(filePath, s3FilePath, uploadOptions = {}) {
    await fs$.access(filePath);
    const stream = fs.createReadStream(filePath);

    const params = {
        Key: s3FilePath,
        Body: stream,
        ACL: 'public-read',
        // ContentType: mime,
        // ContentDisposition: 'inline',
        Bucket:config.get('S3BUCKET_NAME')
    };

    Object.assign(params, uploadOptions);

    if (!params.ContentType) {
        const { mime } = await FileType.fromStream(fs.createReadStream(filePath));
        // => {ext: 'mp4', mime: 'video/mp4'}
        params.ContentType = mime;
    }

    return new Promise((resolve, reject) => {
        s3.upload(params, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

function extractZipFile(zipFilePath) {
    return new Promise((resolve, reject) => {
        const extractedFolder = `${path.dirname(zipFilePath)}/${path.basename(zipFilePath, '.zip')}`;
        fs.createReadStream(zipFilePath)
            .pipe(unzipper.Extract({ path: path.resolve(path.dirname(zipFilePath)) }))
            .on('close', async () => {
                try {
                    const files = await fs$.readdir(`${extractedFolder}/images`);
                    resolve(files);
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

async function uploadPresentation(zipFilePath) {
    // console.log(zipFilePath, 'zipfilepath');
    const s3Folder = `uploads/presentations/${path.basename(zipFilePath, '.zip')}`;
    const files = await extractZipFile(zipFilePath);
    const extractedFolder = `${path.dirname(zipFilePath)}/${path.basename(zipFilePath, '.zip')}`;
    const s3Paths = files.map((file) => (
        {
            filePath: `${extractedFolder}/images/${file}`,
            s3Path: `${s3Folder}/${file}`,
            fileNameIndex: +file.split('.')[0], // to sort file
        }
    ))
        .sort((a, b) => a.fileNameIndex - b.fileNameIndex);

    return Promise.all(s3Paths.map(({ filePath, s3Path }) => uploadFileToS3(filePath, s3Path)));
}

module.exports = {
    uploadFileToS3,
    uploadPresentation
}



                // const s3cdn = config.get('S3_CDN_DOMAIN_NAME');
                // const d = { ...data };

                // if (s3cdn && d?.Location) {
                //     const s3URL = new URL(d.Location);
                //     // replace s3 hostname with cloudfront cdn hostname
                //     const cdnURL = new URL(s3URL.pathname, s3cdn);
                //     d.Location = cdnURL.toString();
                // }

