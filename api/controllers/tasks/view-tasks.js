module.exports = {


  friendlyName: 'View Tasks page',


  description: 'Display the user\'s tasks which were read from the database',


  exits: {

    success: {
      viewTemplatePath: 'pages/tasks/view-tasks',
      description: 'Display the Tasks page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
