const Message = require("../models/Message.model");
const User = require("../models/User.model");
const Chat = require("../models/Chat.model");

module.exports.messageController = {
  //@description     Get all Messages
  //@route           GET /api/Message/:chatId
  //@access          Protected
  allMessages: async (req, res) => {
    try {
      const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "firstName lastName email")
        .populate("chat");
      res.json(messages);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  },
  //@description     Create New Message
  //@route           POST /api/Message/
  //@access          Protected
  sendMessage: async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }

    let newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    try {
      let message = await Message.create(newMessage);

      message = await message
        .populate("sender", "firstName lastName")
        // .execPopulate(); .execPopulate();
      message = await message.populate("chat")
      message = await User.populate(message, {
        path: "chat.users",
        select: "firstName lastName email",
      });

      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  },
};
