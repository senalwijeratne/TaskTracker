module.exports = {


  friendlyName: 'View Edit Projects page',


  description: 'Display the form that\'s used to edit projects in the database',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/edit-projects',
      description: 'Display the Edit Projects page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    let id = this.req.params
    let projects = await Project.find(id)
    .populate('manager')
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });
    // sails.log('Selected project is :',projects)

    let managers = await User.find({
      where: {isManager: 1}
    })
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });
    // sails.log('managers are :',managers)

    let developers = await User.find({
      where: {isDev: 1}
    })
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });
    sails.log('Developers are :', developers)

    return exits.success({
      managers: managers,
      developers: developers,
      projects: projects[0],
    });

  }


};
