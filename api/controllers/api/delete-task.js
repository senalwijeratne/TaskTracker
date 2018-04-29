module.exports = {


  friendlyName: 'Update profile',


  description: 'Update the profile for the logged-in user.',


  exits: {

    err: {
      statusCode: 500,
      description: 'You don\'t seem to have permission to do this',
    },
    success: {
      statusCode: 200,
      description: 'Record successfully deleted',
    },

  },


  fn: async function (inputs, exits) {


    let { id } = this.req.params

    let task = await Task.findOne(id)

    await Project.removeFromCollection(task.project,'tasks')
    .members(task.id)

    await User.removeFromCollection(task.assignedDev,'assignedTasks')
    .members(task.id)

    let deletedTask = await Task.destroy(task.id).fetch()

    return exits.success({deletedTask: deletedTask})

  }


};
