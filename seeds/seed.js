const connection = require('../config/connection');
const { user, thought } = require('../models');
const { userData, thoughtData } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  // Delete the collections if they exist
  const userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }
  
  const thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  };

  const users = await user.insertMany(userData);
  const thoughts = await thought.insertMany(thoughtData);

  console.info('Seeding complete! 🌱');
  process.exit(0);
});