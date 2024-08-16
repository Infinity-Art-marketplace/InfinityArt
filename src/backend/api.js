const dynamodb = require('./aws-config');

const updateUser = async (Address, userData) => {
  // Verificar se o Address é válido
  if (!Address) {
    throw new Error('Address is required');
  }

  const paramsGet = {
    TableName: process.env.REACT_APP_DYNAMODB_TABLE_NAME,
    Key: {
      Address: Address, // Note que o "A" é maiúsculo aqui
    },
  };

  try {
    // Tenta obter o item existente
    const existingItem = await dynamodb.get(paramsGet).promise();

    if (existingItem.Item) {
      // Se o item existir, atualiza
      let updateExpression = 'set';
      let expressionAttributeValues = {};

      if (userData.username) {
        updateExpression += ' username = :u';
        expressionAttributeValues[':u'] = userData.username;
      }

      if (userData.image) {
        updateExpression += (Object.keys(expressionAttributeValues).length > 0 ? ', ' : ' ') + 'image = :i';
        expressionAttributeValues[':i'] = userData.image;
      }

      if (Object.keys(expressionAttributeValues).length === 0) {
        throw new Error('No valid attributes to update');
      }

      const paramsUpdate = {
        TableName: process.env.REACT_APP_DYNAMODB_TABLE_NAME,
        Key: {
          Address: Address, // "A" maiúsculo aqui também
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'UPDATED_NEW'
      };

      const data = await dynamodb.update(paramsUpdate).promise();
      console.log('User updated successfully:', data);
      return data;
    } else {
      // Se o item não existir, cria um novo
      const paramsPut = {
        TableName: process.env.REACT_APP_DYNAMODB_TABLE_NAME,
        Item: {
          Address: Address, // "A" maiúsculo aqui também
          username: userData.username || '',
          image: userData.image || '',
          createdAt: new Date().toISOString(), // Exemplo de um atributo extra
        }
      };

      const data = await dynamodb.put(paramsPut).promise();
      console.log('User created successfully:', data);
      return data;
    }
  } catch (error) {
    console.error('Error updating/creating user:', error);
    throw error;
  }
};

module.exports = { updateUser };

