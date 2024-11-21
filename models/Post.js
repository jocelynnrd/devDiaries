import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js';

class Post extends Model {}

Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'post'
    }
);

export { Post };

