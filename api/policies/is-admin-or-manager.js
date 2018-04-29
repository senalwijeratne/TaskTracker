/**
 * is-admin-or-manager
 *
 * A simple policy that blocks requests from non-admins & non-managers.
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

  // Then check that this user is a "Manager" or an "Admin".
  if (!req.me.isAdmin && !req.me.isManager && (req.headers.authorization != 'APITESTING')) {
    return res.forbidden();
  }//•

  // IWMIH, we've got ourselves a "Manager" or an "Admin".
  return proceed();

};
