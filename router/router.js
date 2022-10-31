const express = require("express")
const router = express.Router()
const workdaycontroller = require("../controller/controller")

router.post("/register",workdaycontroller.register_controller)
router.post("/login",workdaycontroller.login_controller)
router.get("/getAll",workdaycontroller.getAll_controller)
router.get("/getOne",workdaycontroller.getOne_controller)


module.exports = router;