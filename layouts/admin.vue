<template>
  <div>
    <div class="container-fluid bg-light-light">
      <div class="row">
            <div style="width:268px;border-right:1px solid rgba(17, 17, 17, 0.1);">
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
  middleware:['auth','isAdmin']
};
</script>

<style lang="scss">
@import "~/assets/styles/Dashboard.scss";
@import "~/assets/styles/Admin.scss";
@import "~/assets/styles/typography.scss";
@import "~/assets/styles/color.scss";
</style>
