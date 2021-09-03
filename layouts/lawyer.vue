<template>
<div>
    <div class="container-fluid">
        <div class="row">
            <div style="width:268px">
                <NavigationLawyernav />
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
import axios from 'axios'
export default {
   middleware:['auth','isLawyer'],
}
</script>

<style lang="scss">
@import "~/assets/styles/Dashboard.scss";
@import "~/assets/styles/typography.scss";
@import "~/assets/styles/color.scss";
@import "~/assets/styles/Admin.scss";
</style>
