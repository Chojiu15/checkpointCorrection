"use-strict";

const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    "Album",
    {
      title: DataTypes.STRING,
      genre: DataTypes.STRING,
      picture: DataTypes.STRING,
      artist: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  Album.associate = (models) => {
    Album.hasMany(models.Track);
  };

  return Album;
};
