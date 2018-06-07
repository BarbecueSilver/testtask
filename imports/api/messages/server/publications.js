// <collection>.<target>
import { Messages } from "../collection";

Meteor.publish("messages.all", function messagesAllPublication() {
  return Messages.find();
});
