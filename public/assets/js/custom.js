 $(document).ready(function () 
 {     


    // $(window).load(function(){
    //     $('#header .header-block').tmStickUp({});  
    // }); 

    /***** responsive menu ********/    
    $("#nav a.menu-icon").click(function(e) 
    {
          e.preventDefault();
          $("#nav ul").slideToggle(300);
    });
    if($(window).width() <= 768)
    {
         $("#nav ul li a").click(function() 
         {          
           $("#nav ul").fadeOut(300);
         });
    }
  
    $(document).on("click",".amim_boxs a",function(e) 
    {
        e.preventDefault();

        var url = $(this).attr('data-id');
        
        var str = url.substring(url.indexOf('#')+1);
        if(str != '' && $('#'+str).length > 0) {
            //console.log(url.substring(url.indexOf('#')+1));
          $('html, body').animate({
              scrollTop: $('#' + url.substring(url.indexOf('#')+1)).offset().top - 1
          }, 500);
        }
    });


    $(document).on("change",".uploadButton-input",function() 
    {
        if (typeof (FileReader) != "undefined") 
        {
            var par = $(this).parent().parent().find('.selected_img');
            var selectd_img = $(this).parent().parent().find('.selected_img').find('.uploadImagePreview');
            
            var dvPreview = $(par);
            var id = $(this).attr('id');
            if(this.files[0].size > 6000000)
            {
                // $('#msform').find('#span-error-' + id).html('File Size must be less than 6 MB');
                // setTimeout(function () {
                //     $('#msform').find('#span-error-' + id).html('');
                // }, 10000);
            }
            else
            {
                $(this).parent().parent().addClass('selected');
                dvPreview.show(); 
                $($(this)[0].files).each(function () 
                {
                    var file = $(this);                
                    var reader = new FileReader();
                    reader.onload = function (e) 
                    {
                        selectd_img.attr("src", e.target.result);
                    }
                    reader.readAsDataURL(file[0]);                
                });
            }
        } else 
        {
            alert("This browser does not support HTML5 FileReader.");
        }
    });

    

    $('.bxslider').bxSlider({
        auto: true,
        pager: false,
        autoControls: false,
        speed: 1500,
        mode: 'fade',
        autoHover: true
    });

    $(".owl-carousel").owlCarousel(
     {
        items : 1,
        lazyLoad : true,        
        loop: true,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        dots: true,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
       /* autoHeight : true,*/
        nav : true,
        navText : ["<div class='left-navigation'></div>", "<div class='right-navigation'></div>"],
        responsiveClass:true,
        responsive:
        {
            0:{
                items:1
            },
            640:{
                items:1
            },
            641:{
                items:1
            },  
            1024:{
                items:1
            } 
        }      
    });





    
});


 