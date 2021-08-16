<template>
<div>
    <b-modal v-model="buyDealz" centered hide-footer size="lg">
        <div class="bg-white viewBox">
            <div class="row justify-content-center">
                <div class="col-7">
                    <p class="text-center title-text2 mb-0">Buy Dealz</p>
                    <p class="text-center helper-text3">Buy Dealz Tokens</p>
                    
                        <b-input-group>
                            <template #append>
                                <b-input-group-text class="bg-white input-append p-0">
                                    <b-form-select v-model="selectedCurrency" :options="currency" class="adjust-btn"></b-form-select>
                                </b-input-group-text>
                            </template>
                            <b-form-input class="input-style" style="border-right:none;" :state="null" placeholder="Currency"></b-form-input>
                        </b-input-group>

                         <b-input-group class="mt-3">
                            <template #append>
                                <b-input-group-text class="bg-white input-append p-0">
                                    <b-form-select v-model="selectedAmount" :options="amount" class="adjust-btn"></b-form-select>
                                </b-input-group-text>
                            </template>
                            <b-form-input class="input-style" style="border-right:none;" :state="null" placeholder="Amount"></b-form-input>
                        </b-input-group>
                        <p class="helper-text4 mt-2 text-helper2">1 DAI = 0.3323 ETH</p>
                        <b-button class="my-btn bg-primary-light mb-10" block>
                            <p>Buy Tokens</p>
                        </b-button>
                    
                </div>
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
            currency: [
                {
                    value: null,
                    text: "ETH"
                },
                {
                    value: "Bitcoin",
                    text: "Bitcoin"
                },
            ],
            amount: [
                {
                    value: null,
                    text: "DAI"
                },
                {
                    value: "MAI",
                    text: "MAI"
                },
            ],
            selectedAmount:null,
            selectedCurrency:null
        }
    },
    computed: {
        buyDealz: {
            get() {
                return this.$store.state.lawyer.buyDealz
            },
            set(value) {
                this.$store.commit('lawyer/unsetBuyDealzDialog', false)
            }
        }
    },
    methods: {

    }
}
</script>

<style lang="scss">
.viewBox {
    min-height: 300px;
    padding: 10px;
}

.adjust-btn {
    width: 100px;
    border-left: 1px solid #dfe6ec;
    border-right: none;
    border-top: none;
    border-bottom: none;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;

}
</style>
