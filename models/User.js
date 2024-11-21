import { Model, DataTypes } from 'sequelize';
import { sequelize } from './index.js';

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'user'
    }
);

export { User };

