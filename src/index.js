import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeWeb3Modal } from './config/web3Modal';

// Inicializando o AWS SDK e Dynamoose
import AWS from 'aws-sdk';
import dynamoose from 'dynamoose';

// Configuração do AWS SDK
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION,
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

// Configurando o Dynamoose para usar o DocumentClient
dynamoose.aws.ddb.set(dynamodb);

// Initialize Web3Modal
initializeWeb3Modal();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

