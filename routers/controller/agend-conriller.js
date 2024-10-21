const agendaModel = require('../../DB/models/agenda-model')
const sessionsmoderators = require('../../DB/models/session-moderator')
const winston = require('winston'); 

const add_agenda =async (req,res)=>{
const {AgendaDayDetails,sessionName,sessionSpeakers,sessionPanelDiscussion,sessionTime,sessionCaseStudy,sessionCaseStudyTime} = req.body
const addData = new agendaModel({
    AgendaDayDetails,sessionName,sessionSpeakers,sessionPanelDiscussion,sessionTime,sessionCaseStudy,sessionCaseStudyTime
})

const saved = await addData.save()
res.status(200).send(saved)

}

const getAgenda = async (req,res)=>{
    const getdata = await agendaModel.find({})
        res.status(200).send(getdata)
    
}
const getOneAgenda = async (req,res)=>{
    const id = req.params.id
    const getOne = await agendaModel.findById({_id:id})
    if(getOne){
res.status(200).send(getOne)
    }else{
res.status(404).send('Content is not avilable')
    }
}
const getSesstionSpeakers = async (req, res) => {
    try {
      const sessionSpeakers = req.params.sessionSpeakers.split(','); // Parse the comma-separated IDs
  
      if (!sessionSpeakers || !Array.isArray(sessionSpeakers) || sessionSpeakers.length === 0) {
        throw new Error('Invalid sessionSpeakers parameter');
      }
  
      const users = await sessionsmoderators.find({ _id: { $in: sessionSpeakers } });
      res.json(users);
    } catch (error) {
        console.log(error);
        
      winston.error('Failed to fetch users:', error); 
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };

module.exports={add_agenda,getAgenda,getOneAgenda,getSesstionSpeakers}
