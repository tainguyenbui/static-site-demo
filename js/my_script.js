$(function() {

  $('#parse-email').click(function() {

  	var url = $('#url-input').val();

  	if (!url || 0 === url.length) {
		alert("Please insert the URL of the Azure Function");
  		return;
  	}

    $.post(url, $('#parse-input').val())
    	.done(function(data){
    		$('#output-status').text("Success");
    		$('#parse-output').text(data);
    	})
    	.fail(function(xhr){
    		var message = "Internal Server Error " + xhr.status;

    		if (xhr.status == 400) {
    			message = 'Check input.\r\nBad Request ' + xhr.status;
    		}

    		alert(message);
    	});
  });

  $('#clear-input').click(function() {
  	clear();
  });

  $("li.custom-input").click(function() {
  	clear();
  });

  $("li.no-emails").click(function() {
  	populateInput('https://raw.githubusercontent.com/tainguyenbui/static-site-demo/master/test/fixtures/200_valid_no_emails.txt');
  });

  $("li.hotmail-input").click(function() {
  	populateInput('https://raw.githubusercontent.com/tainguyenbui/static-site-demo/master/test/fixtures/200_valid_hotmail.txt');
  });

  $("li.outlook-input").click(function() {
	populateInput('https://raw.githubusercontent.com/tainguyenbui/static-site-demo/master/test/fixtures/200_valid_outlook.txt');
  });

  $("li.outlook-hotmail-native-web").click(function() {
	populateInput('https://raw.githubusercontent.com/tainguyenbui/static-site-demo/master/test/fixtures/200_valid_hotmail_outlook_native_web.txt');
  });

  $("li.gmail-english-input").click(function() {
  	populateInput('https://raw.githubusercontent.com/tainguyenbui/static-site-demo/master/test/fixtures/200_valid_gmail_english.txt');
  });

  $("li.gmail-spanish-input").click(function() {
  	populateInput('https://raw.githubusercontent.com/tainguyenbui/static-site-demo/master/test/fixtures/200_valid_gmail_spanish.txt');
  });

  $("li.combination-gmail-outlook").click(function() {
  	populateInput('https://raw.githubusercontent.com/tainguyenbui/static-site-demo/master/test/fixtures/200_valid_combined_clients.txt');
  });

  function populateInput(url) {
  	clear();
  	$.get(url, function(data) {
   		$('#parse-input').val(data);
	}, 'text');
  }

  function clear() {
  	$('#output-status').text("");
	$('#parse-input').val("");
  }

});