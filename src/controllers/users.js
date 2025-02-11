const router = require("express").Router();

const { User } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const newUsername = req.body.username;

    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).send("user not found");
    }

    user.username = newUsername;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
