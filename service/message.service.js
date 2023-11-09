const Message = require("../models/messages.model");

const sendMessageToGroup = async (io, { sender, team, content }) => {
    try {
        const newMessage = new Message({ sender, team, content });
        await newMessage.save();

        // Broadcast the new message to all connected sockets in the team room
        io.to(team.toString()).emit('newMessage', newMessage);

        return newMessage;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    sendMessageToGroup
};