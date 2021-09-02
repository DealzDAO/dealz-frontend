<template>
  <div>
    <div class="container-fluid bg-light-light">
      <div class="row">
        <div class="col-2" style="border-right:1px solid rgba(17, 17, 17, 0.1);">
                <AdminSidebar />
            </div>

            <div class="col p-0">
                <Nuxt></Nuxt>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // middleware({ store, redirect }) {
  //   if (store.state.dealz.dealzToken == null) {
  //     return redirect("/login");
  //   } else {
  //     if (store.state.dealz.dealzUser.User_type == "User") {
  //       return redirect("/user");
  //     } else if (store.state.dealz.dealzUser.User_type == "Lawyer") {
  //       return redirect("/lawyer");
  //     }
  //   }
  // }
};
</script>

<style lang="scss">
@import "~/assets/styles/Dashboard.scss";
@import "~/assets/styles/Admin.scss";
@import "~/assets/styles/typography.scss";
@import "~/assets/styles/color.scss";
</style>
