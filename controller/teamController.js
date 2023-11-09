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
    const { name, description, goals } = req.body;
    try {
        const newTeam = new Team({ name, description, goals });
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

const updateTeamMember = async (req, res) => {
    const { name, description, goals } = req.body;
    const { teamId } = req.params;

    try {
        const updatedTeam = await Team.findByIdAndUpdate(teamId, { name, description, goals }, { new: true });
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
        const updatedTeam = await Team.findByIdAndUpdate(
            teamId,
            { $addToSet: { members: userId } },
            { new: true }
        );

        res.status(200).json({
            status: 200,
            team: updatedTeam,
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
    createTeam,
    updateTeamMember,
    getAllTeams,
    assignMemberToTeam,
    unassignMemberFromTeam
}