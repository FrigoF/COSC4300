// fredfrigo.js - RESTful API server using TLS
// @MarquetteU   F Frigo  02-Nov-2025
//
// To configure & start server:
//	$ npm init
//	$ npm install express --save 
//      $ node fred.js
// For client use web browser:  https://bloomcounty.eng.mu.edu:3000/fred
//
const fs = require('fs');
const https = require('https');
const express = require('express');

const port = 3000;
const app = express();

app.get('/fred', (req, res) => {
  res.send('Hello, fred!');
  console.log('Received /fred request, shutting down...');
  server.close(() => {
    console.log('Server closed after /fred request.');
    process.exit(0);
  });
});

const server = https.createServer(
  {
    cert: fs.readFileSync('/etc/apache2/ssl/bloomcounty_eng_mu_edu_cert.pem'),
    key: fs.readFileSync('/etc/apache2/ssl/privateKey.pem'),
  },
  app
);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);

  // Automatically terminate after 1 minute (60 seconds)
  setTimeout(() => {
    console.log('Shutting down server automatically after 1 minute...');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  }, 60_000);
});

