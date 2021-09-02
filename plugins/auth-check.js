export default function({ app }) {
  app.router.beforeEach((to, from, next) => {
    console.log(app)
    if (to.name != "login") {
      if (app.store.state.dealz.dealzToken == null) {
        next("/login");
      }
    }
    return next();
  });
}
