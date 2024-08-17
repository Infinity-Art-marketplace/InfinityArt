const express = require('express');
const { updateUser } = require('./src/backend/updatewallet'); // Caminho atualizado conforme estrutura de diretórios

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/update-user', async (req, res) => {
  const { address, username, image } = req.body;
  try {
    await updateUser(address, { username, image });
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(400).send('Error updating user: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

