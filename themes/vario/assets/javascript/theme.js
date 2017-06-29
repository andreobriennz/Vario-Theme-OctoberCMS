  $( document ).ready(function() {
    function startCarousel(imageIds, divId, time) {
      for (var i = 0; i < imageIds.length + 1; i++) {
        (function(i){
          window.setTimeout(function(){
            var y = $(imageIds[i]).position();
            if (i === imageIds.length) {
              carousel(imageIds, divId, time);
            } else {
              $("#" + divId + " div").css("right", y.left);
            }
          }, i * time);
        }(i));
      }
    }

    function carousel(imageIds, divId, time) {
        if (typeof(time) === 'undefined') {
            time = 5000;
        }
        if (document.getElementById(divId)) {
            startCarousel(imageIds, divId, time);
        }
    }



    // Define an array of image IDs for carosel
    var imageIds = ["#image1", "#image2", "#image3", "#image4", "#image5", "#image6", "#image7"];

    // State the array of images for the carosel, as well as the ID of the carosel element, and how often each image should change 
    carousel(imageIds, "carousel", 5000);

  });

  function showAbout() {
    document.getElementById('show').style.display = "none";
    document.getElementById('about').style.display = "block";
  }
