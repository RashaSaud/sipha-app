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

const get_organizing = async (req, res) => {
    try {
      const getOrg = await organizing_committees.find({});
      res.status(200).json(getOrg);
    } catch (error) {
      console.error('Error fetching organizing committees:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
module.exports = {add_organizing,get_organizing}