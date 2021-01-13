const admin = require('firebase-admin');
const functions = require('firebase-functions');

const serviceAccount = require('./config/service-account.json');
const credential = require('./config/credential');
const app = require('./server');


// To test the api in local and interact with the production database
if (process.env === 'local') {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: credential[process.env.ENV].databaseURL,
  });
} else {
  admin.initializeApp(credential[process.env.ENV]);
  // admin.initializeApp();
}

exports.api = functions.https.onRequest(app);
