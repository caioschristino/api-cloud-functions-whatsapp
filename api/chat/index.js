const chatApi = require('./chat-api');

/**
 * Send a message.
 *
 * This endpoint supports CORS.
 */

exports.sendMessage = (req, res) => {
  console.log('sendMessage');
      if (req.method !== 'POST') {
        res.status(403).send('Forbidden!');
      }
      
      cors(req, res, () => {
        let sender_id = req.user.uid;

        if (!req.body.sender_fullname) {
            res.status(405).send('Sender Fullname is not present!');
        }
        if (!req.body.recipient_id) {
            res.status(405).send('Recipient id is not present!');
        }
        if (!req.body.recipient_fullname) {
            res.status(405).send('Recipient Fullname is not present!');
        }
        if (!req.body.text) {
            res.status(405).send('text  is not present!');
        }
        if (!req.params.app_id) {
            res.status(405).send('app_id is not present!');
        }

        if (req.body.sender_id) {
          sender_id = req.body.sender_id;
        }

        let sender_fullname = req.body.sender_fullname;
        let recipient_id = req.body.recipient_id;
        let recipient_fullname = req.body.recipient_fullname;
        let text = req.body.text;
        let app_id = req.params.app_id;
        let channel_type = req.body.channel_type;
        let attributes = req.body.attributes;
        let type = req.body.type;
        let metadata = req.body.metadata;
        let timestamp = req.body.timestamp;
        

        console.log('sender_id', sender_id);
        console.log('sender_fullname', sender_fullname);
        console.log('recipient_id', recipient_id);
        console.log('recipient_fullname', recipient_fullname);
        console.log('text', text);
        console.log('app_id', app_id);
        console.log('channel_type', channel_type);
        console.log('attributes', attributes);
        console.log('type', type);
        console.log('metadata', metadata);
        console.log('timestamp', timestamp);
        


        if (channel_type==null || channel_type=="direct") {  //is a direct message
          // sendDirectMessage(sender_id, sender_fullname, recipient_id, recipient_fullname, text, app_id, attributes, timestamp, type, metadata) {
          chatApi.sendDirectMessage(sender_id, sender_fullname, recipient_id, recipient_fullname, text, app_id, attributes, timestamp, type, metadata).then(function(result) {
            console.log('result', result);

            res.status(201).send(result);
          });
        }else if (channel_type=="group") {
          // sendGroupMessage(sender_id, sender_fullname, recipient_group_id, recipient_group_fullname, text, app_id, attributes, projectid, timestamp, type, metadata) {
          chatApi.sendGroupMessage(sender_id, sender_fullname, recipient_id, recipient_fullname, text, app_id, attributes, undefined, timestamp, type, metadata).then(function(result) {
            console.log('result', result);

            res.status(201).send(result);
          });
        }else {
          res.status(405).send('channel_type error!');
        }
        // [END sendResponse]
      });
    }

    /**
 * Delete a message
 * 
 *
 * This endpoint supports CORS.
 */
// [START trigger]

