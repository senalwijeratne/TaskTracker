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
      description: 'An API call was made.',
    },

  },


  fn: async function (inputs, exits) {

    let {id} = this.req.params

    let developer = await User.findOne({
      where: {
        id: id,
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


    if(developer){

      let devSummary = {}
      let individualWorkHours = 0
      let individualOvertimeHours = 0

      tasks.forEach( task => {
        if(task.assignedDev === developer.id){
          individualWorkHours += task.taskHours
          individualOvertimeHours += task.taskOvertime
        }
      })

      devSummary.workHours = individualWorkHours
      devSummary.overTimeHours = individualOvertimeHours

      developer.devSummary = devSummary

      return exits.success({developer: developer})
    }




    return exits.err()

  }


};
