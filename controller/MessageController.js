const UserChatSchemaModel = require("../module/UserChatMessage");

const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await UserChatSchemaModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) {
      return res.json({
        data: data,
        message: "Message Added Successfully.",
        response_code: 200,
        status: true,
      });
    } else {
      return res.json({
        message: "Failed to add message to the databases.",
        response_code: 201,
        status: false,
      });
    }
  } catch (err) {
    next(err);
  }
};

const getMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await UserChatSchemaModel.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(
      {
        data:projectedMessages,
        message: "Failed to add message to the databases.",
        response_code: 201,
        status: false,
      });
  } catch (ex) {
    next(ex);
  }
};

module.exports = { addMessage, getMessage };