exports.deleteMessage =  (req, res) => {
  console.log('delete a message');
      cors(req, res, () => {
        let sender_id = req.user.uid;

        if (!req.params.recipient_id) {
          res.status(405).send('recipient_id is not present!');
        }

        if (!req.params.message_id) {
            res.status(405).send('message_id is not present!');
        }
    
        if (!req.params.app_id) {
            res.status(405).send('app_id is not present!');
        }

        if (req.body.sender_id) {
          sender_id = req.body.sender_id;
        }

        let recipient_id = req.params.recipient_id;
        let message_id = req.params.message_id;
        let app_id = req.params.app_id;

        let all = false;
        if (req.query.all) {
          all = true;
        }

        let channel_type = "direct";
        if (req.query.channel_type) {
          channel_type = req.query.channel_type;
        }

        console.log('recipient_id', recipient_id);
        console.log('message_id', message_id);
        console.log('app_id', app_id);
        console.log('all', all);
        console.log('channel_type', channel_type);


        
        if (channel_type=="direct") {
          if (all==false) {
            chatApi.deleteMessage(sender_id, recipient_id, message_id, app_id).then(function(result) {
              console.log('result', result);
              res.status(204).send({"success":true});
            });

          }else {
            chatApi.deleteMessageForAll(sender_id, recipient_id, message_id, app_id).then(function(result) {
              console.log('result', result);
              res.status(204).send({"success":true});
            });
          }
        }else if (channel_type=="group") {
          if (all==false) {
            chatApi.deleteMessage(sender_id, recipient_id, message_id, app_id).then(function(result) {
              console.log('result', result);
              res.status(204).send({"success":true});
            });
          }else {
            chatApi.deleteMessageGroupForAll(recipient_id, message_id, app_id).then(function(result) {
              console.log('result', result);
              res.status(204).send({"success":true});
            });
          }
        }else {
          res.status(405).send('channel_type error');
        }
      });
    }



    /**
 * Delete a conversation
 * 
 *
 * This endpoint supports CORS.
 */
// [START trigger]
exports.deleteConversation = (req, res) => {
  console.log('delete a conversation');
      cors(req, res, () => {

        if (!req.params.recipient_id) {
          res.status(405).send('recipient_id is not present!');
        }

      
        if (!req.params.app_id) {
            res.status(405).send('app_id is not present!');
        }


        let recipient_id = req.params.recipient_id;
        let app_id = req.params.app_id;
        let user_id = req.user.uid;

        if (req.body.user_id) {
          console.log('user_id from body', req.body.user_id);
          user_id = req.body.user_id;
        }

        let physicsDelete = false;
        if (req.query.delete) {
          physicsDelete = true;
        }

    
        console.log('recipient_id', recipient_id);
        console.log('app_id', app_id);
        console.log('physicsDelete', physicsDelete);
        console.log('user_id', user_id);


      
    
        if (physicsDelete==false) {
          chatApi.archiveConversation(user_id, recipient_id, app_id).then(function(result) {
            console.log('result', result);
            res.status(204).send({"success":true});
          });
        }else {
          chatApi.deleteConversation(user_id, recipient_id, app_id).then(function(result) {
            console.log('result', result);
            res.status(204).send({"success":true});
          });
        }                         
      });
    }


    /**
 * Create a group
 
 * This endpoint supports CORS.
 */
// [START trigger]
exports.createGroup = (req, res) => {
  console.log('create a group');

    if (req.method !== 'POST') {
      res.status(403).send('Forbidden!');
    }
      
      cors(req, res, () => {

        if (!req.body.group_name) {
            res.status(405).send('group_name is not present!');
        }
        // if (!req.body.group_members) {
        //     res.status(405).send('group_members is not present!');
        // }
        if (!req.params.app_id) {
            res.status(405).send('app_id is not present!');
        }

        let group_name = req.body.group_name;
        let group_id = req.body.group_id;
        let current_user = req.user.uid;

        if (req.body.current_user) {
          current_user = req.body.current_user;
        }

        let group_owner = current_user;

        let group_members = {};
        if (req.body.group_members) {
          group_members = req.body.group_members;
        }

        group_members[current_user] = 1;

        let app_id = req.params.app_id;


        console.log('group_name', group_name);
        console.log('group_id', group_id);        
        console.log('group_owner', group_owner);
        console.log('group_members', group_members);
        console.log('app_id', app_id);

        if (group_id) {
          // createGroupWithId(group_id, group_name, group_owner, group_members, app_id, attributes, invited_members) {
           chatApi.createGroupWithId(group_id, group_name, group_owner, group_members, app_id, req.body.attributes, req.body.invited_members).then(function(result) {
            console.log('result', result);
            // prima veniva ritornato il result
            res.status(201).send({"success":true});
          });
        }else {
          // createGroup(group_name, group_owner, group_members, app_id, attributes, invited_members) {
            chatApi.createGroup(group_name, group_owner, group_members, app_id, req.body.attributes, req.body.invited_members).then(function(result) {
              console.log('result', result);
              res.status(201).send({"success":true});
            });
      
        }               
      });
}

 /**
 * Update a group
 
 *
 * This endpoint supports CORS.
 */
