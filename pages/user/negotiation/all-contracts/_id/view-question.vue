<template>
<div>
    <div class="container" v-if="contract != ''">
        <div class="row px-4 pt-3">
            <p class="subtitle-text2 mb-0">
                <b-icon icon="arrow-left" class="link mr-lg-3" @click="goBack"></b-icon>
                {{contract.contract.title}}
            </p>
        </div>
        <div class="row px-5">
            <div class="admin-chip bg-completed">
                <p class="text-completed-light">
                    <b-icon icon="clock-history"></b-icon>
                    {{ contract.userContract.status }}
                </p>
            </div>
            <!-- end status -->

            <!-- status -->
            <div class="admin-chip bg-success-soft">
                <p class="text-success-light">
                    <b-icon icon="chat"></b-icon>
                    {{ contract.contract.questions.length}} Questions
                </p>
            </div>
            <!-- end status -->

            <!-- accepted -->
            <div class="chip bg-white">
                <span>Approved
                    {{ moment.utc(contract.contract.createdAt).fromNow() }}</span>
            </div>
            <!-- end accepted -->
        </div>
        <div class="row px-5">
            <div class="col-6">
                <p class="subtitle-text3 mt-2">Your Contract</p>
                <div class="contract-box mt-2">
                    <div v-html="contract.userContract.new_contract">

                    </div>
                    <div class="zoom-btn clickable" @click="contractDialog=true">
                        <b-icon icon="zoom-in"></b-icon>
                    </div>

                </div>

                <div class="d-flex justify-content-center bg-primary-light c-btn"> View All Questions</div>
                <p class="helper-text3 text-secondary-light mt-2">
                    <b-icon icon="pencil" class="mr-1"></b-icon>Edit Contract
                </p>
            </div>
            <div class="col-6">
                <p class="subtitle-text3">Comments and questions</p>
                <div v-if="comments.length>0" class="row px-5 mx-2 mt-2">
                    <div v-for="(item, i) in comments" :key="i" class="w-75">
                        {{item}}
                        <!-- <p class="mb-0">{{ i + 1 }}. {{ item.question }}</p>
                        <div class="mb-3" style="max-height:40px">
                            <b-form-input v-if="item.type == 'Short Answer'" @update="insertAnswer(item,i)" v-model="form.option[i]" placeholder="Write here..." class="radius10" style="width:100%" :disabled="inputDisabled"></b-form-input>

                            <input type="date" v-model="form.option[i]" v-if="item.type == 'Date'" @change="insertAnswer(item,i)" style="width:100%;padding:8px 20px" :disabled="inputDisabled">

                            <b-form-radio-group v-model="form.option[i]" v-if="item.type == 'Multiple Choice'" @change="insertAnswer(item,i)" stacked :options="item.options" :disabled="inputDisabled"></b-form-radio-group>
                        </div> -->
                    </div>
                </div>
                <div v-else class="d-flex justify-content-center mt-5">
                    <p class="helper-text3">No comments</p>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="d-flex justify-content-center mt-5">
        <b-spinner variant="primary"></b-spinner>
    </div>

    <!-- view full dialog -->
    <!-- <b-modal size="xl" centered v-model="contractDialog" hide-footer>
        <div v-html="contract.userContract.new_contract">

    </b-modal> -->
    <!-- end view full dialog -->
</div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
    data() {
        return {
            contract: "",
            comments: [],
            moment: moment,
            form: {
                option: []
            },
            contractDialog:false
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
                    console.log('sent:', res.data)
                    this.contract = res.data
                    this.comments = res.data.userContract.comments
                })
                .catch(err => console.log(err));
        },
        goBack() {
            this.$router.push({
                path: "/user/negotiation/all-contracts/"
            });
        },
    }
};
</script>

<style lang="scss">
.zoom-btn {
    position: absolute;
    bottom: 75px;
    right: 40px;
    border:1px solid #DFE6EC;
    background-color: white;
    padding: 3px 6px;
    border-radius: 50%;
}

.contract-box {
    height: 300px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
}

.c-btn {
    color: white;
    font-size: 12px;
    padding: 3px 0px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}
</style>
