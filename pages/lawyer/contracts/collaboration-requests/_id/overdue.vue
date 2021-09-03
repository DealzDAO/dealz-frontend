<template>
<div>
    <div class="container px-4 my-2">
        <div class="row">
            <div class="col">
                <p class="mb-1 subtitle-text4">
                    {{contract.title}}
                </p>
                <!-- status -->
                <div class="admin-chip bg-danger-soft">
                    <p class="text-danger-light">{{contract.status}}</p>
                </div>
                <!-- end status -->

                <!-- comments -->
                <div v-if="contract.comments>0" class="admin-chip bg-secondary-soft">
                    <p class="text-secondary-light">
                        <b-icon icon="chat"></b-icon>
                        {{contract.comments}} comments
                    </p>
                </div>
                <!-- end spots -->

                <!-- accepted -->
                <div class="chip bg-white">
                    <span>Accepted {{moment.utc(contract.createdAt).fromNow()}}</span>
                </div>
                <!-- end accepted -->

                <div class="contract-box mt-3 hidden-scroll" v-html="contract.contract_details"></div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
    data() {
        return {
            moment: moment,
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
            axios.get('https://dealzlegal.herokuapp.com/api/lawyer/single-collab-requests/' + this.id, {
                    headers: {
                        Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                    }
                })
                .then(res => {
                    this.contract = res.data
                })
                .catch(err => console.log(err.response))
        },
    }
}
</script>
