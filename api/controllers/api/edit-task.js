module.exports = {


  friendlyName: 'View projects',


  description: 'Display "Projects" page.',

  inputs: {

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

    taskHours: {
      type: 'number',
      required: true,
      description: 'How many hours was spent on this task',
      example: 10
    },

    taskOvertime: {
      type: 'number',
      description: 'How many hours was spent on this task',
      example: 3
    },

    project: {
      type: 'number',
      required: true,
      example: 1,
    },

  },

  exits: {

    err: {
      statusCode: 500,
      description: 'You don\'t seem to have permission to do this.',
    },
    success: {
      statusCode: 200,
      description: 'An API call was made',
    },

  },


  fn: async function (inputs, exits) {

    let {id} = this.req.params

    sails.log('Inputs are', inputs);

    let updatedTask = await Task.update(id)
    .set(inputs)
    .fetch()
    .intercept((err)=>{
       err.message = 'Uh oh: '+err.message;
       return err;
    })

    return exits.success({updatedTask: updatedTask});
  }


};
