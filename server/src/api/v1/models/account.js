const defineAccountModel = (sequelize, DataTypes) => {
    const Account = sequelize.define(
        'Account',
        {
            // roleId: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false,
            //     defaultValue: 1,
            // },
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
        },
        {
            timestamps: true,
            paranoid: true,
        },
    )
    return Account
}

export default defineAccountModel
