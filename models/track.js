"use-strict";

const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define(
    "Track",
    {
      title: DataTypes.STRING,
      youtube_url: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  Track.associate = (models) => {
    Track.belongsTo(models.Album);
  };

  return Track;
};
