import { check } from "meteor/check";

import { Chats } from "../collection";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "chats.join"({ title }) {
    check(title, String);

    // Find chat with given name
    var chatToJoin = Chats.findOne({ title: title });

    // If chat exists, join
    if (chatToJoin) {
      if (!chatToJoin.users.includes(userId)) {
        Chats.update(chatToJoin._id, {
          $set: { users: chatToJoin.users.push(userId) }
        });
      }
      // Otherwise, create new chat
    } else {
      Chats.insert({
        title: title,
        users: Meteor.userId()
      });
    }
  },

  "chats.leave"({ title }) {
    check(title, String);

    // TODO: implement chats.leave
  }
});
