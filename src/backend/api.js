const User = require('./dynamoose-config');

const updateUser = async (address, userData) => {
  try {
    const user = new User({
      id: address,
      ...userData
    });
    await user.save();
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

module.exports = { updateUser };

