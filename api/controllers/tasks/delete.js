module.exports = {


  friendlyName: 'View Add Projects page',


  description: 'Display the form that\'s used to add new projects to the database',

  exits: {

    err: {
      responseType: 'badRequest',
      description: 'Oh! seems like something went wrong in \'/dashboard/add.js\', Please contact tech support.'
    },

    success: {
      viewTemplatePath: 'pages/tasks'
    },

    deleted: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    let id = this.req.params.id

    let deletedTask = await Task.destroy(id).fetch()

    if(deletedTask.length === 0){
      sails.log('No Project found with id: ',id)
    } else {
      sails.log('Deleted Project with id: ', id)
    }

    return exits.deleted('/tasks');

  }


};
