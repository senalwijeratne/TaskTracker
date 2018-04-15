module.exports = {


  friendlyName: 'View Edit Tasks page',


  description: 'Display the edit tasks form so that the edited details can be saved to the database',


  exits: {

    success: {
      viewTemplatePath: 'pages/tasks/edit-tasks',
      description: 'Display the Edit Tasks page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
