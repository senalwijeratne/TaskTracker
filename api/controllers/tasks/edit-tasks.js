module.exports = {


  friendlyName: 'View Edit Tasks page',


  description: 'Display the edit tasks form so that the edited details can be saved to the database',


  exits: {

    success: {
      viewTemplatePath: 'pages/tasks/edit-tasks',
      description: 'Display the Edit Tasks page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    let id = this.req.params
    let task = await Task.find(id)
    .populate('project')
    .populate('assignedDev')
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });
    sails.log('Selected task is :', task)

    let projects= await Project.find()
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });
    // sails.log('Projects are :', projects)

    return exits.success({
      task: task[0],
      projects: projects,
    });

  }


};
