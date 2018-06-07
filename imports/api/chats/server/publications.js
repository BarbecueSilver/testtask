// <collection>.<target>
import { Chats } from "../collection";

Meteor.publish("chats.all", function chatsAllPublication() {
  return Chats.find();
});
