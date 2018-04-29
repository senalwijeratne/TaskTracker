module.exports = {


  friendlyName: 'View Developers page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    err: {
      responseType: 'badRequest',
      description: 'something somewhere went wrong in view-developers.js request'
    },

    success: {
      viewTemplatePath: 'pages/developers/view-developers',
      description: 'Display the developers page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {

    //
    let developers = await User.find({
      where: {
        isDev: 1,
        isDeleted: 0,
      }
    })
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });

    let tasks = await Task.find()
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });

    developers.forEach( dev =>{
      let devSummary = {}
      let individualWorkHours = 0
      let individualOvertimeHours = 0

      tasks.forEach( task => {

        if(task.assignedDev === dev.id){
          individualWorkHours += task.taskHours
          individualOvertimeHours += task.taskOvertime
        }
      })

      devSummary.workHours = individualWorkHours
      devSummary.overTimeHours = individualOvertimeHours

      dev.devSummary = devSummary

    })

    sails.log('Developers :',developers)

    return exits.success({
      developers: developers,
    });

  }


};
