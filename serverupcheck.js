const https = require('https');
const nodemailer = require('nodemailer');

// Configuration for ping and email
const url = 'https://demo-uaxw.onrender.com/swagger-ui/index.html';

const url2 = 'https://demo-uaxw.onrender.com/swagger-ui/index.html';
const checkInterval = 8* 60 * 1000; // 5 minutes in milliseconds

// Gmail configuration (replace with your own credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'stockapp1985@gmail.com',      // Your Gmail address
    pass: 'hcrfxkpruxwrusza',         // Use an app-specific password for Gmail
  },
});

// Function to send an email if the service is down
function sendEmailNotification(message) {
  const mailOptions = {
    from: 'stockapp1985@gmail.com',
    to: 'vinit76230@gmail.com',
    subject: 'Server Down Alert',
    text: 'Service Down at '+message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// Function to check the website's status
function checkWebsite() {
  https.get(url, (res) => {
    const { statusCode } = res;
    console.log(`Status Code: ${statusCode}`);

    if (statusCode !== 200) {
      console.log('Server is down, sending email...');
      sendEmailNotification();
    } else {
      console.log('Server is up and running fine.');
    }
  }).on('error', (e) => {
    console.log('Error checking the server:', e.message);
    sendEmailNotification();
  });
}

function checkWebsite2() {
  https.get(url2, (res) => {
    const { statusCode } = res;
    console.log(`Status Code: ${statusCode}`);

    if (statusCode !== 200) {
      console.log('Server is down, sending email...');
      sendEmailNotification();
    } else {
      console.log('Server is up and running fine.');
    }
  }).on('error', (e) => {
    console.log('Error checking the server:', e.message);
    sendEmailNotification();
  });
}

// Check the website every 5 minutes
setInterval(checkWebsite, checkInterval);

// Run the first check immediately
checkWebsite();
