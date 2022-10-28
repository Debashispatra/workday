const app = require("./server/server")

port = 7070


app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})