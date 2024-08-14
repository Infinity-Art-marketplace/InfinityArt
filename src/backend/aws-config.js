// src/backend/aws-config.js
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION, // Utilize a variável de ambiente para a região
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = dynamodb;

