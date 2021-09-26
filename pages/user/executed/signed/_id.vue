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
            <div class="admin-chip bg-success-soft mt-n3">
                <p class="text-success-light">
                    <b-icon icon="pencil"></b-icon>
                    3 terms updates
                </p>
            </div>
        </div>

        <div class="row px-5">
            <div class="col">
                <div class="contract-box mt-2">
                    <div v-html="contract.userContract.new_contract"></div>
                </div>
            </div>
            <div class="col">
                <p class="title-text3">Activity</p>
                <div class="row mb-1" v-for="(item,i) in activity" :key="i">
                    <div class="col-1">
                        <b-icon :icon="item.icon" class="mt-2"></b-icon>
                    </div>
                    <div class="col-11">
                        <span class="data2">{{item.desc}}</span><br>
                        <span class="helper-text3">{{moment.utc(item.created_At).format('MMMM Do YYYY, h:mm:ss a')}}</span>
                    </div>
                </div>
                <div class="row px-5 py-2">
                    <b-button class="my-btn bg-primary-light">
                        <p>Update Terms</p>
                    </b-button>
                    <b-button class="my-btn bg-primary-light mx-2">
                        <p>Transfer Ownership</p>
                    </b-button>
                    <b-button class="my-btn bg-primary-light">
                        <p>Mutually Cancel</p>
                    </b-button>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="d-flex justify-content-center mt-5">
        <b-spinner variant="primary"></b-spinner>
    </div>
</div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
    data() {
        return {
            moment:moment,
            contract: "",
            activity: [{
                    icon: 'arrow-up-right-circle',
                    desc: 'Jane sent the contract.'
                },
                {
                    icon: 'eye',
                    desc: 'July viewed the contract.'
                },
                {
                    icon: 'chat',
                    desc: "Jane: Can you please update the contract's fifth terms."
                },
                {
                    icon: 'check2',
                    desc: 'July approved the contract.'
                },
                {
                    icon: 'pencil',
                    desc: 'Jane signed the contract.'
                },
                {
                    icon: 'pencil',
                    desc: 'Jane signed the contract.'
                }
            ]
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
                    console.log(res.data)
                    this.contract = res.data
                })
                .catch(err => console.log(err));
        },
        goBack() {
            this.$router.push({
                path: "/user/executed/signed",
            });
        },
    }
};
</script>
