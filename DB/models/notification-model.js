const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: String,
  body: String,
  recipient: String, // Email or user ID of the recipient
  sentAt: { type: Date, default: Date.now },
  firebaseToken: String // Store the Firebase token for sending notifications
});

module.exports = mongoose.model('Notification', notificationSchema);
