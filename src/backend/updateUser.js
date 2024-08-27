const dynamodb = require('./aws-config');

const updateUser = async (Address, userData) => {
  if (!Address) {
    throw new Error('Address is required');
  }

  const paramsGet = {
    TableName: process.env.REACT_APP_DYNAMODB_TABLE_NAME,
    Key: {
      Address: Address,
    },
  };

  try {
    // Verifica se o usuário já existe
    const existingItem = await dynamodb.get(paramsGet).promise();

    if (existingItem.Item) {
      // Criação da expressão de atualização dinamicamente
      let updateExpression = 'set';
      const expressionAttributeValues = {};
      const expressionAttributeNames = {};

      if (userData.username) {
        updateExpression += ' #username = :username,';
        expressionAttributeValues[':username'] = userData.username;
        expressionAttributeNames['#username'] = 'username';
      }

      if (userData.image) {
        updateExpression += ' #image = :image,';
        expressionAttributeValues[':image'] = userData.image;
        expressionAttributeNames['#image'] = 'image';
      }

      if (userData.banner) {
        updateExpression += ' #banner = :banner,';
        expressionAttributeValues[':banner'] = userData.banner;
        expressionAttributeNames['#banner'] = 'banner';
      }

      if (userData.description) {
        updateExpression += ' #description = :description,';
        expressionAttributeValues[':description'] = userData.description;
        expressionAttributeNames['#description'] = 'description';
      }

      // Remove a última vírgula
      updateExpression = updateExpression.slice(0, -1);

      const paramsUpdate = {
        TableName: process.env.REACT_APP_DYNAMODB_TABLE_NAME,
        Key: {
          Address: Address,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ExpressionAttributeNames: expressionAttributeNames,
        ReturnValues: 'ALL_NEW',
      };

      const updatedItem = await dynamodb.update(paramsUpdate).promise();
      console.log('User updated successfully:', updatedItem);
      return updatedItem.Attributes;
    } else {
      // Se o item não existir, cria um novo
      const paramsPut = {
        TableName: process.env.REACT_APP_DYNAMODB_TABLE_NAME,
        Item: {
          Address: Address,
          username: userData.username || '',
          image: userData.image || '',
          banner: userData.banner || '',
          description: userData.description || '',
          createdAt: userData.createdAt || new Date().toISOString(),
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

