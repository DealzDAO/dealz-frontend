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
            <div v-if="fillable.contract.questions.length>0" class="row px-5 mx-2 mt-2">
                <div v-for="(item, i) in questionList" :key="i" class="w-75">
                    <p class="mb-0">{{ i + 1 }}. {{ item.question }}</p>
                    <div class="mb-3" style="max-height:40px">
                        <b-form-input v-if="item.type == 'Short Answer'" @update="insertAnswer(item,i)" v-model="form.option[i]" placeholder="Write here..." class="radius10" style="width:100%" :disabled="inputDisabled"></b-form-input>

                        <input type="date" v-model="form.option[i]" v-if="item.type == 'Date'" @change="insertAnswer(item,i)" style="width:100%;padding:8px 20px" :disabled="inputDisabled">

                        <b-form-radio-group v-model="form.option[i]" v-if="item.type == 'Multiple Choice'" @change="insertAnswer(item,i)" stacked :options="item.options" :disabled="inputDisabled"></b-form-radio-group>
                    </div>
                </div>
            </div>
            <div v-else class="d-flex justify-content-center mt-5">
                <p class="helper-text3">No questions</p>
            </div>
            <div class="row px-5 mt-3 justify-content-between">
                <p v-if="page>1" class="text-secondary-light link" @click="previous">Previous Questions</p>
                <span v-else></span>
                <div>
                    <b-button v-if="fillable.userContract.status == 'New' || fillable.userContract.status == 'Draft'" class="my-btn px-3 bg-white" style="border:1px solid #04a5f6" @click="saveDraft">
                        <p class="text-primary-light">Save Draft</p>
                    </b-button>
                    <b-button v-if="page==pageLimit" class="my-btn px-3 bg-primary-light" @click="finishContract">
                        <p>Finish Contract</p>
                    </b-button>
                    <b-button v-if="fillable.contract.questions.length>3" class="my-btn px-3 bg-primary-light" @click="next">
                        <p>Next Questions</p>
                    </b-button>
                </div>

            </div>

        </div>
        <!-- end question view -->

        <!-- contract view -->
        <div v-show="view == 'contract'">
            <div class="row">
                <div class="col">
                    <div class="contract-box mt-2">
                        <div v-html="updatedContract" id="container" contenteditable="true"></div>
                    </div>
                </div>
                <div class="col">
                    <div style="max-height:300px;overflow-y:auto">
                        <div v-for="(item, i) in fillable.contract.questions" :key="i" class="w-75">
                            <p class="mb-0">{{ i + 1 }}. {{ item.question }}</p>
                            <div class="mb-3" style="max-height:40px">
                                <b-form-input v-if="item.type == 'Short Answer'" @click="scroll(item)" @update="insertAnswer(item,i)" v-model="form.option[i]" placeholder="Write here..." class="radius10" style="width:100%" :disabled="inputDisabled"></b-form-input>

                                <input type="date" v-model="form.option[i]" @click="scroll(item)" v-if="item.type == 'Date'" @change="insertAnswer(item,i)" style="width:100%;padding:8px 20px" :disabled="inputDisabled">

                                <b-form-radio-group v-model="form.option[i]" @click="scroll(item)" v-if="item.type == 'Multiple Choice'" @change="insertAnswer(item,i)" stacked :options="item.options" :disabled="inputDisabled"></b-form-radio-group>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-between p-5" v-if="fillable.userContract.status == 'New' || fillable.userContract.status == 'Draft'">
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
            updatedContract: '',
            inputDisabled: false,
            // question view
            initIndex: 0,
            lastIndex: 3,
            pageLimit: 0,
            page: 1,
            questionList: [],
            pos:null
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
                    this.fillable = res.data
                    this.updatedContract=res.data.contract.contract_details
                    this.form.option = this.fillable.userContract.contract_details
                    if (res.data.userContract.status == 'Ready to send') {
                        this.inputDisabled = true
                    }
                    this.setList()
                    //setting page limit for question view

                    if (res.data.contract.questions.length % 3 == 0) {
                        this.pageLimit = res.data.contract.questions.length / 3
                    } else {
                        this.pageLimit = Math.ceil(res.data.contract.questions.length / 3)
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
                    Authorization: this.$auth.strategy.token.get()
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
                contract_details: this.form.option,
                new_contract: document.getElementById('container').innerHTML
            };
            const config = {
                headers: {
                    Authorization: this.$auth.strategy.token.get()
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
        insertAnswer(item, i) {
            document.getElementById(item.title).innerHTML=' '+this.form.option[i]
        },
        scroll(item) {
            //scroll using id
            document.getElementById(item.title).scrollIntoView({
                behavior: 'smooth'
            });
            // var container = this.$el.querySelector("#container");
            // container.scrollTop = container.scrollHeight;//scroll to bottom
            //scroll to an index position
            // container.scrollTo({
            //     top: this.updatedContract.indexOf("{{" + item.title + "}}"),
            //     behavior: "smooth"
            // })
        },
        setList() {
            var set = this.fillable.contract.questions
            var list = []
            for (var x = this.initIndex; x < this.fillable.contract.questions.length; x++) {
                list.push(set[x])
            }
            this.questionList = list
            console.log('list:',this.questionList)
        },
        next() {
            if (this.page <= this.pageLimit) {
                this.page += 1
                this.initIndex += 3
                this.lastIndex += 3
                //last page ma trim garxa 
                if (this.lastIndex > this.fillable.contract.questions.length) {
                    this.lastIndex = this.lastIndex-this.fillable.contract.questions.length
                }
                this.setList()
            }
        },
        previous() {
            if (this.page > 1) {
                this.initIndex -= 3
                //last page bata back garda  trim vaeko data milaudai
                if (this.page == this.pageLimit) {
                    this.lastIndex = this.fillable.contract.questions.length-(this.page *3)
                }
                else{
                    this.lastIndex -=3
                }
                this.page -= 1
                this.setList()
            }
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
