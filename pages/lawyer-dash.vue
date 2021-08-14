<template>
<div>
    <div class="container-fluid mild-back">
        <div class="row pt-3 pb-3 line-border">
            <p class="title-text center-push">
                <b-icon icon="layers" class="mr-2"></b-icon>Contracts
            </p>
        </div>
        <div class="row line-border justify-content-between">
            <b-tabs pills class="center-push" active-nav-item-class="font-weight-bold text-primary" active-tab-class="bg-primary-light" v-model="tabIndex">
                <b-tab title="Your Contracts" @click="setTab(0,'contracts')" class="menu-text" :title-link-class="linkClass(0)"></b-tab>

                <b-tab title="Verification requests" @click="setTab(1,'requests')" class="menu-text" :title-link-class="linkClass(1)"></b-tab>
                <b-tab title="4" style="background-color:yellow" title-link-class="badge-title" title-item-class="bg-primary-light my-badge"></b-tab>
            </b-tabs>
            <a href="/new-contract" class="center-push">
                <b-button class="my-btn mt-1">
                    <p>Create a new contract</p>
                </b-button>
            </a>
        </div>
    </div>
</div>
</template>

<script>
export default {
    middleware: "auth",
    data() {
        return {
            tabIndex: 0,
            tab: 0
        }
    },
    methods: {
        linkClass(idx) {
            this.tabIndex == idx
            if (this.tabIndex === idx) {
                return ['border-bottom']
            } else {
                return ['text-secondary']
            }
        },
        setTab(n1,n2) {
            this.tab = n1,
            this.$router.push('/lawyer/'+n2)
        }
    }
};
</script>

<style lang="scss">
@import "~/assets/styles/Dashboard.scss";
.my-badge{
  width: 25px;
  height: 28px;
  border-radius: 100px;
  margin-top:5px;
  margin-left:-10px;
  color: white !important;
}
.badge-title{
    color: white;
    margin-left:-8px;
    margin-top:-5px;
    cursor: default;
}
.badge-title:hover{
    color: white;
}
</style>
