<template>
<div>
    <div class="container">
        <div class="row p-3">
            <div class="col">
                <p class="data2">Preview Contract</p>
                <div class="contract-box w-100 hidden-scroll" v-html="detail"></div>
                <p class="data2 mt-4"><b>Step 3:</b> <span class="helper-text">Add Questions</span></p>
                <div class="row justify-content-between px-3">
                    <b-button class="my-btn px-5 bg-primary-light" @click="next">
                        <p>Continue</p>
                    </b-button>
                    <div>
                        <b-button class="btn-outlined" @click="saveSecond" :disabled="btnDisabled">
                            <p class="text-primary-light">{{btnText}}</p>
                        </b-button>
                        <b-button class="my-btn bg-white">
                            <p class="text-danger-light">Continue</p>
                        </b-button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            btnText:'Save Draft',
            btnDisabled:false
        }
    },
    computed:{
        detail(){
            return this.$store.state.lawyer.detail
        }
    },
    methods: {
        next() {
            this.$store.commit('lawyer/nextStep')
        },
        saveSecond(){
            this.btnText='Saving...'
            this.btnDisabled=true
            this.$store.dispatch('lawyer/saveSecondDraft')
        }
    }
}
</script>
