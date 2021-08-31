<template>
<div>
    <div class="container-fluid bg-light-light">
        <div class="row">
            <div class="col-2 p-0">
                <AdminSidebar />
            </div>
            <div class="col-10 p-0">
                <Nuxt></Nuxt>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
   
}
</script>

<style lang="scss">
@import "~/assets/styles/Dashboard.scss";
@import "~/assets/styles/Admin.scss";
@import "~/assets/styles/typography.scss";
@import "~/assets/styles/color.scss";
</style>
