import { Request, Response } from 'express';
import Team from '../models/team.model';

export const getAllTeams = async (req: Request, res: Response): Promise<void> => {
    try {
        const teams = await Team.find().populate('members', 'username');
        res.status(200).json({
            status: 200,
            teams: teams,
            message: 'Teams retrieved successfully',
        });
        return
    } catch (err: any) {
        res.status(400).json({
            status: 400,
            error: err.message,
        });
        return
    }
};

export const createTeam = async (req: Request, res: Response): Promise<void> => {
    const { name, category, description } = req.body;
    try {

        const newTeam = new Team({ name, category, description });
        newTeam.save()
        res.status(200).json({
            status: 200,
            team: newTeam,
            message: 'A New Team Created',
        });

    } catch (error: any) {
        res.status(400).json({
            status: 400,
            error: error.message,
        });

    }

}

export const getATeamInfo = async (req: Request, res: Response): Promise<void> => {
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

    } catch (err: any) {
        res.status(400).json({
            status: 400,
            error: err.message,
        });

    }
}

export const updateTeamInfo = async (req: Request, res: Response): Promise<void> => {
    const { name, category, description } = req.body;
    const { teamId } = req.params;

    try {
        const updatedTeam = await Team.findByIdAndUpdate(teamId, { name, category, description }, { new: true });
        res.status(200).json({
            status: 200,
            team: updatedTeam,
            message: 'Team updated successfully',
        });
    } catch (err: any) {
        res.status(400).json({
            status: 400,
            error: err.message,
        });
    }
}

export const assignMemberToTeam = async (req: Request, res: Response): Promise<void> => {
    const { teamId, userId } = req.params;

    try {

        const teamInfoBeforeUpdate = await Team.findById(teamId).populate({
            path: 'members',
            select: '-password',
        });

        if (teamInfoBeforeUpdate?.members?.some(member => member._id.toString() === userId)) {
            res.status(400).json({
                status: 400,
                error: 'User is already a member of the team',
            });
            return
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
        const lastMember = teamInfo?.members[teamInfo?.members?.length - 1];

        res.status(200).json({
            status: 200,
            team: lastMember,
            message: 'Team member assigned successfully',
        });
    } catch (err: any) {
        res.status(400).json({
            status: 400,
            error: err.message,
        });
    }
};

export const unassignMemberFromTeam = async (req: Request, res: Response): Promise<void> => {
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
    } catch (err: any) {
        res.status(400).json({
            status: 400,
            error: err.message,
        });
    }
};
