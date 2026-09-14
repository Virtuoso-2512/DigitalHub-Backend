//Main Handler
function tryCatch(router, link, operation, callback){
    const reqType = [
        "get", //0
        "post", //1
        "use", //2
    ]
  
    router[reqType[operation]]("/"+link, async(req, res) => {
        try{
          return await callback(req, res);
        }catch(e){
            console.log('====================================');
            console.log("Error From : " + link);
            console.log(e);
            console.log('====================================');
            return res.send({success:false});
        }
    });
}

module.exports = tryCatch
//End of Main Handler