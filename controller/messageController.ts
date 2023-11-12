// const { sendMessageToGroup } = require("../service/message.service");
// const io = require('socket.io');
// import { Request, Response } from 'express';

// const sendMessages = async (req: Request, res: Response) : Promise<void> => {
//     const { sender, team, content } = req.body;

//     try {
//         const newMessage = await sendMessageToGroup(io, { sender, team, content });
//         res.status(200).json({
//             status: 200,
//             message: 'Message sent successfully',
//             data: newMessage,
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: 400,
//             error: error.message,
//         });
//     }
// }

// export default = {
//     sendMessages
// }