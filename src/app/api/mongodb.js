import { MongoClient } from 'mongodb';

console.log('[MongoDB] Loading MongoDB connection module...');
console.log('[MongoDB] process.env.MONGODB_URI:', process.env.MONGODB_URI);

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  console.error('[MongoDB] MONGODB_URI is missing from environment variables!');
  throw new Error('Please add your MongoDB URI to .env');
}

try {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      console.log('[MongoDB] Creating new MongoClient in development mode...');
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    console.log('[MongoDB] Creating new MongoClient in production mode...');
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} catch (err) {
  console.error('[MongoDB] Error creating MongoClient:', err);
  throw err;
}

export default clientPromise;
