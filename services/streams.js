"use strict";

const Redis = require('ioredis');
const { sendlikesToStream } = require("../../clientManager.js");
const { sendBeansToStreams } = require('../../clientManager.js');

//const redis = new Redis();
const redis = new Redis("rediss://default:AVNS_FQNI2QUDxHoV23YgmNy@db-redis-blr1-38377-do-user-12043941-0.b.db.ondigitalocean.com:25061");
exports.likes = async(userId, streamId) => {
    try {
        let likes;
        console.log('enter likes');
        likes = await redis.get('like' + streamId);
        // likes.parseInt();
        console.log(parseInt(likes));
        // redis.del(streamId);
        redis.set('like' + streamId, parseInt(likes) + 1);
        sendlikesToStream(userId, streamId, parseInt(likes) + 1);
    } catch (error) { console.log(error); }
};

export const beans = async(userId, streamId, newBeanCount) => {
    try {
        const beanKey = 'beans' + streamId
        const oldBeanCount = await redis.get(beanKey);

        if (!oldBeanCount) {
            oldBeanCount = 0;
        }
        const totalBeans = parseInt(oldBeanCount) + parseInt(newBeanCount);
        await redis.set(beanKey, totalBeans);
        const totalBean = await redis.get(beanKey);
        sendBeansToStreams(userId, streamId, totalBeans);
    } catch (error) {}
};