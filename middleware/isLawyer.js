export default function(context) {
  var role = context.$auth.$state.user.User_type;
  if (role == "Admin") {
    context.redirect("/admin");
  } else if (role == "User") {
    context.redirect("/user");
  }
}
