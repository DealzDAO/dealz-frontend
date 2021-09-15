<template>
<div>
    <div class="container px-4 my-2">
        <div class="row">
            <div class="col">
                <p class="mb-1 subtitle-text4">
                    {{contract.title}}
                </p>
                <!-- status -->
                <div class="admin-chip bg-secondary-soft">
                    <p class="text-secondary-light">{{contract.status}}</p>
                </div>
                <!-- end status -->

                <!-- comments -->
                <div class="admin-chip bg-primary-soft">
                    <p class="text-primary-light" v-if="contract!=''">
                        {{6-contract.accepted.length}} spots left
                    </p>
                </div>
                <!-- end spots -->

                <!-- accepted -->
                <div class="chip bg-white">
                    <span>Accepted {{moment.utc(contract.createdAt).fromNow()}}</span>
                </div>
                <!-- end accepted -->

                <div class="contract-box mt-3 hidden-scroll" v-html="contract.contract_details"></div>
        
                <b-button  class="my-btn bg-primary-light mt-3" @click="acceptContract()" :disabled="disabled">
                    <b-spinner class="float-left mr-2" small v-if="accepting"></b-spinner>
                    <p class="float-right">{{btnText}}</p>
                </b-button>
            </div>
        </div>
    </div>

    <b-modal size="lg" centered v-model="acceptedDialog" hide-footer>
        <div>
            <div class="bg-white viewBox">
                <div class="row justify-content-center">
                    <div class="col-9">
                        <p class="text-center h1">
                            <b-icon icon="check" variant="success"></b-icon>
                        </p>
                        <p class="title-text2 text-center">Contract accepted successfully</p>
                        <p class="helper-text3 text-center">You will have upto 7 days to verify contract from your end.<br>
                            In case you are not able to verify, a certain amount will be charged as fine</p>
                        <p class="text-center">
                            <b-button class="my-btn bg-primary-light px-5" @click="seeCollabs">
                                <p>See Other Collaborations</p>
                            </b-button>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </b-modal>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
    data() {
        return {
            moment: moment,
            contract: '',
            disabled: false,
            btnText: '',
            acceptedDialog:false,
            accepting:false
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        dealzUser() {
            return this.$store.state.dealz.dealzUser
        }
    },
    mounted() {
        this.getContractDetails()
        console.log('auth:',this.$auth.$state.user.id)
    },
    methods: {
        getContractDetails() {
            axios.get('https://dealzlegal.herokuapp.com/api/lawyer/single-collab-requests/' + this.id, {
                    headers: {
                        Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                    }
                })
                .then(res => {
                    this.contract = res.data
                    this.getBtn()
                })
                .catch(err => console.log(err.response))
        },
        acceptContract() {
            this.accepting=true
            const params = {
                id: this.contract._id
            }
            const config = {
                headers: {
                    Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                }
            }
            axios.post('https://dealzlegal.herokuapp.com/api/lawyer/accept-contract-collab', params, config)
                .then(res => {
                    this.disabled=true
                    this.btnText='Collaborator Request Accepted'
                    this.acceptedDialog=true
                    this.accepting=false
                })
                .catch(err => console.log(err.response))
        },
        getBtn() {
            if (this.contract.accepted.includes(this.$auth.$state.user.id)) {
                this.disabled = true
                this.btnText = 'Collaborator Request Accepted'
            } else {
                this.btnText = 'Accept Contract Collaborator Seat'
            }

        },
        seeCollabs(){
            this.$router.push('/lawyer/contracts/collaboration-requests')
        }
    }
}
</script>
