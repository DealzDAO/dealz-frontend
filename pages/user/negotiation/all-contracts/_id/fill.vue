<template>
<div>
    <div class="container" v-if="fillable != ''">
        <div class="row px-4 pt-3">
            <p class="subtitle-text2">
                <b-icon icon="arrow-left" class="link mr-lg-3" @click="goBack"></b-icon>
                {{ fillable.contract.title }}
            </p>
        </div>
        <div class="row px-5">
            <div class="col">
                <!-- status -->
                <div class="admin-chip link" :class="getBg('question')" @click="setQuestionView">
                    <p>
                        Question view
                    </p>
                </div>
                <!-- end status -->

                <!-- comments -->
                <div class="admin-chip link" :class="getBg('contract')" @click="setContractView">
                    <p>
                        Contract view
                    </p>
                </div>
                <!-- end spots -->

                <!-- accepted -->
                <div class="chip bg-white">
                    <span>Accepted
                        {{ moment.utc(fillable.contract.createdAt).fromNow() }}</span>
                </div>
                <!-- end accepted -->
            </div>
        </div>
        <!-- question view -->
        <div v-show="view == 'question'">
            <div class="row px-5 mx-2 mt-2">
                <div v-for="(item, i) in fillable.contract.questions" :key="i" class="w-75">
                    <p class="mb-0">{{ i + 1 }}. {{ item.type }}</p>
                    <div class="mb-3" style="max-height:40px">
                        <b-form-input v-if="item.type == 'Short Answer'" @update="insertAnswer(item,i)" v-model="form.option[i]" placeholder="Write here..." class="radius10" style="width:100%" :disabled="inputDisabled"></b-form-input>
                            
                        <input type="date" v-model="form.option[i]" v-if="item.type == 'Date'" @change="insertAnswer(item,i)" style="width:100%;padding:8px 20px" :disabled="inputDisabled">
                            
                        <b-form-radio-group v-model="form.option[i]" v-if="item.type == 'Multiple Choice'"  @change="insertAnswer(item,i)" stacked :options="item.options" :disabled="inputDisabled"></b-form-radio-group>
                    </div>
                </div>
            </div>
            <div class="row px-5 mt-3 justify-content-end">
                <b-button v-if="fillable.userContract.status == 'New'" class="my-btn px-3 bg-primary-light" @click="saveDraft">
                    <p>Save Draft</p>
                </b-button>
            </div>

        </div>
        <!-- end question view -->

        <!-- contract view -->
        <div v-show="view == 'contract'">
            <div class="row">
                <div class="col">
                    <div class="contract-box mt-2" id="container">
                        <div v-html="updatedContract"></div>
                    </div>
                </div>
                <div class="col">
                    <div v-for="(item, i) in fillable.contract.questions" :key="i" class="w-75">
                        <p class="mb-0">{{ i + 1 }}. {{ item.type }}</p>
                        <div class="mb-3" style="max-height:40px">
                            <b-form-input v-if="item.type == 'Short Answer'" @click="scroll(item)" @update="insertAnswer(item,i)" v-model="form.option[i]" placeholder="Write here..." class="radius10" style="width:100%" :disabled="inputDisabled"></b-form-input>
                            
                            <input type="date" v-model="form.option[i]" @click="scroll(item)" v-if="item.type == 'Date'" @change="insertAnswer(item,i)" style="width:100%;padding:8px 20px" :disabled="inputDisabled">
                            
                            <b-form-radio-group v-model="form.option[i]" @click="scroll(item)" v-if="item.type == 'Multiple Choice'"  @change="insertAnswer(item,i)" stacked :options="item.options" :disabled="inputDisabled"></b-form-radio-group>
                        </div>
                    </div>

                    <div class="row justify-content-between p-5" v-if="fillable.userContract.status == 'New'">
                        <b-button class="my-btn px-3 bg-primary-light" @click="finishContract">
                            <p>{{ finishText }}</p>
                        </b-button>
                        <b-button class="my-btn px-3 bg-primary-light" @click="saveDraft">
                            <p>Save Draft</p>
                        </b-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end contract view -->
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
            contract: "",
            moment: moment,
            view: "question",
            form: {
                option: []
            },
            finishText: "Finish Contract",
            fillable: "",
            updatedContract:'',
            inputDisabled:false,
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
                    console.log('fill:',res.data)
                    this.fillable = res.data;
                    this.updatedContract=res.data.contract.contract_details
                    if(this.fillable.userContract.contract_details.length == this.fillable.contract.questions.length){
                        this.form.option=this.fillable.userContract.contract_details
                        this.inputDisabled=true
                        this.feedAnswers()
                    }
                })
                .catch(err => console.log(err));
        },
        saveDraft() {
            const params = {
                id: this.fillable.userContract._id,
                contract_details: this.form.option
            };
            const config = {
                headers: {
                    Authorization: "Bearer " + this.$auth.$state.user.data.token
                }
            };
            axios
                .post(
                    this.$axios.defaults.baseURL + "/user/save-as-draft/",
                    params,
                    config
                )
                .then(res => {
                    this.$router.push("/user/negotiation/all-contracts");
                })
                .catch(err => console.log(err));
        },
        finishContract() {
            const params = {
                id: this.fillable.userContract._id,
                contract_details: this.form.option
            };
            const config = {
                headers: {
                    Authorization: "Bearer " + this.$auth.$state.user.data.token
                }
            };
            if (this.fillable.contract.questions.length == this.form.option.length) {
                this.finishText = "Finishing";
                axios
                    .post(
                        this.$axios.defaults.baseURL + "/user/edit-contract/",
                        params,
                        config
                    )
                    .then(res => {
                        this.finishText = "Finished";
                        this.successToast("Contract finished. You can send it now.");
                        this.$router.push("/user/negotiation/all-contracts");
                    })
                    .catch(err => console.log(err));
            } else {
                this.failureToast(
                    "Fill up every answer or save it as draft to edit later."
                );
            }
        },
        goBack() {
            this.$router.push({
                path: "/user/negotiation/all-contracts/" +
                    this.fillable.userContract._id +
                    "/edit",
                params: {
                    id: this.fillable.userContract._id
                }
            });
        },
        setQuestionView() {
            this.view = "question";
            this.getBg();
        },
        setContractView() {
            this.view = "contract";
            this.getBg();
        },
        getBg(item) {
            if (this.view == item) {
                return "active";
            } else {
                return "not-active";
            }
        },
        insertAnswer(item,i) {
            //resetting contract to replace input content without changing position
            this.updatedContract=this.fillable.contract.contract_details
            var value=this.form.option[i]
            var a=this.updatedContract
            var output = [a.slice(0, item.pos), this.form.option[i], a.slice(item.pos)].join('');
            this.updatedContract=output
            
            //slicing and adding
            // var output = [a.slice(0, item.pos+this.form.option[i].length), this.form.option[i].substr(this.form.option[i].length-1), a.slice(item.pos+this.form.option[i].length)].join('');
            //inserting variable inside a string
            // this.fillable.contract.contract_details=`${this.form.option[0]}`
           
        },
        feedAnswers(){
            var a=this.updatedContract
            var questions=this.fillable.contract.questions
            var answers=this.fillable.userContract.contract_details
            var output=''
            for(var x=0;x<questions.length;x++){
                output = [a.slice(0, questions[x].pos), answers[x], a.slice(questions[x].pos)].join('');
            }
            this.updatedContract=output
            console.log(questions,answers)
        },
        scroll(item){
            var container = this.$el.querySelector("#container");
            // container.scrollTop = container.scrollHeight;
            container.scrollTo({
                top:item.pos,
                behavior:"smooth"
            })
        }
    }
};
</script>

<style scoped>
.active {
    background: #04a5f6;
    color: white;
}

.not-active {
    background: #dfe6ec;
    color: rgba(17, 17, 17, 0.64);
}
</style>
