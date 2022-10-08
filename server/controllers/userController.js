require("../models/database");
const User = require("../models/User");
exports.homepage = async (req, res) => {
  try {
    const users = await User.find({}).sort({_id: -1});

    // console.log(users.length);
    // res.setHeader("Content-Type", "application/json");
    // res.json(users);
    // users.forEach(function (user, index) {
    //   console.log(user.dob.date, user.name.first, user.picture.thumbnail, user.email, user.phone, user.location.country);
    //     // console.log(user.location.country)
    // });

    res.render("index", { title: "User Profile Management - CRUD", users});
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};
