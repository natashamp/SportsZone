const getPlayerModel = (sequelize, { DataTypes }) => {
  const Player = sequelize.define('player', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    sport: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }
  });
  /*
CREATE TABLE players (
id SERIAL PRIMARY KEY,
fullname VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
password VARCHAR(50) NOT NULL,
dob DATE NOT NULL,
location VARCHAR(50) NOT NULL,
sport VARCHAR(50) NOT NULL
);
  */
/*
Player.findByEmailAndPassword = async (email, password) => {
  const player = await Player.findOne({
    where: { email, password },
  });

  return player;
};
*/


  return Player;
};

export default getPlayerModel;
