module.exports = {


  friendlyName: 'View Add Projects page',


  description: 'Display the form that\'s used to add new projects to the database',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/add-projects',
      description: 'Display the add Projects page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    let managers = await User.find({
      where: {isManager: 1}
    })
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });
    sails.log('Managers :',managers)

    let developers = await User.find({
      where: {isDev: 1}
    })
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });
    sails.log('Developers :',developers)


    return exits.success({
      managers: managers,
      developers: developers,
    });

  }


};
