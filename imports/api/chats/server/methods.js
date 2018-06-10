import { check } from "meteor/check";

import { Chats } from "../collection";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "chats.join"({ title }) {
    // Check
    check(title, String);

    // Arrange
    const userId = Meteor.userId();
    const chatToJoin = Chats.findOne({ title: title });

    // Act
    // If chat exists, join
    if (chatToJoin) {
      Chats.update(chatToJoin._id, {
        $addToSet: { users: userId }
      });
      // Otherwise, create new chat
    } else {
      const users = [userId];

      Chats.insert({
        title: title,
        users: users
      });
    }
  },

  "chats.leave"({ title }) {
    // Check
    check(title, String);

    // Arrange
    const userId = Meteor.userId();
    const chatToLeave = Chats.findOne({ title: title });

    // Act
    Chats.update(chatToLeave._id, {
      $pull: { users: userId }
    });
  }
});
