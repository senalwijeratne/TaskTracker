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
    .populate('tasks')
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });
    // sails.log('projects are :',projects)


    // projects.forEach( project => {
    //
    //   project.dev.forEach(async (dev) => {
    //
    //     let allTasksOnThisProject = await Task.find({
    //       where: {
    //         project: project.id,
    //         assignedDev: dev.id,
    //       }
    //     })
    //
    //     let totalHours = 0
    //     let totalOvetime = 0
    //
    //     allTasksOnThisProject.forEach( task => {
    //
    //       totalHours += task.taskHours
    //       totalOvetime += task.taskOvertime
    //
    //     })
    //
    //     dev.totalHours = totalHours
    //     dev.totalOvetime = totalOvetime
    //
    //     console.log('~~~~~~~~~Two keys added:', dev);
    //   })
    //
    // })
    //
    // console.log('This is what the returned projects[0]-dev look like: ', projects[0].dev);



    projects.forEach( project => {

      let projSummary = {}

      projSummary.projectID = project.id
      projSummary.devDetails = []

      let projectDevelopers = project.dev
      let totalProjectHoursWorked = 0

      projectDevelopers.forEach( dev =>{
        let devSummary = {}
        let individualWorkHours = 0
        let individualOvertimeHours = 0

        project.tasks.forEach( task => {

          if(task.assignedDev === dev.id){
            individualWorkHours += task.taskHours
            individualOvertimeHours += task.taskOvertime

            totalProjectHoursWorked += task.taskHours + task.taskOvertime
          }
        })

          devSummary.id = dev.id
          devSummary.fullName = dev.fullName
          devSummary.workHours = individualWorkHours
          devSummary.overTimeHours = individualOvertimeHours

          projSummary.devDetails.push(devSummary)

        })

        projSummary.totalProjectHours = totalProjectHoursWorked

        projSummary.devDetails.forEach( dev => {
          let {workHours, overTimeHours} = dev
          let {totalProjectHours} = projSummary

          dev.contribution = Math.round((( workHours + overTimeHours )/totalProjectHours)*100)
        })

        project.projSummary = projSummary

      })

    sails.log('example projectSummary for index 0 :',projects[0].projSummary)

    return exits.success({
        projects: projects,
    });

  }
};