// [START trigger]
exports.updateGroup = (req, res) => {
  console.log('set members group');

    if (req.method !== 'PUT') {
      res.status(403).send('Forbidden!');
    }
      
    cors(req, res, () => {
      if (!req.params.group_id) {
          res.status(405).send('group_id is not present!');
      }
      if (!req.params.app_id) {
          res.status(405).send('app_id is not present!');
      }

      let group_id = req.params.group_id;
      let app_id = req.params.app_id;


      let group_name = req.body.group_name;
      let group_owner = req.body.group_owner;
      let group_members = req.body.group_members;
      let attributes = req.body.attributes;
      let invited_members = req.body.invited_members;

      
      console.log('group_id', group_id);
      console.log('app_id', app_id);
      console.log('group_name', group_name);
      console.log('group_owner', group_owner);
      console.log('group_members', group_members);
      console.log('attributes', attributes);
      console.log('invited_members', invited_members);

      chatApi.updateGroupWithId(group_id, group_name, group_owner, group_members, app_id, attributes, invited_members).then(function(result) {
        console.log('result', result);
        res.status(200).send({"success":true});
      });   
    });
  }

    /**
 * Join a group
 
 *
 * This endpoint supports CORS.
 */
// [START trigger]
exports.joinGroup = (req, res) => {
  console.log('join group');

    if (req.method !== 'POST') {
      res.status(403).send('Forbidden!');
    }
      
      cors(req, res, () => {

        if (!req.body.member_id) {
            res.status(405).send('member_id is not present!');
        }
        if (!req.params.group_id) {
            res.status(405).send('group_id is not present!');
        }
        if (!req.params.app_id) {
            res.status(405).send('app_id is not present!');
        }

        let member_id = req.body.member_id;
        let group_id = req.params.group_id;
        let app_id = req.params.app_id;


        console.log('member_id', member_id);
        console.log('group_id', group_id);
        console.log('app_id', app_id);


       chatApi.joinGroup(member_id, group_id, app_id).then(function(result) {
        console.log('result', result);
        res.status(201).send({"success":true});
      });             
      });
    }

    /**
 * Leave a group
 * 
 *
 * This endpoint supports CORS.
 */
// [START trigger]
exports.leaveGroup = (req, res) => {
  console.log('leave group');      
      cors(req, res, () => {

        if (!req.params.member_id) {
            res.status(405).send('member_id is not present!');
        }
        if (!req.params.group_id) {
            res.status(405).send('group_id is not present!');
        }
        if (!req.params.app_id) {
            res.status(405).send('app_id is not present!');
        }

        let member_id = req.params.member_id;
        let group_id = req.params.group_id;
        let app_id = req.params.app_id;


        console.log('member_id', member_id);
        console.log('group_id', group_id);
        console.log('app_id', app_id);


        chatApi.leaveGroup(member_id, group_id, app_id).then(function(result) {
          console.log('result', result);
          res.status(204).send({"success":true});
        });      
      });
    }

  
 /**
 * Set members of a group
 
 *
 * This endpoint supports CORS.
 */
// [START trigger]
exports.setMembersGroup = (req, res) => {
  console.log('set members group');

    if (req.method !== 'PUT') {
      res.status(403).send('Forbidden!');
    }
      
      cors(req, res, () => {

        if (!req.params.group_id) {
            res.status(405).send('group_id is not present!');
        }
        if (!req.params.app_id) {
            res.status(405).send('app_id is not present!');
        }

        let members = req.body.members;
        let group_id = req.params.group_id;
        let app_id = req.params.app_id;


        console.log('members', members);
        console.log('group_id', group_id);
        console.log('app_id', app_id);


        chatApi.setMembersGroup(members, group_id, app_id).then(function(result) {
          console.log('result', result);
          res.status(200).send({"success":true});
        });   
      });
}


     /**
 * Update attributes of a group
 
 *
 * This endpoint supports CORS.
 */
