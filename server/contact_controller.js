const axios = require('axios')
const Nexmo = require('nexmo')
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const Helper = require('sendgrid').mail;

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET
});

module.exports = {
   sendMail,
   sendSMS,
   sendSlack
}

function sendSendGrid(from, to, subject, msg) {
   const fromEmail = new Helper.Email(from);
   const toEmail = new Helper.Email(to);
   const content = new Helper.Content('text/plain', msg);
   const mail = new Helper.Mail(fromEmail, subject, toEmail, content);

   const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
   });

   sg.API(request, function (error, response) {
      if (error) {
         console.log('Error response received');
      }
      console.log("Successful sg send");
   });

}
function sendMail(req, res, next) {
   const {
      firstName,
      lastName,
      organization,
      phone,
      email,
      message
   } = req.body

   const newMessage = `New Contact: ${firstName} ${lastName}, ${organization}, ${phone}, ${email}, ${message}`
   req.newMessage = newMessage

   sendSendGrid(email, process.env.MY_EMAIL, 'New Contact', newMessage)

   if (email) {
      const thankYouMessage = `Thank you, ${firstName}, for your message. I will read it as soon as I have a chance and get back to you. I look forward to speaking with you!`
      sendSendGrid(process.env.MY_EMAIL, email, 'Thank you!',  thankYouMessage)
   }
   next()
}
function sendNexmo(phone, msg) {
    nexmo.message.sendSms(
      process.env.NEXMO_VIRTUAL_NUMBER, phone, msg,
         (err, responseData) => {
            if (err) {
               console.log(err);
            } else {
               console.dir(responseData);
            }
         }
   ); 
}
function sendSMS(req, res, next) {
   sendNexmo('15123639163', req.newMessage)

   if (req.body.phone) {
      const phone = '1' + req.body.phone.replace(/[(|)|\-|\/|\s]/ig, "")
      const thankYouMessage = `Thank you, ${req.body.firstName}, for your message! I'll get back to you shortly.`
      sendNexmo(phone, thankYouMessage)
   }  
   next()
}
function sendSlack(req, res, next) {
   axios.post(process.env.SLACK_CHANNEL_URL, {text: req.newMessage})
   .then(response => {
      console.log("Slack sent")
   })

   res.status(200).send("Success")
}

