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
      where: {isDev: 1}
    })
    .intercept((err)=>{
       err.message = 'Something went wrong somewhere, contact tech support : '+ err.message;
       return err;
    });
    sails.log('Developers :',developers)

    return exits.success({
      developers: developers,
    });

  }


};
