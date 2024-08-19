const dynamodb = require('./aws-config');

const getUser = async (Address) => {
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
    const result = await dynamodb.get(paramsGet).promise();
    if (result.Item) {
      console.log('User retrieved successfully:', result.Item);
      return result.Item;
    } else {
      console.log('No user found for this address:', Address);
      return null;  // ou você pode lançar um erro aqui se preferir
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error;
  }
};

module.exports = { getUser };

