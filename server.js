require('dotenv').config();
require('./server/db-conn');
var createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');   // for file uploads
var cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const app = express();


if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
    throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
  }

const checkJwt = jwt({
    // Dynamically provide a signing key based on the [Key ID](https://tools.ietf.org/html/rfc7515#section-4.1.4) header parameter ("kid") and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  });

// adjust as needed for  limiting user uploads
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})



app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(morgan('dev'));
//app.use(checkJwt); //comment me out if you don't want to do token processing
app.use(express.static('./client/build/'));

// mount routes here
app.use('/api/people/', require('./server/routes/people-route'));
app.use('/api/address/', require('./server/routes/address-route'));
app.use('/api/items/', require('./server/routes/items-route'));
app.use('/api/profile/', require('./server/routes/profile-route'));
app.use('/api/transactions/', require('./server/routes/transactions-route'));
app.use('/api/solicitations/', require('./server/routes/solicitations-route'));
app.use('/api/contacts/', require('./server/routes/contacts-route'));

app.get('/*', (req, res) => {

res.sendFile('index.html', {root: __dirname + '/client/build/'});


});

// Error Handling
app.use( function(err, request, response, next){
    console.error(err.message);
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    response.status(err.statusCode).send(err.message);
});

const {PORT} = process.env;
app.listen(PORT, () => console.log(`Connected on port ${PORT}`));

