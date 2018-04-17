module.exports = {


  friendlyName: 'View Tasks page',


  description: 'Display the user\'s tasks which were read from the database',


  exits: {

    success: {
      viewTemplatePath: 'pages/tasks/view-tasks',
      description: 'Display the Tasks page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    let tasks = await Task.find()
    .populate('project')
    .populate('assignedDev')
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });
    sails.log('Tasks are :', tasks)

    return exits.success({
      tasks: tasks,
    });

  }


};
