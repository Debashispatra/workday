const workday_service = require("../service/workdayservice")

exports.register_controller = async(req,res)=>{

    await workday_service.registerService(req,res).then((registerServiceresponce)=>{
        if(registerServiceresponce.status == 0){
            res.status(200).json({
                status : 0,
                message:registerServiceresponce.message,
                token:registerServiceresponce.token

            })
        }
        else{
            res.status(200).json({
                status : 1,
                message:registerServiceresponce.message,
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
                message:loginResponse.message,
                token:loginResponse.token
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

exports.getAll_controller = async(req,res)=>{
    await workday_service.getallService(req,res).then((getallResponse)=>{
        if(getallResponse.status == 0){
           res.status(200).json({
            status:0,
            message:"data fetched successfuly",
            data:getallResponse.data
           })

        }else{
            res.status(200).json({
                status:1,
                message:getallResponse.message
               })
        }
    }).catch((err)=>{
        console.log("message",err)
    })
}

exports.getOne_controller = async(req,res)=>{
    await workday_service.getoneService(req,res).then((getoneServiceresponse)=>{
        console.log("getoneServiceresponse:::::",getoneServiceresponse);
        if(getoneServiceresponse.status == 0){
            res.status(200).json({
                status:0,
                message:"data fetched successfuly",
                data:getoneServiceresponse.data
            })
        }else{
            res.status(400).json({
                status:1,
                message:"data not fetched successfuly"
            })
        }
    }).catch((error)=>{
        console.log("message",error)
    })
}