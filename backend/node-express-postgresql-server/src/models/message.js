const getMessageModel = (sequelize, { DataTypes }) => {
  const Message = sequelize.define('message', {
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

  });

  return Message;
};

export default getMessageModel;
