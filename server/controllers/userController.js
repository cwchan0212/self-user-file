require("../models/database");
const { remove } = require("../models/User");
const User = require("../models/User");
exports.homepage = async (req, res) => {
    try {
        const users = await User.find({}).sort({ _id: -1 });

        // console.log(users.length);
        // res.setHeader("Content-Type", "application/json");
        // res.json(users);
        // users.forEach(function (user, index) {
        //   console.log(user.dob.date, user.name.first, user.picture.thumbnail, user.email, user.phone, user.location.country);
        //     // console.log(user.location.country)
        // });

        res.render("index", { title: "User Profile Management - CRUD", users });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
};

exports.modified = async (req, res) => {
    try {
        // let mode = "save";
        // let id = req.body.submit-save ? req.body.submit-save: req.body.submit-remove;

        let id = req.params.id;
        let action = req.body.save ? "update" : "remove";

        if (id) {
            const userData = {
                title: req.body["title-" + id],
                first: req.body["first-" + id],
                last: req.body["last-" + id],
                gender: req.body["gender-" + id],
                dob: req.body["dob-" + id],
                country: req.body["country-" + id],
                phone: req.body["phone-" + id],
                email: req.body["email-" + id],
                picture: req.body["picture-" + id],
            };
            console.log(userData, action);
            res.setHeader("Content-Type", "application/json");
            res.json(req.body);
        }



        



        // const users = await User.find({}).sort({_id: -1});

        // console.log(users.length);
        // res.setHeader("Content-Type", "application/json");
        // res.json(users);
        // users.forEach(function (user, index) {
        //   console.log(user.dob.date, user.name.first, user.picture.thumbnail, user.email, user.phone, user.location.country);
        //     // console.log(user.location.country)
        // });

        // res.render("index", { title: "User Profile Management - CRUD", users});
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
};
