/**
 * Task.js
 *
 * Project tasks which can be assigned to Devs and monitered by manager's and admins
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    taskName: {
      type: 'string',
      required: true,
      maxLength: 200,
      description: 'The name of the project',
      example: 'TopBar navigation fix'
    },

    taskDescription: {
      type: 'string',
      required: true,
      description: 'The topbar navigation on the website was in a wrong size & colour, this has been corrected by this task'
    },

    taskDate: {
      type: 'number',
      description: 'A JS timestamp (epoch ms) representing the day this task was completed',
      example: 1502844074211
    },

    taskHours: {
      type: 'number',
      defaultsTo: 0,
      description: 'How many hours was spent on this task',
      example: 1
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    project: {
      model: 'project',
      unique: true
    },

    assignedDev: {
      model: 'user',
      unique: true
    }

  },


};