// [START trigger]
exports.setAttributesGroup = (req, res) => {
  console.log('set attributes group');

    if (req.method !== 'PUT') {
      res.status(403).send('Forbidden!');
    }
      
      cors(req, res, () => {

        if (!req.params.group_id) {
            res.status(405).send('group_id is not present!');
        }
        if (!req.params.app_id) {
            res.status(405).send('app_id is not present!');
        }

        let attributes = req.body.attributes;
        let group_id = req.params.group_id;
        let app_id = req.params.app_id;


        console.log('attributes', attributes);
        console.log('group_id', group_id);
        console.log('app_id', app_id);

        // updateAttributesGroup(attributes, group_id, app_id) {
        chatApi.updateAttributesGroup(attributes, group_id, app_id).then(function(result) {
          console.log('result', result);
          res.status(200).send({"success":true});
        });   
      });
}

     /**
 * Typing
 
 *
 * This endpoint supports CORS.
 */
// [START trigger]
exports.typing = (req, res) => {
  console.log('set Typing');

    if (req.method !== 'PUT') {
      res.status(403).send('Forbidden!');
    }
      
      cors(req, res, () => {

        if (!req.params.recipient_id) {
            res.status(405).send('recipient_id is not present!');
        }
        if (!req.params.app_id) {
            res.status(405).send('app_id is not present!');
        }
        let writer_id = req.user.uid;
        if (req.body.writer_id) {
          writer_id = req.body.writer_id;
        }
        let text = "";
        if (req.body.text) {
          text = req.body.text;
        }
       
        let timestamp = undefined;
        if (req.body.timestamp) {
          timestamp = req.body.timestamp;
        }
       

        let recipient_id = req.params.recipient_id;
        let app_id = req.params.app_id;


        console.log('recipient_id', recipient_id);
        console.log('writer_id', writer_id);
        console.log('app_id', app_id);
        console.log('text', text);
        console.log('timestamp', timestamp);


          // typing(writer_id, recipient_id, text, app_id) 
        chatApi.typing(writer_id, recipient_id, text, timestamp, app_id).then(function(result) {
          console.log('result', result);
          res.status(200).send({"success":true});
        });      
      });
}


    /**
 * Get a contact
 
 * This endpoint supports CORS.
 */
// [START trigger]
exports.getContact = (req, res) => {
  console.log('get a contact');

    if (req.method !== 'GET') {
      res.status(403).send('Forbidden!');
    }
      
      cors(req, res, () => {

       
        if (!req.params.contact_id) {
            res.status(405).send('contact_id is not present!');
        }

        if (!req.params.app_id) {
          res.status(405).send('app_id is not present!');
        }


    
        let contact_id = req.params.contact_id;
        let app_id = req.params.app_id;

        console.log('contact_id', contact_id);
        console.log('app_id', app_id);

        chatApi.getContactById(contact_id, app_id).then(function(contact) {
          res.status(200).send(contact);
        });
      });
}



    /**
 * Create a contact
 
 * This endpoint supports CORS.
 */
// [START trigger]
exports.createContact = (req, res) => {
  console.log('create a contact');
    if (req.method !== 'POST') {
      res.status(403).send('Forbidden!');
    }
      
    cors(req, res, () => {
        if (req.body.firstname  == undefined) {
            res.status(405).send('firstname is not present!');
        }
        if (req.body.lastname == undefined) {
          res.status(405).send('lastname is not present!');
        }
       
        if (!req.params.app_id) {
            res.status(405).send('app_id is not present!');
        }

        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;

        let current_user = req.user.uid;
       
        if (req.body.current_user) {
          current_user = req.body.current_user;
        }

        let app_id = req.params.app_id;


        console.log('firstname', firstname);
        console.log('lastname', lastname);
        console.log('current_user', current_user);
        console.log('app_id', app_id);


       chatApi.createContactWithId(current_user, firstname, lastname, email, app_id).then(function(result) {
        console.log('result', result);
        res.status(201).send({"success":true});
      });      
    });
}

