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
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      JoiningDate: req.body.joiningDate,
      phone: req.body.phone,
      company: req.body.company,
      email: req.body.email,
      password: hpassword,
      Department: req.body.Department,
      Designation: req.body.Designation,
      is_admin: 0,
      token: access_token,
    });
    let isRecord = await User.findOne({email:req.body.email});
    // console.log("Record:::",isRecord);
    if(isRecord ==null){
      myData
      .save()
      .then((result) => {
        if (result.incre != null) {
          let empId = `EMP${result.incre}`;
          myData
            .updateOne({ empId: empId }, { incre: result.incre })
            .then((result1) => {
              resolve({
                status: 0,
                message: "data inserted successfully",
                token: access_token,
              });
            })
            .catch((err) => {
              resolve({
                status: 1,
                message: "Error Occured",
              });
            });
        } else {
          resolve({
            status: 1,
            message: "No Record Found",
          });
        }

        // resolve({
        //   status: 0,
        //   message: "data inserted successfully",
        //   token: access_token,
        // });
      })
      .catch((err) => {
        res.status(400).send("unable to save to database");
        reject(err);
      });

    }
    else{
      resolve({
        status:1,
        message:"Email is already registerd with us... Please login to continue"
      })
    }
    
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

exports.getallService = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    getdata = await User.find();
    console.log(getdata);
    if (getdata) {
      resolve({
        status: 0,
        message: "all data fetched",
        data: getdata,
      });
    } else {
      resolve({
        status: 1,
        message: "data not fetched",
      });
    }
  });
};

exports.getoneService = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    EmployeeeId = req.body.empId;
    EmpoyeeName = req.body.EmpoyeeName;
    Designation = req.body.Designation;

    userdata = await User.findOne({
      empId: EmployeeeId,
      firstname: EmpoyeeName,
      Designation: Designation,
    });
    console.log(userdata);
    if (userdata) {
      resolve({
        status: 0,
        message: "user data fetched",
        data: userdata,
      });
    } else {
      resolve({
        status: 1,
        message: "user data not fetched",
      });
    }
  });
};
