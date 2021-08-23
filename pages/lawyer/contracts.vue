<template>
<div>
    <div class="container-fluid mild-back">
        <div class="row py-3 px-4 line-border">
            <p class="title-text2 mb-0">Contracts</p>
        </div>
        <div class="row px-4 line-border">
            <b-tabs pills active-nav-item-class="text-primary" active-tab-class="bg-primary-light" v-model="tabIndex">
                <b-tab title="All contracts" @click="setTab(0,'all-contracts')" class="menu-text" :title-link-class="linkClass(0)"></b-tab>
                <b-tab title="My Drafts" @click="setTab(1,'my-drafts')" class="menu-text" :title-link-class="linkClass(1)"></b-tab>
                <b-tab title="Collaboration Requests" @click="setTab(2,'collaboration-requests')" class="menu-text" :title-link-class="linkClass(2)"></b-tab>
                <b-tab title="4" style="background-color:yellow" title-link-class="badge-title" title-item-class="bg-secondary my-badge"></b-tab>
                <b-tab title="Verified Templates" @click="setTab(4,'verified-templates')" class="menu-text" :title-link-class="linkClass(4)"></b-tab>
            </b-tabs>
        </div>
    </div>
    <nuxt-child />
</div>
</template>

<script>
export default {
    // middleware: "auth",
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
            this.$router.push('/lawyer/contracts/'+n2)
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
