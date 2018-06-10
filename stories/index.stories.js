import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import ListOfChats from "../imports/ui/components/ListOfChats";
import TextFieldButtonForm from "../imports/ui/components/TextFieldButtonForm";
import { Button, Welcome } from "@storybook/react/demo";

const chats = [{ _id: "id", title: "testroom" }];

storiesOf("ListOfChats", module).add("default", () => (
  <ListOfChats chats={chats} />
));

storiesOf("TextFieldButtonForm", module).add("default", () => (
  <TextFieldButtonForm />
));

/*storiesOf("ChatJoinForm", module).add("default", () => (
    <ChatJoinForm />
))*/
