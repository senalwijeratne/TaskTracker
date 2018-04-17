module.exports = {


  friendlyName: 'View Edit Projects page',


  description: 'Display the form that\'s used to edit projects in the database',


  exits: {

    err: {
      responseType: 'badRequest',
      description: 'Oh! seems like something went wrong in \'/dashboard/add.js\', Please contact tech support.'
    },

    success: {
      viewTemplatePath: 'pages/welcome'
    },

    removed: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    let projectID = this.req.params.projectID
    let devID = this.req.params.devID
    sails.log('Params are: ', projectID, devID)

    await Project.removeFromCollection(projectID, 'dev')
    .members([devID])

    return exits.removed('/welcome');

  }


};
