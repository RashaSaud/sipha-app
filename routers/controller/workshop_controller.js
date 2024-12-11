const workshop_model = require('../../DB/models/workshops')
const user_model = require('../../DB/models/users')
const new_workshop = async (req, res) => {
  const {
    workshopName,
    workshopDate,

    whichDay,
        workshopArea,
    workshopTime,
    targetAudience,
    workshopObjective,
  } = req.body;

  const create_workshop = new workshop_model({
    workshopName,
    workshopDate,
    whichDay,
    targetAudience,
    workshopArea,
    workshopTime,
    workshopObjective, 
  })
  const added_worksop = await create_workshop.save()
  res.status(200).send(added_worksop)
};

const get_workshops = async (req,res)=>{
  const data = await workshop_model.find({})
  
  res.status(200).send(data)
}

const get_one_workshop = async (req,res)=>{
  const id = req.params.id
  const getOneWorkshop = await workshop_model.findById({_id:id})
  res.status(200).send(getOneWorkshop)
}

const askeQuestions = async (req,res)=>{
  console.log(authentication());
  
  // const workshopId = req.params.id 
  // const user = req.headers.token 
  // const question = req.body 

  // const checkWorkshop = await workshop_model.findById({_id:id})
  // if(checkWorkshop){
  //   const findUser = await user_model.find({_id:user.token})

  // }
}
module.exports={new_workshop,get_workshops,get_one_workshop}
