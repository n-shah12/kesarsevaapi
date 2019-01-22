var objResponse = {
    'resultKey': '0',
    'resultValue': ''
};
module.exports = {

    sendMail: function (to, subject, text, html, callback, attachments, from, cc) {

        /*    var send = require('gmail-send')({
              user: config.UserName,           // Your GMail account used to send emails
              pass: config.Password,           // Application-specific password
              to: to,           // Send to yourself
              subject: subject,
              text: text   // Plain text
            })();   */
        console.log(from);
        var fromid = "";
        var ccid = "";

        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: "testideas2tech@gmail.com", // Your email id
                pass: "i2t@abcd" // Your password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        //var text = 'Hello world from \n\n';// + req.body.name;
        var mailOptions = {
            replyTo: fromid,
            from: fromid, // sender address
            // sender: "'moorthi@ideas2tech.com'", // sender address
            to: to, // list of receivers
            cc: ccid,
            subject: subject, // Subject line
            text: text, // plaintext body
            html: html, // You can choose to send an HTML body instead
            attachments: attachments
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('SMTP Error: ' + error);
                objResponse.resultKey = '0';
                objResponse.resultValue = 'SMTP Error: ' + error;

                if (typeof callback === 'function')
                    callback(objResponse);

            } else {
                console.log(info);
                objResponse.resultKey = '1';
                objResponse.resultValue = 'Message sent: ' + info.response;
                console.log('Message sent: ' + info.response)
                if (typeof callback === 'function')
                    callback(objResponse);

            };
        });
    }
};
