module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  inputs: {

    id: {
      type: 'number',
      required: true,
      example: 1
    },

    projectDeveloper: {
      type: 'number',
      required: true,
      example: 1
    },

  },

  exits: {

    err: {
      responseType: 'badRequest',
      description: 'something somewhere went wrong...'
    },

    success: {
      viewTemplatePath: 'pages/dashboard/welcome',
      description: 'Display the welcome page for authenticated users.'
    },

    done: {
      responseType: 'redirect',
    },

  },


  fn: async function (inputs, exits) {

    let id = inputs.id
    sails.log('Inputs are: ', inputs)

    await Project.addToCollection(id, 'dev')
    .members([inputs.projectDeveloper])

    return exits.done('/welcome');

  }
};
