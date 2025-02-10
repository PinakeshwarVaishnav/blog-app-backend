const router = require("express").Router();
const { Blog } = require("../models");
require("express-async-errors");
const errorHandler = require("../middleware/errorHandler");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  console.log("adding blog to the database:", blog);
  const blog = await Blog.create(req.body);
  res.status(201).json(blog);
});

router.delete("/:id", async (req, res) => {
  const blogId = req.params.id;

  const blog = await Blog.findByPk(blogId);

  if (!blog) {
    return res.status(404).json({ message: "blog not found" });
  }

  await blog.destroy();
  res.status(200).json({ message: "blog deleted successfully" });
});

router.put("/:id", async (req, res) => {
  const blogId = await Blog.findByPk(req.params.id);

  if (blogId) {
    blogId.likes = req.body.likes;
    await blogId.save();
    res.json(blogId);
  } else {
    res.status(404).end();
  }
});

router.use(errorHandler);

module.exports = router;
