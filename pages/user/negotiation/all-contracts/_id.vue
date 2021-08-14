<template>
<div>
    <div class="container">
        <div class="row px-4 pt-3">
            <p class="subtitle-text2 link">
                <b-icon icon="arrow-left" class="link mr-lg-3" @click="goBack"></b-icon>
                Brain Trust New Sound Exchange Procedures For LOD Terms and Agreement
            </p>
        </div>
        <div class="row px-5">
            <div class="col">
                <!-- status -->
                <div class="admin-chip bg-secondary-light">
                    <p class="text-secondary">
                        <b-icon icon="clock-history"></b-icon>
                        Ready to Send
                    </p>
                </div>
                <!-- end status -->

                <!-- comments -->
                <div class="admin-chip bg-success-soft">
                    <p class="text-success">
                        <b-icon icon="chat"></b-icon>
                        3 comments
                    </p>
                </div>
                <!-- end spots -->

                <!-- accepted -->
                <div class="chip bg-white">
                    <span>Approved 2 days ago</span>
                </div>
                <!-- end accepted -->

                <!-- contract -->
                <div class="contract-box mt-2"></div>
                <div class="mt-2">
                    <b-button class="my-btn bg-primary-light px-3">
                        <p>
                            <b-icon icon="pencil"></b-icon>
                            Edit Contrat
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

export default {
    data() {
        return {
            contract: ''
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        }
    },
    mounted() {
        this.getContractDetails()
    },
    methods: {
        getContractDetails() {
            axios.get('https://dealzlegal.herokuapp.com/api/contracts/getcontract?id=60fd3395a68eb1203dd633bb', {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                })
                .then(res => {
                    this.contract = res.data
                    console.log(res.data)
                })
                .catch(err => console.log(err))

        },
        goBack() {
            this.$router.push('/user/negotiation/all-contracts')
        }

    }
}
</script>

<style scoped>

</style>
