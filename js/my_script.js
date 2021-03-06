$(function() {

  $('#parse-email').click(function() {

    $('#alert').html("");

  	var url = $('#url-input').val();

  	if (!url || 0 === url.length) {
      $('#alert').html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error!</strong> Please insert the URL of the Azure Function.</div>');
  		return;
  	}

    $.post(url, $('#parse-input').val())
    	.done(function(data){
    		$('#output-status').text("Success");
        var parsedJson = JSON.parse(data.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    		$('#json-output').html(JSON.stringify(parsedJson, undefined, 2));
    	})
    	.fail(function(xhr){
        $('#json-output').html("");
        $('#output-status').text("");
        if (xhr.status == 0) {
          $('#alert').html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error!</strong> Do you have CORS enabled in Chrome?<a href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi" target="_blank"> Plugin to enable CORS available here.</a></div><div class="alert alert-warning alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Warning!</strong> It is recommended to disable CORS after using this tool. Otherwise other Web Apps may not work as expected.</div>');
        } else {
            var message = "Internal Server Error " + xhr.status;
            if (xhr.status == 400) {
              message = 'Check input.\r\nBad Request ' + xhr.status;
            } 

            $('#alert').html('<div class="alert alert-danger alert-dismissible"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Error!</strong> ' + message + '</div>');
        }
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

  $("li.gmail-french-input").click(function() {
    populateInput('https://raw.githubusercontent.com/tainguyenbui/static-site-demo/master/test/fixtures/200_valid_gmail_french.txt');
  });

  $("li.gmail-spanish-input").click(function() {
  	populateInput('https://raw.githubusercontent.com/tainguyenbui/static-site-demo/master/test/fixtures/200_valid_gmail_spanish.txt');
  });

  $("li.combination-gmail-outlook").click(function() {
  	populateInput('https://raw.githubusercontent.com/tainguyenbui/static-site-demo/master/test/fixtures/200_valid_combined_clients.txt');
  });

  $("li.combination-gmail-outlook-fake-headers").click(function() {
    populateInput('https://raw.githubusercontent.com/tainguyenbui/static-site-demo/master/test/fixtures/200_valid_combined_fake_headers.txt');
  });
  

  function populateInput(url) {
  	clear();
  	$.get(url, function(data) {
   		$('#parse-input').val(data);
	}, 'text');
  }

  function clear() {
    $('#json-output').html("");
  	$('#output-status').text("");
    $('#parse-input').val("");
  }

});
