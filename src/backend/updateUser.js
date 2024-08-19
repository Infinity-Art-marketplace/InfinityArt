const dynamodb = require('./aws-config');

const updateUser = async (Address, userData) => {
  if (!Address) {
    throw new Error('Address is required');
  }

  if (!userData || Object.keys(userData).length === 0) {
    throw new Error('User data is required');
  }

  const paramsGet = {
    TableName: process.env.REACT_APP_DYNAMODB_TABLE_NAME,
    Key: {
      Address: Address,
    },
  };

  try {
    const existingItem = await dynamodb.get(paramsGet).promise();

    if (existingItem.Item) {
      const paramsUpdate = {
        TableName: process.env.REACT_APP_DYNAMODB_TABLE_NAME,
        Key: {
          Address: Address,
        },
        UpdateExpression: 'set username = :username, image = :image, banner = :banner, description = :description',
        ExpressionAttributeValues: {
          ':username': userData.username || existingItem.Item.username,
          ':image': userData.image || existingItem.Item.image,
          ':banner': userData.banner || existingItem.Item.banner,
          ':description': userData.description || existingItem.Item.description,
        },
        ReturnValues: 'ALL_NEW',
      };

      const updatedItem = await dynamodb.update(paramsUpdate).promise();

      // Manter o createdAt original
      updatedItem.Attributes.createdAt = existingItem.Item.createdAt;
      console.log('User updated successfully:', updatedItem);
      return updatedItem.Attributes;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

module.exports = { updateUser };

