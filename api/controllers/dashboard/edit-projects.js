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
    .populate('dev')
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });
    projects = projects[0]
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
    // sails.log('Developers are :', developers)

    notSelectedDevelopers = developers
    if(projects.dev){
      // get an array of all the project.developer id's
      // get an array of all the developer id's
      // compare two arrays
      // use the resulting difference to get the difference of selected devs
      projects.dev.forEach( item => {
         developers.forEach( item2 => {
          if ( item.id == item2.id) {
            notSelectedDevelopers.splice(developers.indexOf(item2),1)
          }
        })
      })
    }
    sails.log('not selected developers are',notSelectedDevelopers)

    return exits.success({
      managers: managers,
      notSelectedDevelopers: notSelectedDevelopers,
      projects: projects,
    });

  }


};
