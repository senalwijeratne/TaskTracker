module.exports = {


  friendlyName: 'View Add Tasks page',


  description: 'Display the add tasks form so that the new task details can be saved to the database',


  exits: {

    success: {
      viewTemplatePath: 'pages/tasks/add-tasks',
      description: 'Display Add Tasks page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
