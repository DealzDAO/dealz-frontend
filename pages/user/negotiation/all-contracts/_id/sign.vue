<template>
<div>
    <div class="container" v-if="contract != ''">
        <div class="row px-4 pt-3">
            <p class="subtitle-text2">
                <b-icon icon="arrow-left" class="link mr-lg-3" @click="goBack"></b-icon>
                {{ contract.contract.title }}
            </p>
        </div>
        <div class="row px-5">
            <div class="contract-box mt-2">
                <div v-html="contract.userContract.new_contract"></div>
            </div>
            <div class="mt-2">
                <b-button class="my-btn bg-primary-light px-3" @click="signContract" :disabled="disabled">
                    <p>
                        {{signText}}
                    </p>
                </b-button>
            </div>
        </div>
    </div>
    <div v-else class="d-flex justify-content-center mt-5">
        <b-spinner variant="primary"></b-spinner>
    </div>

    <!-- sign dialog -->
    <b-modal v-model="signDialog" centered size="lg" hide-footer>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-10">
                    <p class="text-center mb-0">
                        <b-icon class="big-icon text-success-light" icon="check"></b-icon>
                    </p>
                    <p class="data1 text-center mb-0">Congratulations</p>
                    <p class="helper-text3 text-center">Your contract has been signed and minted</p>
                    <b-card class="bg-light-light">
                        <p class="text-center mb-0">
                            <small><b>Your transaction hash</b></small>
                        </p>
                        <p class="text-helper text-center mb-0">
                            jiw4384834y485 vheiuhfwr387y4852y3urj30qu2q38rq39r3u84wer
                        </p>
                    </b-card>
                    <p class="text-center px-5 mt-2">
                        <b-button class="my-btn bg-primary-light px-5" @click="$router.push('/user/executed')">
                            <p>View Contract</p>
                        </b-button>
                    </p>
                </div>
            </div>
        </div>
    </b-modal>
    <!-- end sign dialog -->
</div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            contract: "",
            signText: 'Sign Contract',
            signDialog: false,
            disabled: false
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        }
    },
    mounted() {
        this.getContractDetails();
    },
    methods: {
        getContractDetails() {
            axios
                .get(this.$axios.defaults.baseURL + "/user/user-contract/" + this.id, {
                    headers: {
                        Authorization: this.$auth.strategy.token.get()
                    }
                })
                .then(res => {
                    console.log('sign:',res.data)
                    this.contract = res.data;
                    this.checkSign()
                })
                .catch(err => console.log(err));
        },
        goBack() {
            this.$router.push("/user/negotiation/all-contracts");
        },
        signContract() {
            this.signText = 'Signing'
            const params = {
                id: this.id,
            }
            const config = {
                headers: {
                    Authorization: this.$auth.strategy.token.get()
                }
            }
            axios.post(this.$axios.defaults.baseURL + '/user/sign-contract/', params, config)
                .then(res => {
                    this.signText = 'Approved'
                    this.disabled = true
                    this.signDialog = true
                })
                .catch(err => console.log(err))
        },
        checkSign(){
            if(this.contract.userContract.sign_id.includes(this.$auth.$state.user.id)){
                this.signText='Already Signed'
                this.disabled=true
            }
        }
    }
};
</script>
