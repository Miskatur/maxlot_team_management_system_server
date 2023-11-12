const express = require("express");
const { getAllTeams, createTeam, assignMemberToTeam, unassignMemberFromTeam, updateTeamInfo, getATeamInfo } = require("../controller/teamController");
const { validateToken } = require("../utils/authTokenUtils");

const router = express.Router();

router.get('/allTeam', validateToken, getAllTeams)
router.post('/create-team', validateToken, createTeam)
router.get('/teamInfo/:teamId', getATeamInfo)
router.put('/update-team/:teamId', updateTeamInfo)
router.put('/assign/:teamId/:userId', assignMemberToTeam)
router.put('/unassign/:teamId/:userId', unassignMemberFromTeam)

module.exports = router;