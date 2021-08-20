<template>
<div>
    <div class="container">
        <div class="row p-3">
            <div class="col">
                <ValidationObserver ref="contractForm">
                    <p class="data-head">General contact information</p>
                    <ValidationProvider name="email" rules="required|max200" v-slot="{ errors }">
                        <b-form-textarea v-model="description" rows="3" size="sm" class="mb-3 radius10" placeholder="Description of the content"></b-form-textarea>
                        <span class="helper-text4 text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider name="email" rules="required|max200" v-slot="{ errors }">
                        <b-form-textarea v-model="useCase" rows="3" size="sm" class="mb-3 radius10" placeholder="Use cases"></b-form-textarea>
                        <span class="helper-text4 text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <ValidationProvider name="email" rules="required|max200" v-slot="{ errors }">
                        <b-form-textarea v-model="info" rows="3" size="sm" class="mb-3 radius10" placeholder="Additional info"></b-form-textarea>
                        <span class="helper-text4 text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>

                    <p class="data-head">Send an estimated price range for the contract</p>
                    <div class="row px-3">
                        <div class="col-1 p-0">
                            <p class="data3 visible2">Min price</p>
                        </div>
                        <div class="col-2">
                            <b-form-input v-model="minPrice" placeholder="$" class="text-box" style="border-radius:10px" />
                        </div>
                        <div class="col-1 p-0">
                            <p class="data3 visible2">Max price</p>
                        </div>
                        <div class="col-2">
                            <b-form-input v-model="maxPrice" placeholder="$" class="text-box" style="border-radius:10px" />
                        </div>
                    </div>
                    <p class="helper-text4 visible2">
                        <b-icon icon="info-circle"></b-icon>
                        Best price will be decided by collective votes of lawyers and admin panel
                    </p>
                    <p class="visible2" style="font-size:12px">
                        Once you continue, our admins and lawyers will be able to preview the contract.<br>
                        To reply to their comments, simply find this contract in your dasboard.
                    </p>
                    <div class="row justify-content-between px-3">
                        <b-button class="my-btn px-5 bg-primary-light" @click="create">
                            <p>Finish Creating Contract</p>
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
                </ValidationObserver>
            </div>
        </div>
    </div>
    <!-- contract dialog -->
    <b-modal centered size="lg" v-model="contractDialog" hide-footer>
        <div>
            <div class="bg-white viewBox">
                <div class="row justify-content-center">
                    <div class="col-8">
                        <p class="text-center h1">
                            <b-icon icon="check" variant="success"></b-icon>
                        </p>
                        <p class="title-text2 text-center">Contract created successfully</p>
                        <p class="helper-text3 text-center">Our Admins have received the contract. We will notify you as we review it. Thank you.</p>
                        <p class="text-center">
                            <a href="/lawyer/dashboard">
                                <b-button class="my-btn bg-primary-light px-5">
                                    <p>Go to Dashboard</p>
                                </b-button>
                            </a>
                        </p>
                    </div>
                </div>

            </div>
        </div>

    </b-modal>
    <!-- end contract dialog -->
</div>
</template>

<script>
import {
    ValidationProvider,
    ValidationObserver,
    extend
} from "vee-validate";
import {
    required,
} from "vee-validate/dist/rules";
extend("required", {
    ...required,
    message: "This field is required",
});
extend('max10k', {
    validate: value => {
        return value.length <= 10000;
    },
    message: 'Less than 10000 characters'
});
export default {
    data() {
        return {
            contractDialog: false
        }
    },
    computed: {
        description: {
            get() {
                this.$store.state.lawyer.description
            },
            set(value) {
                this.$store.commit('lawyer/setDescription', value)
            }
        },
        useCase: {
            get() {
                this.$store.state.lawyer.useCase
            },
            set(value) {
                this.$store.commit('lawyer/setUseCase', value)
            }
        },
        info: {
            get() {
                this.$store.state.lawyer.info
            },
            set(value) {
                this.$store.commit('lawyer/setInfo', value)
            }
        },
        minPrice: {
            get() {
                this.$store.state.lawyer.minPrice
            },
            set(value) {
                this.$store.commit('lawyer/setMinPrice', value)
            }
        },
        maxPrice: {
            get() {
                this.$store.state.lawyer.maxPrice
            },
            set(value) {
                this.$store.commit('lawyer/setMaxPrice', value)
            }
        }
    },
    methods: {
        create() {
            if (this.$refs.contractForm.validate()) {
                this.contractDialog = true
                this.$store.dispatch('lawyer/createContract')
            }

        }
    }
}
</script>

<style lang="scss">
.radius10 {
    border-radius: 10px;
}
</style>
