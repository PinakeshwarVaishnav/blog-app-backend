require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("database connection established successfully");
  })
  .catch((err) => {
    console.log("unable to connect to the database:", err);
  });

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING(255),
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  },
);

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  try {
    console.log("adding blog to the database:", blog);
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (err) {
    return res.status(400).json({ err });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }

    await blog.destroy();
    res.status(200).json({ message: "blog deleted successfully" });
  } catch (err) {
    console.log("error while deleting blog:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
