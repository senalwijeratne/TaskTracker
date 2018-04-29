module.exports = {


  friendlyName: 'Add task to the DB',


  description: 'Send the data to the database',

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

    assignedDev: {
      type: 'number',
      required: true,
      example: 2,
    },

  },

  exits: {

    err: {
      responseType: 'badRequest',
      description: 'Oh! seems like something went wrong in \'/tasks/add.js\', Please contact tech support.'
    },

    success: {
      viewTemplatePath: 'pages/tasks'
    },

    created: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    sails.log('Inputs are: ', inputs)

    var newTaskRecord = await Task.create(Object.assign({
      taskName: inputs.taskName,
      taskDescription: inputs.taskDescription,
      taskHours: inputs.taskHours,
      taskOvertime: inputs.taskOvertime,
      project: inputs.project,
      assignedDev: inputs.assignedDev,
    }))

    return exits.created('/tasks');

  }


};
