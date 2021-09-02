<template>
<div>
    <div class="container-fluid">
        <div class="row">
            <div style="width:268px">
                <NavigationUsernav />
            </div>
            <div class="col p-0">
                <Nuxt></Nuxt>
                <NavigationFooterhome />
            </div>
        </div>
    </div>
    
</div>
</template>

<script>
export default {
    middleware({ store, redirect }) {
    if (store.state.dealz.dealzToken == null) {
      return redirect("/login");
    } else {
      if (store.state.dealz.dealzUser.User_type == "Admin") {
        return redirect("/admin");
      } else if (store.state.dealz.dealzUser.User_type == "Lawyer") {
        return redirect("/lawyer");
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/assets/styles/Dashboard.scss";
@import "~/assets/styles/typography.scss";
@import "~/assets/styles/color.scss";
@import "~/assets/styles/Admin.scss";
</style>
