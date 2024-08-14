// src/backend/dynamoose-config.js
const dynamoose = require('dynamoose');
const dynamodb = require('./aws-config'); // Importe a configuração da AWS

// Configure o Dynamoose para usar o DocumentClient configurado
dynamoose.aws.ddb.set(dynamodb); // Configura o Dynamoose para usar o DocumentClient

// Defina seu modelo Dynamoose
const User = dynamoose.model('User', {
  id: String,
  name: String,
  image: String,
});

module.exports = User;

