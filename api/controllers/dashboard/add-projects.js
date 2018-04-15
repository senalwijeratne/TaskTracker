module.exports = {


  friendlyName: 'View Add Projects page',


  description: 'Display the form that\'s used to add new projects to the database',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/add-projects',
      description: 'Display the add Projects page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
