import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { User } from './user.js';
import { Post } from './Post.js';
import { Comment } from './comment.js';

dotenv.config();

// Set up Sequelize connection
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
    }
);

// Add associations
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
Post.belongsTo(User, {
    foreignKey: 'user_id'
});
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

export { sequelize, User, Post, Comment };



