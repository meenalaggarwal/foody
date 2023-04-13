module.exports = (sequelize, Sequelize) => {
  const Meal = sequelize.define("meals", {
    name: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATEONLY
    },
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    }
  });
  return Meal;
};