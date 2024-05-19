const getPlayerteamModel = (sequelize, { DataTypes }) => {
  const Playerteam = sequelize.define('playerteam', {
    
     playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
   
  });
  /*

*/


  return Playerteam;
};

export default getPlayerteamModel;
