const express = require('express');
const { createUser } = require('./src/backend/createUser');
const { updateUser } = require('./src/backend/updateUser');
const { getUser } = require('./src/backend/getUser');
const { createNft } = require('./src/backend/createNft'); // Importa a nova função

const app = express();
const port = process.env.PORT || 5000;

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Endpoint para criar usuário
app.post('/create-user', async (req, res) => {
  const { address, username, image, banner, description, createdAt } = req.body;
  try {
    await createUser(address, { username, image, banner, description, createdAt });
    res.status(200).send('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(400).json({ error: 'Error creating user: ' + error.message });
  }
});

// Endpoint para atualizar usuário
app.post('/update-user', async (req, res) => {
  const { address, username, image, banner, description } = req.body;
  try {
    const result = await updateUser(address, { username, image, banner, description });
    res.status(200).json({ message: 'User updated successfully', user: result });
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(400).json({ error: 'Error updating user: ' + error.message });
  }
});

// Endpoint para recuperar um usuário
app.get('/get-user/:address', async (req, res) => {
  const { address } = req.params;
  try {
    const user = await getUser(address);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error.message);
    res.status(500).json({ error: 'Error retrieving user: ' + error.message });
  }
});

// Endpoint para criar ou atualizar NFT
app.post('/create-nft', async (req, res) => {
  const { contract, nftImage, nftName, nftCollection, value, token } = req.body;
  try {
    const result = await createNft(contract, { nftImage, nftName, nftCollection, value, token });
    res.status(200).json({ message: 'NFT processed successfully', nft: result });
  } catch (error) {
    console.error('Error creating/updating NFT:', error.message);
    res.status(400).json({ error: 'Error creating/updating NFT: ' + error.message });
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

