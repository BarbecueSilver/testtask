// <collection>.<target>
import { Chats } from "../collection";
import { Meteor } from "meteor/meteor";

Meteor.publish("chats.all", function chatsAllPublication() {
  return Chats.find();
});

Meteor.publish("chats.userHasJoined", function chatsUserHasJoinedPublication() {
  return Chats.find({ users: Meteor.userId() });
});
