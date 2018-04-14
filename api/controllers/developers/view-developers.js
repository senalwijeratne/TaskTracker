module.exports = {


  friendlyName: 'View Developers page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/developers/view-developers',
      description: 'Display the developers page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
