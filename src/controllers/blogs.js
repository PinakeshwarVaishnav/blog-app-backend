const router = require("express").Router();

const { Blog } = require("../models/blog");

router.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/api/blogs", async (req, res) => {
  try {
    console.log("adding blog to the database:", blog);
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (err) {
    return res.status(400).json({ err });
  }
});

router.delete("/api/blogs/:id", async (req, res) => {
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

module.exports = router;
