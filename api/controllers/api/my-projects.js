module.exports = {


  friendlyName: 'Update profile',


  description: 'Update the profile for the logged-in user.',


  exits: {

    err: {
      statusCode: 500,
      description: 'You don\'t seem to have permission to do this.',
    },
    success: {
      statusCode: 200,
      description: 'Welcome.',
    },

  },


  fn: async function (inputs, exits) {


    let { id } = this.req.params

    let thisUser = await User.findOne(id)

    if(thisUser.isManager){

      let managerProjects = await Project.find({
        where: { manager: id }
      })
      .populate('manager')
      .populate('dev')
      .populate('tasks')
      .intercept((err)=>{
         err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
         return err;
      })

      managerProjects.forEach( project => {

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

      return exits.success({'Your Projects':managerProjects})

    }

    return exits.err()

  }


};
