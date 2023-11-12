const Team = require("../models/team.model");

const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('members', 'username');
        res.status(200).json({
            status: 200,
            teams: teams,
            message: 'Teams retrieved successfully',
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            error: err.message,
        });
    }
};

const createTeam = async (req, res) => {
    const { role } = req;
    const { name, category, description } = req.body;
    try {
        if (role === 'teamMember') {
            return res.status(401).json({
                status: 401,
                message: 'You are not allowed to create team.',
            });
        }
        const newTeam = new Team({ name, category, description });
        newTeam.save()
        res.status(200).json({
            status: 200,
            team: newTeam,
            message: 'A New Team Created',
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            error: error.message,
        });
    }

}

const getATeamInfo = async (req, res) => {
    const { teamId } = req.params;
    try {
        const teamInfo = await Team.findById(teamId).populate({
            path: 'members',
            select: '-password',
        });
        res.status(200).json({
            status: 200,
            data: teamInfo
        })
    } catch (err) {
        res.status(400).json({
            status: 400,
            error: err.message,
        });
    }
}

const updateTeamInfo = async (req, res) => {
    const { name, category, description } = req.body;
    const { teamId } = req.params;

    try {
        const updatedTeam = await Team.findByIdAndUpdate(teamId, { name, category, description }, { new: true });
        res.status(200).json({
            status: 200,
            team: updatedTeam,
            message: 'Team updated successfully',
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            error: err.message,
        });
    }
}

const assignMemberToTeam = async (req, res) => {
    const { teamId, userId } = req.params;

    try {

        const teamInfoBeforeUpdate = await Team.findById(teamId).populate({
            path: 'members',
            select: '-password',
        });

        if (teamInfoBeforeUpdate.members.some(member => member._id.toString() === userId)) {
            return res.status(400).json({
                status: 400,
                error: 'User is already a member of the team',
            });
        }

        await Team.findByIdAndUpdate(
            teamId,
            { $addToSet: { members: userId } },
            { new: true }
        )

        const teamInfo = await Team.findById(teamId).populate({
            path: 'members',
            select: '-password',
        });
        const lastMember = teamInfo.members[teamInfo.members.length - 1];

        res.status(200).json({
            status: 200,
            team: lastMember,
            message: 'Team member assigned successfully',
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            error: err.message,
        });
    }
};

const unassignMemberFromTeam = async (req, res) => {
    const { teamId, userId } = req.params;

    try {
        const updatedTeam = await Team.findByIdAndUpdate(
            teamId,
            { $pull: { members: userId } },
            { new: true }
        );

        res.status(200).json({
            status: 200,
            team: updatedTeam,
            message: 'Team member unassigned successfully',
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            error: err.message,
        });
    }
};

module.exports = {
    getAllTeams,
    createTeam,
    getATeamInfo,
    updateTeamInfo,
    assignMemberToTeam,
    unassignMemberFromTeam
}