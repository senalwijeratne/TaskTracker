module.exports = {


  friendlyName: 'View Edit Developers page',


  description: 'Display the form that\'s used to edit developer details on the database',


  exits: {

    success: {
      viewTemplatePath: 'pages/developers/edit-developers',
      description: 'Display the edit developers page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
