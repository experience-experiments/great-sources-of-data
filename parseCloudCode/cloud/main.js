
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});


var Mailgun = require('mailgun');
Mailgun.initialize('sandbox8902b51e1d674b8aa46cc5010abea368.mailgun.org', 'key-c430780bb58a9428745611b04886f657');


Parse.Cloud.define("sendEmail", function(request, response) {


	//GET NOTIFIED WHEN SOMEONE ADDS A SOURCE
	Mailgun.sendEmail({
	  to: (request.params.to || "mathieu.gosselin@rma-consulting.com"),
	  from: "datasources@rma-consulting.com",
	  subject: request.params.subject,
	  text: request.params.body 
	}, {
	  success: function(httpResponse) {
	    console.log(httpResponse);
	    response.success("Email sent!");
	  },
	  error: function(httpResponse) {
	    console.error(httpResponse);
	    response.error("Uh oh, something went wrong");
	  }
	});
});