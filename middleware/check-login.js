export default function(context) {
  if (context.$auth.$state.loggedIn) {
    var role = context.$auth.$state.user.User_type;
    if (role == "Lawyer") {
      context.redirect("/lawyer");
    } else if (role == "User") {
      context.redirect("/user");
    } else if (role == "Admin") {
      context.redirect("/admin");
    }
  }
}
