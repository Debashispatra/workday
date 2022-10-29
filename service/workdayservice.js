const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const create_token = async () => {
  try {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
        // data: {
        //   username:"debasish"
        // }
      },
      "secretKey"
    );
    console.log(token);
    return token;
  } catch (error) {
    return null;
  }
};

const securePasswordService = async (password) => {
  try {
    const passwordhash = await bcrypt.hash(password, 10);
    return passwordhash;
  } catch (error) {
    console.log("message", error);
  }
};

exports.registerService = (req, res) => {
  return new Promise(async (resolve, reject) => {
    const hpassword = await securePasswordService(req.body.password);

    let access_token = await create_token().catch((err) => {
      console.log("TokenError:", err.message);
    });
    var myData = new User({
      email: req.body.email,
      password: hpassword,
      is_admin: 0,
      token: access_token,
    });

    myData
      .save()
      .then((item) => {
        resolve({
          status: 0,
          message: "data inserted successfully",
          token: access_token,
        });
      })
      .catch((err) => {
        res.status(400).send("unable to save to database");
        reject(err);
      });
  });
};

exports.loginService = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const email = req.body.email;
    const password = req.body.password;
    let login_token = await create_token().catch((err) => {
      console.log("TokenError:", err.message);
    });
    const userdata = await User.findOne({ email: email });
    if (userdata) {
      const passwordmatch = await bcrypt.compare(password, userdata.password);
      if (passwordmatch) {
        if (userdata.is_admin === 1) {
          resolve({
            status: 0,
            message: "login successfull",
            token: login_token,
          });
        } else {
          resolve({
            status: 1,
            message: "not a admin",
          });
        }
      } else {
        resolve({
          status: 1,
          message: "email not matched",
        });
      }
    } else {
      resolve({
        status: 1,
        message: "data not found",
      });
    }
  });
};
