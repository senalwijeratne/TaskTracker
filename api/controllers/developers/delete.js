module.exports = {


  friendlyName: 'View Add Projects page',


  description: 'Display the form that\'s used to add new projects to the database',

  exits: {

    err: {
      responseType: 'badRequest',
      description: 'Oh! seems like something went wrong in \'/dashboard/add.js\', Please contact tech support.'
    },

    success: {
      viewTemplatePath: 'pages/developers'
    },

    deleted: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    let id = this.req.params.id

    await User.update(id)
    .set({
      isDeleted: true,
    })
    .intercept((err)=>{
       err.message = 'Ah Crap! Something went wrong in \'developers/delete.js\', Call tech support fam: '+err.message;
       return err;
    })

    return exits.deleted('/developers');

  }


};
