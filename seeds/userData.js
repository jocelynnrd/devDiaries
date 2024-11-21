const { User } = require('../models');

const userSeeds = async () => {
  const users = [
    {
      username: 'tech_writer1',
      password: 'password123',
    },
    {
      username: 'developer_joe',
      password: 'password456',
    },
    {
      username: 'coder_susan',
      password: 'password789',
    },
  ];

  // Insert users into the database
  for (const user of users) {
    await User.create(user);
  }
};

module.exports = userSeeds;