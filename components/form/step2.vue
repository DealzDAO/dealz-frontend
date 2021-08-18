<template>
<div>
    <div class="container">
        <div class="row p-3">
            <div class="col">
                <p class="data2">Preview Contract</p>
                <div class="contract-box w-100"></div>
                <p class="data2 mt-4"><b>Step 3:</b> <span class="helper-text">Add Questions</span></p>
                <div class="row justify-content-between px-3">
                    <b-button class="my-btn px-5 bg-primary-light" @click="next">
                        <p>Continue</p>
                    </b-button>
                    <div>
                        <b-button class="btn-outlined">
                            <p class="text-primary-light">Save Draft</p>
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

        }
    },
    methods: {
        next() {
            this.$store.commit('lawyer/nextStep')
        },
    }
}
</script>
