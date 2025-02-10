const { Sequelize } = require("sequelize");

const errorHandler = (err, req, res, next) => {
  console.error("error occurred:", err);

  if (err instanceof Sequelize.ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof Sequelize.ForeignKeyConstraintError) {
    return res.status(400).json({ error: "invalid foreign key constraint" });
  }

  res.status(500).json({ error: "Something went wrong" });
};

module.exports = errorHandler;
