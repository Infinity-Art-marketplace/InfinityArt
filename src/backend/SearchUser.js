const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient();

const searchUsers = async (searchTerm) => {
  const lowerCaseTerm = searchTerm.toLowerCase(); // Convertendo o termo de busca para minúsculas

  const params = {
    TableName: process.env.REACT_APP_DYNAMODB_TABLE_NAME,
    FilterExpression: "contains(username, :searchTerm) OR contains(Address, :searchTerm)",
    ExpressionAttributeValues: {
      ":searchTerm": searchTerm // Buscar sem alterar o caso no DynamoDB
    }
  };

  try {
    const data = await dynamodb.scan(params).promise();
    console.log('Data retrieved:', data);
    
    // Fazer a verificação manual de case-insensitive no lado do código
    const filteredItems = data.Items.filter(item => 
      (item.username && item.username.toLowerCase().includes(lowerCaseTerm)) ||
      (item.Address && item.Address.toLowerCase().includes(lowerCaseTerm))
    );

    return filteredItems.length > 0 ? filteredItems : [];
  } catch (error) {
    console.error('Error retrieving users:', error);
    throw error;
  }
};

module.exports = { searchUsers };

