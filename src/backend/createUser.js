const dynamodb = require('./aws-config');

const createUser = async (Address, userData) => {
  // Verificar se o Address é válido
  if (!Address) {
    throw new Error('Address is required');
  }

  const paramsGet = {
    TableName: process.env.REACT_APP_DYNAMODB_TABLE_NAME,
    Key: {
      Address: Address, // Verificar se Address é uma string válida
    },
  };

  try {
    // Tenta obter o item existente
    const existingItem = await dynamodb.get(paramsGet).promise();

    if (existingItem.Item) {
      // Se o item existir, atualiza com os novos dados
      const paramsUpdate = {
        TableName: process.env.REACT_APP_DYNAMODB_TABLE_NAME,
        Key: {
          Address: Address,
        },
        UpdateExpression: 'set username = :username, image = :image, banner = :banner, description = :description, createdAt = :createdAt',
        ExpressionAttributeValues: {
          ':username': userData.username || existingItem.Item.username,
          ':image': userData.image || existingItem.Item.image,
          ':banner': userData.banner || existingItem.Item.banner,
          ':description': userData.description || existingItem.Item.description,
          ':createdAt': userData.createdAt || existingItem.Item.createdAt,
        },
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
          username: userData.username || '', // Garantir valor padrão
          image: userData.image || '', // Evitar null, usar string vazia
          banner: userData.banner || '', // Evitar null, usar string vazia
          description: userData.description || '', // Evitar null, usar string vazia
          createdAt: userData.createdAt || new Date().toISOString(), // Garantir formato ISO
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

module.exports = { createUser };

