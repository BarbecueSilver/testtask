import { check } from "meteor/check";

import { Messages } from "../collection";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "messages.send"({ chatId, draft }) {
    // Check
    check(chatId, String);
    check(draft, String);

    // Arrange
    const timestamp = new Date();

    // Act
    if (!_.isEmpty(draft)) {
      Messages.insert({
        content: draft,
        chatId: chatId,
        createdAt: timestamp,
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
    }
  }
});
