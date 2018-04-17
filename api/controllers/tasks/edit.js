module.exports = {


  friendlyName: 'View projects',


  description: 'Display "Projects" page.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      example: 1
    },

    taskName: {
      type: 'string',
      required: true,
      description: 'The name of the project',
      example: 'TopBar navigation fix'
    },

    taskDescription: {
      type: 'string',
      required: true,
      description: 'The topbar navigation on the website was in a wrong size & colour, this has been corrected by this task'
    },

    // taskDate: {
    //   type: 'number', ???
    //   required: true,
    //   description: 'A task\'s completed date',
    //   example: 1 ???
    // },

    taskHours: {
      type: 'number',
      required: true,
      description: 'How many hours was spent on this task',
      example: 1
    },

    project: {
      type: 'number',
      required: true,
      example: 1,
    },

  },

  exits: {

    err: {
      responseType: 'badRequest',
      description: 'Oh! seems like something went wrong in \'/developers/edit.js\', Please contact tech support.'
    },

    success: {
      viewTemplatePath: 'pages/tasks'
    },

    created: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    let id = inputs.id

    sails.log('Inputs are', inputs);

    await Task.update(id)
    .set(inputs)
    .intercept((err)=>{
       err.message = 'Uh oh: '+err.message;
       return err;
    })

    return exits.created('/tasks');
  }


};
