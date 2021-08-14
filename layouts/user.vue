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
    // middleware: "auth",
    computed: {
        userType() {
            return this.$store.state.userType
        }
    },
    created() {
        if (this.userType != 'User') {
            this.$router.go(-1)
        } 
    },
};
</script>

<style lang="scss">
@import "~/assets/styles/Dashboard.scss";
@import "~/assets/styles/typography.scss";
@import "~/assets/styles/color.scss";
@import "~/assets/styles/Admin.scss";
</style>
