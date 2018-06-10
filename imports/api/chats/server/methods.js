import { check } from "meteor/check";

import { Chats } from "../collection";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "chats.join"({ title }) {
    // Check
    check(title, String);

    // Arrange
    const userId = Meteor.userId();
    // Find chat with given name
    var chatToJoin = Chats.findOne({ title: title });

    // Act
    // If chat exists, join
    if (chatToJoin) {
      if (!chatToJoin.users.includes(userId)) {
        var updatedUsers = chatToJoin.users;

        if (chatToJoin.users.length < 1) updatedUsers = [userId];
        else updatedUsers.push(userId);

        Chats.update(chatToJoin._id, {
          $set: { users: updatedUsers }
        });
      }
      // Otherwise, create new chat
    } else {
      var users = [userId];

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
    // Find chat with given name
    var chatToLeave = Chats.findOne({ title: title });

    // Act
    if (chatToLeave.users.includes(userId)) {
      const users = chatToLeave.users;
      var updatedUsers = users.filter(user => user !== userId);

      Chats.update(chatToLeave._id, {
        $set: { users: updatedUsers }
      });
    }
  }
});
