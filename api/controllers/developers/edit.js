module.exports = {


  friendlyName: 'View projects',


  description: 'Display "Projects" page.',

  inputs: {

    id: {
      type: 'number',
      required: true,
      example: 1
    },

    fullName: {
      type: 'string',
      required: true,
      example: 'Dave Something'
    },

    emailAddress: {
      type: 'string',
      required: true,
      isEmail: true,
      description: 'The email address for the developer, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },

    isAdmin: {
      type: 'string',
      description: 'Whether this user is a "admin" with extra permissions, etc.',
    },

    isManager: {
      type: 'string',
      description: 'Whether this user is a "Manager" with extra permissions, etc.',
    },

  },

  exits: {

    err: {
      responseType: 'badRequest',
      description: 'something went wrong~ please try again!'
    },

    success: {
      viewTemplatePath: 'pages/developers'
    },

    updated: {
      responseType: 'redirect',
    }

  },


  fn: async function (inputs, exits) {

    let id = inputs.id

    inputs.isAdmin = inputs.isAdmin == 'true' ?  true : false
    inputs.isManager = inputs.isManager == 'true' ?  true : false

    sails.log('Inputs are', inputs);

    await User.update(id)
    .set(inputs)
    .intercept((err)=>{
       err.message = 'Uh oh: '+err.message;
       return err;
    })

    return exits.updated('/developers');
  }


};
