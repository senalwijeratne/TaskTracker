module.exports = {


  friendlyName: 'View Add Tasks page',


  description: 'Display the add tasks form so that the new task details can be saved to the database',


  exits: {

    success: {
      viewTemplatePath: 'pages/tasks/add-tasks',
      description: 'Display Add Tasks page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    let {id} = this.req.me

    let dev = await User.find(id)
    .populate('projects')
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    })

    sails.log('Dev :', dev)

    let projects = dev[0].projects

    sails.log('Projects :', projects)

    return exits.success({
      projects: projects,
    });

  }


};
