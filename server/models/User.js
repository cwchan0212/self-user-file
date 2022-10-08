const mongoose = require("mongoose");

// Tools: JSON -> Mongoose Schema
// https://transform.tools/json-to-mongoose

const userSchema = new mongoose.Schema({
  name: {
    type: { title: String, first: String, last: String },
    required: "This field is required.",
  },

  gender: {
    type: String,
    required: "This field is required.",
  },

  dob: {
    date: {
      type: "Date",
    },
    age: {
      type: "Number",
    },
  },

  location: {
    timezone: {
      offset: {
        type: "String",
      },
      description: {
        type: "String",
      },
    },
    street: {
      number: {
        type: "Number",
      },
      name: {
        type: "String",
      },
    },
    city: {
      type: "String",
    },
    state: {
      type: "String",
    },
    country: {
      type: "String",
    },
    postcode: {
      type: "Number",
    },
    coordinates: {
      latitude: {
        type: "String",
      },
      longitude: {
        type: "String",
      },
    },
  },

  phone: {
    type: String,
    required: "This field is required.",
  },

  email: {
    type: String,
    required: "This field is required.",
  },
  registered: {
    date: {
      type: "Date",
    },
    age: {
      type: "Number",
    },
  },

  login: {
    uuid: {
      type: "String",
    },
    username: {
      type: "String",
    },
    password: {
      type: "String",
    },
    salt: {
      type: "String",
    },
    md5: {
      type: "String",
    },
    sha1: {
      type: "String",
    },
    sha256: {
      type: "String",
    },
  },

  picture: {
    type: { large: String, medium: String, thumbnail: String },
  },
});

module.exports = mongoose.model("User", userSchema);
