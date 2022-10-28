const client = require("../config/config")
const bcrypt = require("bcrypt");

const securePasswordService = async(password)=>{
    try {
        
        const passwordhash = await bcrypt.hash(password, 10);
        return passwordhash
    } catch (error) {
        console.log("message",error)
    }
        
    
}
exports.registerService = async(req,res)=>{
    return new Promise(async(resolve,reject)=>{
        const hpassword = await securePasswordService(req.body.password);

        const email = req.body.email;
        const password = hpassword;
        const is_admin = 0;
        console.log(email,password);
        const query= `INSERT INTO workday_user (email,password,is_admin) VALUES ('${email}','${password}','${is_admin}')`
        client.execute(query).then((result)=>{
        console.log("Data Inserted");
            resolve({
                status: 0 ,
                message:"data inserted successfuly"
            })

        }).catch((error)=>{
            console.log("message",error)
        })
    })
}

exports.loginService = async(req,res)=>{
    return new Promise((resolve,reject)=>{
        const email = req.body.email;
        const password = req.body.password;
        const Query = `Select * from aeps.workday_user where email='${email}'`
        client.execute(Query).then(async(result)=>{
            // console.log("result:::",result)
            // console.log("result.rowLength:::",result.rowLength)
            const passwordmatch = await bcrypt.compare(password,result.rows[0].password);
            if(result.rowLength > 0 ){
                if(email == result.rows[0].email && passwordmatch){
                    if(result.rows[0].is_admin == 1){
                       
                        resolve({
                            status:0,
                            message:"login succesfull"
                        })
                        
                    }else{
                        resolve({
                            status:1,
                            message:"not a admin"
                        })
                    }
                    
                }
                else{
                    resolve({
                        status:1,
                        message:"Invalid email or Password...please check and try again"
                    })
                }
            }
            else{
                resolve({
                    status:1,
                    message:"No Record Found...please sign in to login"
                })
            }
        })
        .catch(err=>{
            console.log(`Error occured in DB Operation :::`,err);
            resolve({
                status:1,
                message:"Some error occured"
            })
        })

    })
}
