const agendaModel = require('../../DB/models/agenda-model')

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


module.exports={add_agenda,getAgenda,getOneAgenda}
