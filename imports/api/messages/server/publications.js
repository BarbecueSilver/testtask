import { Messages } from "../collection";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

Meteor.publish("messages.all", function messagesAllPublication() {
  return Messages.find();
});

Meteor.publish("messages.list", function messagesOfChatPublication(chatId) {
  check(chatId, String);

  return Messages.find({ chatId: chatId });
});
