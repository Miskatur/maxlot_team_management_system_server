const express = require("express");
const { getAllTeams, createTeam, updateTeamMember, assignMemberToTeam, unassignMemberFromTeam } = require("../controller/teamController");
const { validateToken } = require("../utils/authTokenUtils");

const router = express.Router();

router.get('/allMembers', validateToken, getAllTeams)
router.post('/create-team', createTeam)
router.put('/update-team/:teamId',  updateTeamMember)
router.put('/assign/:teamId/:userId',  assignMemberToTeam)
router.put('/unassign/:teamId/:userId', unassignMemberFromTeam)

module.exports = router;