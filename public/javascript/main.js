$(function(){ /* to make sure the script runs after page load */

      $('.postContent').each(function(event){ /* select all divs with the postContent class */
      
        var max_length = 200; /* set the max content length before a read more link will be added */
        
        if($(this).html().length > max_length){ /* check for content length */
          
          var short_content   = $(this).html().substr(0,max_length); /* split the content in two parts */
          var long_content  = $(this).html().substr(max_length);
          
          $(this).html(short_content+
                 '<a href="#" class="read_more"><br/>Read More</a>'+
                 '<span class="more_text" style="display:none;">'+long_content+'</span>'+ /* Alter the html to allow the read more functionality */
                 '<a href="#" class="read_less" style="display:none;">Read Less</a>');
                 
          $(this).find('a.read_more').click(function(event){ /* find the a.read_more element within the new html and bind the following code to it */
     
            event.preventDefault(); /* prevent the a from changing the url */
            $(this).hide(); /* hide the read more button */
            $(this).parents('.postContent').find('.more_text').show();
            $(this).parents('.postContent').find('.read_less').show(); /* show the .read-less span */
         
          });
          $(this).find('a.read_less').click(function(event){ /* find the a.read_more element within the new html and bind the following code to it */
     
            event.preventDefault(); /* prevent the a from changing the url */
            $(this).hide(); /* hide the read more button */
            $(this).parents('.postContent').find('.more_text').hide();
            $(this).parents('.postContent').find('.read_more').show(); /* show the .read-less span */
         
          });
          
        }
        
      });
     
     
    });