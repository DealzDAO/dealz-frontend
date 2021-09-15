<template>
<div>
    <div class="container" v-if="contract != ''">
        <div class="row px-4 pt-3">
            <p class="subtitle-text2 link">
                <b-icon icon="arrow-left" class="link mr-lg-3" @click="goBack"></b-icon>
                {{contract.contract.title}}
            </p>
        </div>
        <div class="row px-5">
            <div class="col">
                <!-- status -->
                <div class="admin-chip bg-secondary-light">
                    <p class="text-secondary">
                        <b-icon icon="clock-history"></b-icon>
                        {{contract.contract.status}}
                    </p>
                </div>
                <!-- end status -->

                <!-- status -->
                <div class="admin-chip bg-secondary-light">
                    <p class="text-secondary">
                        <b-icon icon="clock-history"></b-icon>
                        {{contract.userContract.status}}
                    </p>
                </div>
                <!-- end status -->

                 <!-- comments -->
                <div class="admin-chip bg-secondary-light">
                    <p class="text-secondary">
                        <b-icon icon="clock-history"></b-icon>
                        {{contract.contract.contract_details.length}}
                        Comments
                    </p>
                </div>
                <!-- end comments -->

                <!-- accepted -->
                <div class="chip bg-white">
                    <span>Approved {{moment.utc(contract.contract.createdAt).fromNow()}}</span>
                </div>
                <!-- end accepted -->

                <!-- contract -->
                <div class="contract-box mt-2">
                    <div v-html="contract.contract.contract_details"></div>
                </div>
                <!-- end contract -->
            </div>

        </div>
    </div>
    <div v-else class="d-flex justify-content-center mt-5">
        <b-spinner variant="primary"></b-spinner>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import {
    ValidationProvider,
    ValidationObserver,
    extend
} from "vee-validate";
import {
    required,
    email
} from "vee-validate/dist/rules";
extend("required", {
    ...required,
    message: "This field is required",
});

extend("email", {
    ...email,
    message: "This field must be a valid email",
});
export default {
    components: {
        ValidationProvider,
        ValidationObserver
    },
    data() {
        return {
            contract: '',
            moment: moment,
            approvalDialog: false,
            email: '',
            sendText: 'Send Contract',
            emailError:''
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
    },
    mounted() {
        this.getContractDetails()
    },
    methods: {
        getContractDetails() {
            axios.get(this.$axios.defaults.baseURL + '/user/user-contract/' + this.id, {
                    headers: {
                        Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                    }
                })
                .then(res => {
                    console.log('edit:', res.data)
                    this.contract = res.data
                    this.$store.commit('user/setFillable', res.data)
                })
                .catch(err => console.log(err))

        },
        goBack() {
            this.$router.push('/user/negotiation/all-contracts')
        },
        fillUp() {
            this.$router.push({
                name: 'user-negotiation-all-contracts-id-fill',
                params: {
                    id: this.contract.userContract._id
                }
            })
        },
        sendForApproval() {
            const params = {
                id: this.$auth.$state.user.id,
                email: this.email
            }
            const config = {
                headers: {
                    Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                }
            }

            this.$refs.approveForm.validate().then((success) => {
                if (!success) {
                    return;
                }
                this.sendText = 'Sending...'
                axios.post(this.$axios.defaults.baseURL + '/user/send-for-approval/', params, config)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.Success==true) {
                             this.approvalDialog=false
                             this.sendText='Contract sent'
                            this.successToast(res.data.message);
                        }
                        else{
                            this.emailError=res.data.message
                            this.sendText='Send Contract'
                        }
                        

                    })
                    .catch(err => console.log(err))

            })
        }
    }
}
</script>
