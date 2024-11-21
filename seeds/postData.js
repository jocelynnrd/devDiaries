const { Post } = require('../models');

const postSeeds = async () => {
  const posts = [
    {
      title: 'Understanding MVC in Node.js',
      content: 'Model-View-Controller is a design pattern used for developing web applications...',
      userId: 1, // userId 1 (tech_writer1)
    },
    {
      title: 'How to Set Up Express.js with Sequelize',
      content: 'In this post, we will go through the steps to set up Express with Sequelize...',
      userId: 2, // userId 2 (developer_joe)
    },
    {
      title: 'Top 10 JavaScript Frameworks for 2024',
      content: 'JavaScript frameworks are crucial in web development. Here are the top 10 frameworks...',
      userId: 3, // userId 3 (coder_susan)
    },
  ];

  // Insert posts into the database
  for (const post of posts) {
    await Post.create(post);
  }
};

module.exports = postSeeds;