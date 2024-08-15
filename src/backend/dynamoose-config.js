const dynamoose = require('dynamoose');
const AWS = require('aws-sdk');

// Configurações da AWS
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

// Instanciando o DocumentClient
const dynamodb = new AWS.DynamoDB.DocumentClient();

// Configurando o Dynamoose para usar o DocumentClient
dynamoose.aws.ddb.set(dynamodb);

// Define o schema do modelo User
const userSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  username: String,
  image: String,
}, {
  saveUnknown: true,
  timestamps: true,
});

// Definindo o modelo User
const User = dynamoose.model(process.env.REACT_APP_DYNAMODB_TABLE_NAME, userSchema);

module.exports = User;

