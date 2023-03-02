const defineAccountModel = (sequelize, DataTypes) => {
    const Account = sequelize.define(
        'Account',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                    len: {
                        args: [6, 255],
                        msg: 'Email is invalid',
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        {
            timestamps: true,
            paranoid: true,
        },
    )
    return Account
}

export default defineAccountModel
