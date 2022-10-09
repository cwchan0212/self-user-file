require("../models/database");
const { remove } = require("../models/User");
const User = require("../models/User");

exports.homepage = async (req, res) => {
    try {
        const users = await User.find({}).sort({ _id: -1 });
        res.render("index", { title: "User Profile Management - CRUD", users });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
};

exports.modified = async (req, res) => {
    try {
        let id = req.params.id;
        let action = req.body.save ? "update" : "remove";
        console.log(req.body);

        if (id) {
            const userData = {
                name: {
                    title: req.body["title-" + id],
                    first: req.body["first-" + id],
                    last: req.body["last-" + id],
                },

                gender: req.body["gender-" + id],
                dob: {
                    date: new Date(req.body["dob-" + id]),
                    age:
                        new Date().getFullYear() -
                        new Date(req.body["dob-" + id]).getFullYear(),
                },

                location: {
                    country: req.body["country-" + id],
                },

                phone: req.body["phone-" + id],
                email: req.body["email-" + id],
                picture: {
                    large: req.body["picture-" + id],
                },
            };

            if (action == "update") {
                User.findByIdAndUpdate(id, userData, function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect("/");
                    }
                });
            } else if (action == "remove") {
                User.findByIdAndDelete(id, function (err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.redirect("/");
                    }
                });
            }
        }
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
};

exports.created = async (req, res) => {
    try {
        const userData = {
            name: {
                title: req.body.title,
                first: req.body.first,
                last: req.body.last,
            },

            gender: req.body.gender,
            dob: {
                date: new Date(req.body.dob),
                age:
                    new Date().getFullYear() -
                    new Date(req.body.dob).getFullYear(),
            },

            location: {
                country: req.body.country,
            },

            phone: req.body.phone,
            email: req.body.email,
            picture: {
                large: req.body.picture,
            },
        };

        const newUser = User(userData);
        newUser.save();
        req.flash("message", "add");
        res.redirect("/");
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occurred" });
    }
};
