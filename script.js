$(document).ready(function() {
  $('.header').height($(window).height());
  
  $('.carousel-item.active div').hide();
	$('.carousel-item div').hide();

	$('#index_carousel').on('slide.bs.carousel', function () {
		$('.carousel-item.active div').hide();
		$('.carousel-item div').hide();
		$('.carousel-item video').trigger('play'); // play next
		$('.carousel-item.active video').trigger('pause'); // stop previous
	})

	$(".carousel-item video").click(function () {
		$('.carousel-item.active div span').text('PAUSED');
		$('.carousel-item div').hide();
		if (this.paused) {
			$('.carousel-item.active div').hide();
			this.play();
		} else {
			$('.carousel-item.active div').show();
			this.pause();
		}
	});

	$("video").bind("ended", function () {
		$('.carousel-item div span').text('REPLAY');
		$('.carousel-item div').show();
	});

	$('.carousel-item div').click(function () {
		$('.carousel-item video').trigger('play');
		$('.carousel-item.active div').hide();
		$('.carousel-item div').hide();
	});
 
});

var generateVtuber = function(){
  $.ajax({
    type: 'GET',
    url: 'Vtubers.json',
    dataType: 'json',
    success: function (data) {console.log("test")
      for (var i = 0; i < data.length; i++) {
        var row = $(
          '<tr>' +
          '<td>' + data[i].channelTitle + '</td>' + 
          '<td>' + data[i].channelId + '</td>' +
          '<td>' + '<a target="_blank" href="'+ data[i].channelUrl + '">' + '<img class = "vtuberImg" src="' + data[i].thumbnails +'">' + "</a>" +'</td>' +
          '<td>' + data[i].subscriberCount + '</td>'+
          '</tr>'
          );
        $('#myTable').append(row);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('Error: ' + textStatus + ' - ' + errorThrown);
    }
  });
};

var saveFile = function(){
  // Get the data from each element on the form.
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const message = document.getElementById('message').value

  var error = ""
  if (name==""){
   error += "<p>Please enter your name!</p>"
  }
  if (email==""){
    error += "<p>Please enter an email!</p>"
  }else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
  {
    error += "<p>Invalid email!</p>"
  }
  
  if (error != ""){
    document.getElementById("modalAlert").innerHTML = error;
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    return
  }
  
  // This variable stores all the data.
  let data = 
  '\r Name: ' + name + ' \r\n ' + 
  'Email: ' + email + ' \r\n ' + 
  'Message: ' + message;

  // Convert the text to BLOB.
  const textToBLOB = new Blob([data], { type: 'text/plain' });
  const sFileName = 'formData.txt';	   // The file to save the data.

  let newLink = document.createElement("a");
      newLink.download = sFileName;

      if (window.webkitURL != null) {
          newLink.href = window.webkitURL.createObjectURL(textToBLOB);
      }
      else {
          newLink.href = window.URL.createObjectURL(textToBLOB);
          newLink.style.display = "none";
          document.body.appendChild(newLink);
      }

      newLink.click(); 
}

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
