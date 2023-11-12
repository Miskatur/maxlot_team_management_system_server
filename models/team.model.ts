import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: String
        },
        description: {
            type: String
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    }
);

const Team = mongoose.model('Team', teamSchema);
export default Team