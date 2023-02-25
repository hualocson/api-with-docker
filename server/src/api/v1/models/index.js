import defineRoleModel from './role.js'
import defineAccountModel from './account.js'
import defineUserModel from './user.js'
import sequelize from '../../../configs/db.config.js'
import { DataTypes } from 'sequelize'

const Role = defineRoleModel(sequelize, DataTypes)
const Account = defineAccountModel(sequelize, DataTypes)
const User = defineUserModel(sequelize, DataTypes)

Role.hasOne(Account)
Account.belongsTo(Role, {
    foreignKey: {
        name: 'roleId',
        field: 'roleId',
        allowNull: false,
        defaultValue: 1,
    },
})
Account.removeAttribute('RoleId')

Account.hasOne(User)
User.belongsTo(Account, {
    foreignKey: {
        name: 'accountId',
        field: 'accountId',
        allowNull: false,
    },
})
User.removeAttribute('AccountId')

const db = {
    sequelize,
    Account,
    Role,
    User,
}

export default db
