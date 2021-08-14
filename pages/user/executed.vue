<template>
<div>
    <div class="container-fluid mild-back">
        <div class="row px-4 pt-3 line-border  mild-back">
            <p class="subtitle-text">Contracts</p>
        </div>
        <div class="row line-border px-4">
            <b-tabs pills  active-nav-item-class="text-primary" active-tab-class="bg-primary-light" v-model="tabIndex">
                <b-tab title="Signed" @click="setTab(0,'signed')" class="menu-text" :title-link-class="linkClass(0)"></b-tab>
            </b-tabs>
        </div>
    </div>
    <nuxt-child />
</div>
</template>
<script>
export default {
    layout:'user',
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
            this.tab = n1
            this.$router.push('/user/executed/'+n2)
        }
    }
}
</script>
