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
    // middleware: "auth",
    computed: {
        userType() {
            return this.$store.state.userType
        }
    },
    created() {
        // console.log(localStorage.getItem('dealz-token'))
        // if (this.userType != 'Lawyer') {
        //     this.$router.go(-1)
        // } 
    },
    mounted() {
        axios.get('https://dealzlegal.herokuapp.com/api/profile/me' ,{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
                }
            })
            .then(res => {
                this.$store.commit('dealz/setDealzAuth', res.data)
            })
            .catch(err => console.log(err.response))
    }
};
</script>

<style lang="scss">
@import "~/assets/styles/Dashboard.scss";
@import "~/assets/styles/typography.scss";
@import "~/assets/styles/color.scss";
@import "~/assets/styles/Admin.scss";
</style>
