const agendaModel = require("../../DB/models/agenda-model");
const sessionsmoderators = require("../../DB/models/session-moderator");
const questions_model = require("../../DB/models/questions");
const user_moder = require('../../DB/models/users')
const winston = require("winston");

// const add_agenda =async (req,res)=>{
// const {AgendaDayDetails,sessionName,sessionSpeakers,sessionPanelDiscussion,sessionTime,sessionCaseStudy,sessionCaseStudyTime} = req.body

// if(sessionSpeakers){
// let x = []
//     for(let i=0; i<sessionSpeakers.length ; i++){

//         const foundUser = await sessionsmoderators.findById({_id:sessionSpeakers[i]})

//         sessionSpeakers.push(foundUser)

//         if(foundUser){
//            x.push(foundUser)

//         }

//     }
// const addData = new agendaModel({
//     AgendaDayDetails,sessionName,sessionSpeakers:x,sessionPanelDiscussion,sessionTime,sessionCaseStudy,sessionCaseStudyTime
// })

// const saved = await addData.save()
// res.status(200).send(saved)

// }

// }

const add_agenda = async (req, res) => {
  const {
    sessionSpeakers,
    AgendaDayDetails,
    sessionName,
    sessionPanelDiscussion,
    sessionTime,
    sessionCaseStudy,
    sessionCaseStudyTime,
  } = req.body;

  if (!sessionSpeakers || !Array.isArray(sessionSpeakers)) {
    return res.status(400).send({ message: "Invalid sessionSpeakers" });
  }

  try {
    const speakerDocuments = await sessionsmoderators.find({
      _id: { $in: sessionSpeakers },
    });

    if (speakerDocuments.length !== sessionSpeakers.length) {
      return res.status(400).send({ message: "Some speakers not found" });
    }

    const newAgendaItem = new agendaModel({
      sessionSpeakers: speakerDocuments,
      AgendaDayDetails,
      sessionName,
      sessionPanelDiscussion,
      sessionTime,
      sessionCaseStudy,
      sessionCaseStudyTime,
    });

    const saved = await newAgendaItem.save();
    res.status(201).send(saved);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getAgenda = async (req, res) => {
  const getdata = await agendaModel.find({});

  res.status(200).send(getdata);
};
const getOneAgenda = async (req, res) => {
  const id = req.params.id;
  const getOne = await agendaModel.findById({ _id: id });
  if (getOne) {
    res.status(200).send(getOne);
  } else {
    res.status(404).send("Content is not avilable");
  }
};
const getSesstionSpeakers = async (req, res) => {
  try {
    const sessionSpeakers = req.params.sessionSpeakers.split(","); // Parse the comma-separated IDs

    if (
      !sessionSpeakers ||
      !Array.isArray(sessionSpeakers) ||
      sessionSpeakers.length === 0
    ) {
      throw new Error("Invalid sessionSpeakers parameter");
    }

    const users = await sessionsmoderators.find({
      _id: { $in: sessionSpeakers },
    });
    res.json(users);
  } catch (error) {
    console.log(error);

    winston.error("Failed to fetch users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
const askSpeakers = async (req, res) => {
  const id = req.params.id;
  const token = req.token._id;
  const question = req.body.question;
 


  const newQustion = new questions_model({
    whoisAsk: token,
    agenda: id,
    question: question,
  });
  const added = await newQustion.save();
  res.status(200).send(added);

  // res.status(200).send(added); 
};


const getSesstionQuestionsById = async (req, res) => {
  const id = req.params.id;

  const populatedQuestions = await questions_model.find({ agenda: id })
    .populate('whoisAsk', 'name email') // Populate user details
    .populate('agenda', 'AgendaDayDetails'); // Populate agenda details

  res.status(200).send(populatedQuestions);
};

module.exports = {
  add_agenda,
  getAgenda,
  getOneAgenda, 
  getSesstionSpeakers,
  askSpeakers,
  getSesstionQuestionsById,
};
