module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    err: {
      responseType: 'badRequest',
      description: 'something somewhere went wrong...'
    },

    success: {
      viewTemplatePath: 'pages/dashboard/welcome',
      description: 'Display the welcome page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    // get all the managers from DB
    let managers = await User.find({
      where: {isManager: 1}
    })
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });
    sails.log('managers are :',managers)

    let projects = await Project.find()
    .populate('manager')
    .populate('dev')
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });
    sails.log('projects are :',projects)

    return exits.success({
        managers: managers,
        projects: projects,
    });

  }
};