/**
 * Update my contact
 
 * This endpoint supports CORS.
 */
// [START trigger]

exports.updateMyContact = (req, res) => {
  console.log('update my contact information');
    if (req.method !== 'PUT') {
      res.status(403).send('Forbidden!');
    }
      
    cors(req, res, () => {

        if (req.body.firstname  == undefined) {
            res.status(405).send('firstname is not present!');
        }
        if (req.body.lastname == undefined) {
          res.status(405).send('lastname is not present!');
        }
       
        if (!req.params.app_id) {
            res.status(405).send('app_id is not present!');
        }

        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        // let email = req.body.email;

        let current_user = req.user.uid;

        if (req.body.current_user) {
          current_user = req.body.current_user;
        }

        
        let app_id = req.params.app_id;


        console.log('firstname', firstname);
        console.log('lastname', lastname);
        console.log('current_user', current_user);
        console.log('app_id', app_id);


       chatApi.changeContactFullname(current_user, firstname, lastname, app_id).then(function(result) {
        console.log('result', result);
        res.status(200).send({"success":true});
      });     
    });
}
/**
 * Delete my photo profile
 
 * This endpoint supports CORS.
 */
// [START trigger]
exports.deletePhoto = (req, res) => {

  console.log('delete my photo profile information');

   
    if (req.method !== 'DELETE') {
      res.status(403).send('Forbidden!');
    }
      
      cors(req, res, () => {

       
        if (!req.params.app_id) {
            res.status(405).send('app_id is not present!');
        }

      
        let current_user = req.user.uid;

        let app_id = req.params.app_id;


        console.log('current_user', current_user);
        console.log('app_id', app_id);


        chatApi.deleteContactBucket(current_user, app_id).then(() => {
          console.log(`Bucket  deleted.`);
          res.status(204).send();
        });

      });
    }
    
    /**
 * Auth check
 
 *
 * This endpoint supports CORS.
 */
// [START trigger]
exports.verifytoken = (req, res) => {
  console.log('verifytoken');
    if (req.method !== 'GET') {
      res.status(403).send('Forbidden!');
    }
      
      cors(req, res, () => {

        res.status(200).send();
      });
    }

/**
  * subscribe/unsubscribe user to receive email 
  * This endpoint supports CORS.
  */

 exports.receiveEmail = (req, res) => {
  console.log('===== BEGIN email - unsubscribe =====');

  if (req.method !== 'POST') {
    res.status(403).send('Forbidden!');
  }

  cors(req, res, () => {

    if (!req.params.app_id) {
      res.status(405).send('app_id is not present!');
    }

    if (!req.params.user_id) {
      res.status(405).send('user_id is not present!');
    }

    if (!req.body.is_subscribed) {
      res.status(405).send('is_subscribed is not present!');
    }

    let app_id = req.params.app_id;
    console.log('app_id', app_id);

    // let user_id = req.body.user_id;
    let user_id = req.params.user_id;
    console.log('user_id', user_id);

    let is_subscribed = req.body.is_subscribed;
    console.log('is_subscribed', is_subscribed);

    var result = chatApi.subscribeEmail(user_id, is_subscribed, app_id); // its a promise
    // console.log('result', result);

    result.then(function (data) {
      // console.log("data" , data);
      console.log("email subscriptions setting saved successfully. " , data['email']);
      console.log('===== END email - unsubscribe =====');
      // res.status(201).send(JSON.stringify(data['snapshot']));
      // res.status(201).send(JSON.stringify(data['email']));
      res.status(201).send(data['email']);
    }).catch(function (error) {
      console.log("email subscriptions setting could not be saved. " , error);
      console.log('===== END email - unsubscribe =====');
      res.status(405).send(JSON.stringify(error));
    });
  });
}