<template>
<div>
    <div class="container">
        <div class="row px-4 pt-3">
            <p class="subtitle-text2">
                <b-icon icon="arrow-left" class="link mr-lg-3" @click="goBack"></b-icon>
                {{fillable.contract.title}}
            </p>
        </div>
        <div class="row px-5">
            <div class="col">
                <!-- status -->
                <div class="admin-chip bg-primary-light link" @click="setQuestionView">
                    <p class="text-white">
                        Question view
                    </p>
                </div>
                <!-- end status -->

                <!-- comments -->
                <div class="admin-chip bg-success-soft link" @click="setContractView">
                    <p class="text-success">
                        Contract view
                    </p>
                </div>
                <!-- end spots -->

                <!-- accepted -->
                <div class="chip bg-white">
                    <span>Accepted {{moment.utc(fillable.contract.createdAt).fromNow()}}</span>
                </div>
                <!-- end accepted -->
            </div>
        </div>
        <div v-if="view=='question'">
            <div class="row px-5 mx-2 mt-2">
                <div v-for="(item,i) in fillable.contract.questions" :key="i" class="w-75">
                    <p>{{i+1}}.{{item.question}}</p>
                    <b-form-input v-model="form.option[i]" placeholder="Write here..." class="radius10" style="width:100%"></b-form-input>
                </div>
            </div>
            <div class="row px-5 mt-3 justify-content-end">
                <b-button class="my-btn px-3 bg-primary-light" @click="saveDraft">
                    <p>Save Draft</p>
                </b-button>
            </div>
        </div>
        <div v-if="view=='contract'">
            <div class="row">
                <div class="col">
                    <div class="contract-box mt-2">
                        <div v-html="fillable.contract.contract_details"></div>
                    </div>
                </div>
                <div class="col">
                    <div v-for="(item,i) in fillable.contract.questions" :key="i" class="w-75">
                        <p>{{i+1}}.{{item.question}}</p>
                        <b-form-input v-model="form.option[i]" placeholder="Write here..." class="radius10" style="width:100%"></b-form-input>
                    </div>
                    <div class="row justify-content-between p-5">
                        <b-button class="my-btn px-3 bg-primary-light">
                            <p>Finish Contract</p>
                        </b-button>
                        <b-button class="my-btn px-3 bg-primary-light">
                            <p>Save Draft</p>
                        </b-button>
                    </div>

                </div>
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
            moment: moment,
            view: 'question',
            form: {
                option: []
            },
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        fillable() {
            return this.$store.state.user.fillable
        }
    },
    
    methods: {
        saveDraft(){
            const params={
                id:this.fillable.userContract._id,
                contract_details:this.form.option
            }
            const config={
                headers: {
                        Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                    }
            }
            axios.post(this.$axios.defaults.baseURL +'/user/save-as-draft/',params,config)
                .then(res => {
                    this.$router.push('/user/negotiation/all-contracts')
                })
                .catch(err => console.log(err))
        },
        goBack() {
            this.$router.push({
                path: '/user/negotiation/all-contracts/'+this.fillable.userContract._id+'/edit',
                params: {
                    id: this.fillable.userContract._id
                }
            })
        },
        setQuestionView() {
            this.view = 'question'
        },
        setContractView() {
            this.view = 'contract'
        }

    }
}
</script>

<style scoped>

</style>
