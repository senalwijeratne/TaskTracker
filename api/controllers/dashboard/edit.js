module.exports = {


  friendlyName: 'View Add Projects page',


  description: 'Display the form that\'s used to add new projects to the database',

  inputs: {

    id: {
      type: 'number',
      required: true,
      example: 1
    },

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

    manager: {
      type: 'number',
      required: true,
      description: 'The ID of the project Manager',
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

    let id = inputs.id
    sails.log('Inputs are', inputs);

    await Project.update(id)
    .set(inputs)
    .intercept((err)=>{
       err.message = 'Ah Crap! Something went wrong in \'dashboard/edit.js\', Call tech support fam: '+err.message;
       return err;
    })

    return exits.created('/welcome');

  }


};
