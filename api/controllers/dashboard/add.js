module.exports = {


  friendlyName: 'View Add Projects page',


  description: 'Display the form that\'s used to add new projects to the database',

  inputs: {

    projectName: {
      type: 'string',
      required: true,
      example: 'Task Tracker'
    },

    projectDescription: {
      type: 'string',
      required: true,
      example: 'Task Tracker is a webb app that let\'s it\'s users track their task and have an overview of projects.'
    },

    projectManager: {
      type: 'number',
      required: true,
      description: 'The ID of the project Manager',
    },

    projectMembers: {
      type: 'number',
      description: 'The ID of the project Developer',
    },

  },

  exits: {

    err: {
      responseType: 'badRequest',
      description: 'Oh! seems like something went wrong in \'/dashboard/add.js\', Please contact tech support.'
    },

    success: {
      viewTemplatePath: 'pages/welcome'
    },

    created: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    inputs.projectMembers = 4

    sails.log('The inputs are: ', inputs);

    var newProjectRecord = await Project.create(Object.assign({
      projectName: inputs.projectName,
      projectDescription: inputs.projectDescription,
      manager: inputs.projectManager,
    }))
    .intercept((err)=>{
       err.message = 'Oh! seems like something went wrong in \'/dashboard/add.js\', Please contact tech support :'+ err.message;
       return err;
    })

    return exits.created('/welcome');

  }


};
