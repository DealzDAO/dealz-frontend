<template>
<div>
    <div class="container" v-if="contract != ''">
        <div class="row px-4 pt-3">
            <p class="subtitle-text2 link">
                <b-icon icon="arrow-left" class="link mr-lg-3" @click="goBack"></b-icon>
                {{ contract.contract.title }}
            </p>
        </div>
        <div class="row px-5">
            <div class="contract-box mt-2">
                <div v-html="contract.contract.contract_details"></div>
            </div>
            <div class="mt-2">
                <b-button class="my-btn bg-primary-light px-3">
                    <p>
                        Sign Contract
                    </p>
                </b-button>
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
export default {
    data() {
        return {
            contract: "",
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
                        Authorization: "Bearer " + this.$auth.$state.user.data.token
                    }
                })
                .then(res => {
                    this.contract = res.data;
                })
                .catch(err => console.log(err));
        },
        goBack() {
            this.$router.push("/user/negotiation/all-contracts");
        },
    }
};
</script>
