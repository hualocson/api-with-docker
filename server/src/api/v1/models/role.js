const defineRoleModel = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        'Role',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
        },
    )

    return Role
}

export default defineRoleModel
