const { Comment } = require('../models');

const commentSeeds = async () => {
  const comments = [
    {
      content: 'Great post! Very informative.',
      postId: 1, // postId 1 (Understanding MVC in Node.js)
      userId: 2, // userId 2 (developer_joe)
    },
    {
      content: 'I learned a lot about Express setup, thanks!',
      postId: 2, // postId 2 (How to Set Up Express.js with Sequelize)
      userId: 3, // userId 3 (coder_susan)
    },
    {
      content: 'I disagree with some of the points, but still a good read.',
      postId: 3, // postId 3 (Top 10 JavaScript Frameworks for 2024)
      userId: 1, // userId 1 (tech_writer1)
    },
  ];

  // Insert comments into the database
  for (const comment of comments) {
    await Comment.create(comment);
  }
};

module.exports = commentSeeds;