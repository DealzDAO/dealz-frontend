<template>
<div>
    <b-modal v-model="earnDealz" centered hide-footer size="lg">
        <div class="bg-white viewBox">
            <div class="col">
                <div class="icon-back bg-success-mild mx-auto">
                    <p>
                        <b-icon icon="cash" class="admin-icon text-success"></b-icon>
                    </p>
                </div>
                <p class="text-center title-text2 text-helper2">Share & Earn</p>
                <p class="text-center helper-text3">When you share on Twitter, you are airdropped a token.</p>
                <p class="text-center mb-12"><b-button class="my-btn bg-primary-light mx-auto" style="width:50%">
                    <p>Share now</p>
                </b-button></p>
                
            </div>
        </div>
    </b-modal>
</div>
</template>

<script>
import {
    mapMutations
} from 'vuex';
export default {
    data() {
        return {
            earn: true
        }
    },
    computed: {
        earnDealz: {
            get() {
                return this.$store.state.lawyer.earnDealz
            },
            set(value) {
                this.$store.commit('lawyer/unsetEarnDealzDialog', false)
            }
        }
    },
    methods: {

    }
}
</script>

<style lang="scss">
.viewBox {
    padding: 50px 0px;
}
</style>
