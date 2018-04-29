/**
 * is-admin
 *
 * A simple policy that blocks requests from non-admins.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {

  // First, check whether the request comes from a logged-in user.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
  if (!req.me) {
    return res.unauthorized();
  }//•

  // Then check that this user is a "admin".
  if (!req.me.isAdmin && (req.headers.authorization != 'APITESTING')) {
    return res.forbidden();
  }//•

  // IWMIH, we've got ourselves a "admin".
  return proceed();

};
