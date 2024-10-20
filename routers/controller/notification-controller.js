const admin = require('firebase-admin');
const Notification = require('../../DB/models/notification-model');
admin.initializeApp({
    credential: admin.credential.cert('routers/middeldware/sipha-app-310d3-firebase-adminsdk-pyjex-a64d460807.json'),
    databaseURL: 'https://sipha-app-310d3-default-rtdb.firebaseio.com/'
  });


  const sendNotification =async (req,res)=>{
    const notification = new Notification({
        title: req.body.title,
        body: req.body.body,
        recipient: req.body.recipient,
        firebaseToken: req.body.firebaseToken
      });
    
      try {
        await notification.save();
        res.json({ message: 'Notification created successfully' });
      } catch (err) {
        res.status(500).json({ error: 'Failed to create notification' });
      }
  }

  const getNotification = async (req,res)=>{
    try {
        const notifications = await Notification.find();
        for (const notification of notifications) {
          const message = {
            notification: {
              title: notification.title,
              body: notification.body
            },
            token: notification.firebaseToken
          };
      
          console.log('Sending notification to:', notification.firebaseToken);
      
          admin.messaging().send(message)
            .then(() => {
              console.log('Notification sent successfully');
            })
            .catch((error) => {
              console.error('Failed to send notification:', error);
            
            });
        }
        res.json({ message: 'Notifications sent' });
      } catch (err) {
        console.error('Error retrieving or sending notifications:', err);
        res.status(500).json({ error: 'Failed to send notifications fffff' });
      }
  }

  const sendByUserId = async (req,res)=>{
   
        try {
          const notifications = await Notification.find({ recipient: req.params.recipient });
          res.json(notifications);
        } catch (err) {
          res.status(500).json({ error: 'Failed to retrieve notifications' });
        }
   
      
  }


  module.exports={sendNotification,getNotification,sendByUserId}