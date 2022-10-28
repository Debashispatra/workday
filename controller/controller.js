const workday_service = require("../service/workdayservice")

exports.register_controller = async(req,res)=>{

    await workday_service.registerService(req,res).then((registerServiceresponce)=>{
        if(registerServiceresponce.status == 0){
            res.status(200).json({
                status : 0,
                message:"registred successfully",

            })
        }
    })

}

exports.login_controller = async(req,res)=>{
    await workday_service.loginService(req,res).then((loginResponse)=>{
        console.log("loginResponse:::",loginResponse);
          if(loginResponse.status == 0){
            res.status(200).json({
                status:0,
                message:loginResponse.message
            })
          }
          else{
            res.status(200).json({
                status:1,
                message:loginResponse.message
            })
          }
    }).catch((error)=>{
        console.log("message",error)
    })
}