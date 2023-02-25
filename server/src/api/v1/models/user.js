const defineUserModel = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            paranoid: true,
        },
    )
    return User
}

export default defineUserModel
