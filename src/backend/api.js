// src/backend/api.js
const dynamodb = require('./aws-config');

const updateUser = async (address, userData) => {
  const params = {
    TableName: 'Users',
    Item: {
      id: address,
      ...userData,
    },
  };

  try {
    await dynamodb.put(params).promise();
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

module.exports = { updateUser };

