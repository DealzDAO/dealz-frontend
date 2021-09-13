<template>
<div>
    <div class="container">
        <div class="row py-3 px-4 line-border mild-back">
            <p class="subtitle-text mb-0">
                <span>Dashboard</span>
            </p>
        </div>
        <div v-if="contract !=''">
            <div class="row px-4 pt-3">
                <p class="subtitle-text2 link">
                    <b-icon icon="arrow-left" class="link mr-lg-3" @click="goBack"></b-icon>
                    {{contract.title}}
                </p>
            </div>
            <div class="row px-5">
                <div class="col">
                    <!-- status -->
                    <div class="admin-chip bg-secondary-light">
                        <p class="text-secondary">
                            <b-icon icon="clock-history"></b-icon>
                            {{contract.status}}
                        </p>
                    </div>
                    <!-- end status -->

                    <!-- status -->
                    <!-- <div class="admin-chip bg-secondary-light">
                    <p class="text-secondary">
                        <b-icon icon="clock-history"></b-icon>
                        {{contract.userContract.status}}
                    </p>
                </div> -->
                    <!-- end status -->

                    <!-- accepted -->
                    <div class="chip bg-white">
                        <span>Approved {{moment.utc(contract.createdAt).fromNow()}}</span>
                    </div>
                    <!-- end accepted -->

                    <!-- contract -->
                    <div class="contract-box mt-2">
                        <div v-html="contract.contract_details"></div>
                    </div>
                    <!-- end contract -->
                </div>

            </div>
        </div>
        <div v-else class="d-flex justify-content-center mt-5">
            <b-spinner variant="primary"></b-spinner>
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
            moment: moment
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
            axios.get(this.$axios.defaults.baseURL + '/user/get-single-contract/' + this.id, {
                    headers: {
                        Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                    }
                })
                .then(res => {
                    console.log('edit:', res.data)
                    this.contract = res.data
                })
                .catch(err => console.log(err))

        },
        goBack() {
            this.$router.push('/user/dashboard')
        },
    }
}
</script>

<style scoped>

</style>
