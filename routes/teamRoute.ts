import express from 'express';
import { assignMemberToTeam, createTeam, getATeamInfo, getAllTeams, unassignMemberFromTeam, updateTeamInfo } from "../controller/teamController";
import { validateToken } from "../utils/authTokenUtils";
const router = express.Router();

router.get('/allTeam', validateToken, getAllTeams)
router.post('/create-team', validateToken, createTeam)
router.get('/teamInfo/:teamId', getATeamInfo)
router.put('/update-team/:teamId', updateTeamInfo)
router.put('/assign/:teamId/:userId', assignMemberToTeam)
router.put('/unassign/:teamId/:userId', unassignMemberFromTeam)

export default router