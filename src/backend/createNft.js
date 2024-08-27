const dynamodb = require('./aws-config');

// Função para criar ou atualizar um item na segunda tabela
const createOrUpdateNFT = async (contract, nftData) => {
  // Verificar se o contract é válido
  if (!contract) {
    throw new Error('Contract is required');
  }

  const paramsGet = {
    TableName: process.env.REACT_APP_DYNAMODB_TABLE_NAME_2, // Nome da segunda tabela
    Key: {
      contract: contract, // Usar 'contract' como chave
    },
  };

  try {
    // Tenta obter o item existente
    const existingItem = await dynamodb.get(paramsGet).promise();

    if (existingItem.Item) {
      // Se o item existir, atualiza com os novos dados
      const paramsUpdate = {
        TableName: process.env.REACT_APP_DYNAMODB_TABLE_NAME_2,
        Key: {
          contract: contract,
        },
        UpdateExpression: 'set nftImage = :nftImage, nftName = :nftName, nftCollection = :nftCollection, value = :value, token = :token',
        ExpressionAttributeValues: {
          ':nftImage': nftData.nftImage || existingItem.Item.nftImage,
          ':nftName': nftData.nftName || existingItem.Item.nftName,
          ':nftCollection': nftData.nftCollection || existingItem.Item.nftCollection,
          ':value': nftData.value || existingItem.Item.value,
          ':token': nftData.token || existingItem.Item.token, // Adicionado
        },
        ReturnValues: 'ALL_NEW',
      };

      const updatedItem = await dynamodb.update(paramsUpdate).promise();
      console.log('NFT updated successfully:', updatedItem);
      return updatedItem.Attributes;
    } else {
      // Se o item não existir, cria um novo
      const paramsPut = {
        TableName: process.env.REACT_APP_DYNAMODB_TABLE_NAME_2,
        Item: {
          contract: contract,
          nftImage: nftData.nftImage || '', // Garantir valor padrão
          nftName: nftData.nftName || '', // Evitar null, usar string vazia
          nftCollection: nftData.nftCollection || '', // Evitar null, usar string vazia
          value: nftData.value || 0, // Garantir valor padrão
          token: nftData.token || '', // Adicionado
        }
      };

      const data = await dynamodb.put(paramsPut).promise();
      console.log('NFT created successfully:', data);
      return data;
    }
  } catch (error) {
    console.error('Error updating/creating NFT:', error);
    throw error;
  }
};

module.exports = { createNft };

