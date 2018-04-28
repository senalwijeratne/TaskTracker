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

    let projects = await Project.find({
      where: {isDeleted: 0}
    })
    .populate('manager')
    .populate('dev')
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });
    // sails.log('projects are :',projects)


    await projects.forEach( project => {

      project.dev.forEach(async (dev) => {

        let allTasksOnThisProject = await Task.find({
          where: {
            project: project.id,
            assignedDev: dev.id,
          }
        })

        console.log('');
        console.log('-------------For Project: ', project.projectName);
        console.log('-------------For Dev: ', dev.fullName);
        console.log('allTasksOnThisProject are:', allTasksOnThisProject);

        let totalHours = 0
        let totalOvetime = 0

        await allTasksOnThisProject.forEach( task => {

          totalHours += task.taskHours
          totalOvetime += task.taskOvertime

        })

        dev.totalHours = totalHours
        dev.totalOvetime = totalOvetime

        console.log('~~~~~~~~~Two keys added:', dev);
      })

    })

    console.log('~~~~~~~~~~~~~~~~~~~~~~This is what projects[0]-dev look like: ', projects[0].dev);

    return exits.success({
        projects: projects,
    });

  }
};
