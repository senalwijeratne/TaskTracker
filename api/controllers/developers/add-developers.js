module.exports = {


  friendlyName: 'View Add Developers page',


  description: 'Display the form that\'s used to add new developers to the database',


  exits: {

    success: {
      viewTemplatePath: 'pages/developers/add-developers',
      description: 'Display the add developers page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
