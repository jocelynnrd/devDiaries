import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js';

class Comment extends Model {}

Comment.init(
    {
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'comment'
    }
);

export { Comment };

