import { Chats } from "../collection";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

Meteor.publish("chats.all", function chatsAllPublication() {
  return Chats.find();
});

Meteor.publish("chats.userHasJoined", function chatsUserHasJoinedPublication() {
  return Chats.find({ users: Meteor.userId() });
});

Meteor.publish("chats.chatById", function chatsChatByIdPublication(chatId) {
  check(chatId, String);
  return Chats.findOne({ chatId: chatId });
});
