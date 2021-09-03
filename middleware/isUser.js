export default function(context) {
  if (context.$auth.$state.user) {
    var role = context.$auth.$state.user.User_type;
    if (role == "Lawyer") {
      context.redirect("/lawyer");
    } else if (role == "Admin") {
      context.redirect("/admin");
    }
  } else {
    context.redirect("/login");
  }
}
