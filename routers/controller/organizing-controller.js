const organizing_committees = require('../../DB/models/organizing-committee')
const add_organizing = async (req,res)=>{
    const {img} = req.body 
    try{
        const addUser = new organizing_committees({
         img
          })
          const added = await addUser.save()
          res.status(200).send(added)

    }catch(err){
        res.status(err.status).send(err)
    }
}

module.exports = {add_organizing}