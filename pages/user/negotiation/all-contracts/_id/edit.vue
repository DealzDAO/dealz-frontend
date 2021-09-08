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

                <!-- accepted -->
                <div class="chip bg-white">
                    <span>Approved {{moment.utc(contract.contract.createdAt).fromNow()}}</span>
                </div>
                <!-- end accepted -->

                <!-- contract -->
                <div class="contract-box mt-2">
                    <div v-html="contract.contract.contract_details"></div>
                </div>
                <div class="mt-2">
                    <b-button class="my-btn bg-primary-light px-3" @click="fillUp">
                        <p>
                            <b-icon icon="pencil"></b-icon>
                            Fill Contract
                        </p>
                    </b-button>
                    <b-button class="my-btn bg-primary-light px-3 float-right">
                        <p>
                            <b-icon icon="pencil"></b-icon>
                            Send for Approval
                        </p>
                    </b-button>
                </div>
                <!-- end contract -->
            </div>

        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
    data() {
        return {
            contract: '',
            moment:moment
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
            axios.get(this.$axios.defaults.baseURL +'/user/user-contract/'+this.id, {
                    headers: {
                        Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                    }
                })
                .then(res => {
                    console.log('edit:',res.data)
                    this.contract = res.data
                    this.$store.commit('user/setFillable',res.data)
                })
                .catch(err => console.log(err))

        },
        goBack() {
            this.$router.push('/user/negotiation/all-contracts')
        },
        fillUp(){
           this.$router.push({
                        name: 'user-negotiation-all-contracts-id-fill',
                        params: {
                            id: this.contract.userContract._id
                        }
                    })
        }

    }
}
</script>

<style scoped>

</style>
