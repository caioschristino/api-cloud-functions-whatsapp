const express = require('express');
const { sendMessage, updateMyContact, receiveEmail, 
    deletePhoto, createContact, getContact, typing, 
    setAttributesGroup,setMembersGroup, leaveGroup, joinGroup,
    updateGroup,  createGroup, deleteConversation, deleteMessage, verifytoken} = require('../../api/chat');
const verifyAuth = require('../middlewares/verifyAuth');

const route = express.Router();

route.post('/:app_id/messages', verifyAuth, sendMessage);
route.put('/:app_id/contacts/me', verifyAuth, updateMyContact)
route.post('/:app_id/users/:user_id/settings/email',verifyAuth,  receiveEmail)
route.get('/verifytoken', verifyAuth, verifytoken)
route.delete('/:app_id/contacts/me/photo', verifyAuth, deletePhoto)
route.post('/:app_id/contacts', verifyAuth, createContact)
route.get('/:app_id/contacts/:contact_id', verifyAuth, getContact)
route.put('/:app_id/typings/:recipient_id', verifyAuth, typing)
route.put('/:app_id/groups/:group_id/attributes', verifyAuth, setAttributesGroup)
route.put('/:app_id/groups/:group_id/members', verifyAuth, setMembersGroup)
route.delete('/:app_id/groups/:group_id/members/:member_id', verifyAuth, leaveGroup)
route.post('/:app_id/groups/:group_id/members', verifyAuth, joinGroup)
route.put('/:app_id/groups/:group_id', verifyAuth, updateGroup)
route.post('/:app_id/groups', verifyAuth, createGroup)
route.delete('/groups/:group_id/members/:member_id', verifyAuth, deleteConversation)
route.delete('/groups/:group_id/members/:member_id', verifyAuth, deleteMessage)

module.exports = route;
