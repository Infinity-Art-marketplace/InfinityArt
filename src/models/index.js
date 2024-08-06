// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, NFT } = initSchema(schema);

export {
  User,
  NFT
};