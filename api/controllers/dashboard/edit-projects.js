module.exports = {


  friendlyName: 'View Edit Projects page',


  description: 'Display the form that\'s used to edit projects in the database',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/edit-projects',
      description: 'Display the Edit Projects page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
