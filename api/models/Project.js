/**
 * Project.js
 *
 * A project going through development within the organization
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    projectName: {
      type: 'string',
      required: true,
      maxLength: 200,
      description: 'The name of the project',
      example: 'ConsultMe'
    },

    projectDescription: {
      type: 'string',
      required: true,
      description: 'ConsultMe is an app that offers a variety of professional services to it\'s users'
    },

    startDate: {
      type: 'number',
      allowNull: true,
      description: 'A JS timestamp (epoch ms) representing the moment at which this project started',
      example: 1502844074211
    },

    endDate: {
      type: 'number',
      allowNull: true,
      description: 'A JS timestamp (epoch ms) representing the moment at which this project ended',
      example: 1502844074211
    },

    isDeleted: {
      type: 'boolean',
      description: 'Specifies if a this record has been deleted by the users',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    dev: {
      collection: 'user',
      via: 'projects'
    },

    tasks: {
      collection: 'task',
      via: 'project'
    },

    manager: {
      model: 'user',
    }

  },


};
