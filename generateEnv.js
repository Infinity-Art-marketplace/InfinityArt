const fs = require('fs');

// Conteúdo do arquivo .env com as informações desejadas
const envContent = `REACT_APP_WALLETCONNECT_PROJECT_ID=1a0958b3501ba89b6fd7db2bb7ef66fas
REACT_APP_AWS_ACCESS_KEY_ID=AKIA4MTWJMSFFPX4W7UN
REACT_APP_AWS_SECRET_ACCESS_KEY=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
REACT_APP_AWS_REGION=us-east-1
REACT_APP_DYNAMODB_TABLE_NAME=ifat-users-ddb-east-1
`;

fs.writeFileSync('.env', envContent, (err) => {
  if (err) {
    console.error('Erro ao gerar o arquivo .env:', err);
  } else {
    console.log('.env gerado com sucesso!');
  }
});
