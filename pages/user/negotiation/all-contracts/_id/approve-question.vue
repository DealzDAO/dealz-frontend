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
            <div class="col-6">
                <div class="contract-box mt-2">
                    <div v-html="contract.userContract.new_contract" contenteditable="true" @click="addingComment">
                    </div>
                </div>
                <div class="d-flex bg-primary-light c-btn">
                    <div class="container">
                        <div class="row p-0">
                            <div class="col-6" style="border-right:1px solid white">
                                <p class="text-center mb-0">Add a question</p>
                            </div>
                            <div class="col-6">
                                <p class="text-center mb-0">Add a comment</p>
                            </div>
                        </div>
                    </div>
                </div>

                <b-button class="my-btn bg-primary-light mt-2" @click="approve" :disabled="approveDisabled">
                    <p>{{approveText}}</p>
                </b-button>
                <b-button class="my-btn bg-primary-light mt-2">
                    <p>Counter</p>
                </b-button>
            </div>

            <div class="col-6">
                <p class="subtitle-text3">Comments and questions</p>
                <!-- comments -->
                <div v-if="comments.length>0">
                    <div v-for="(item,i) in comments" :key="i">
                        <div class="row mb-4">
                            <div class="col-1">
                                <b-img src="https://picsum.photos/125/125/?image=58" alt="circle" width="46" height="46" rounded="circle"></b-img>
                            </div>

                            <div class="col-9">
                                <p class="user-name3 mr-2 ml-3">{{item.name}}<span class="helper-text ml-1">{{moment.utc(item.created_At).fromNow()}}</span></p>
                                <p class="helper-text mt-n3 ml-3">{{item.comment}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="d-flex justify-content-center">
                    <p class="helper-text3">No comments</p>
                </div>
                <!-- end comments -->

                <!-- while commenting -->
                <div v-if="commenting">
                    <div class="row mx-2 mt-2">
                        <div class="col-10">
                            <div class="q-title">
                                <span class="helper-text3 bg-highlight">Comment-{{comments.length+1}}</span>
                            </div>
                            <b-input-group class="p-0">
                                <b-form-input v-model="comment" class="input-style input-adjust" style="border-top-left-radius:0px" :state="null" placeholder="Type your comment"></b-form-input>
                            </b-input-group>
                            <span class="helper-text3 text-danger" v-show="warn">{{warnText}}</span>

                        </div>
                        <div class="col-2">
                            <b-button class="ok-btn bg-white ml-2 float-right" @click="addComment">
                                <b-icon icon="check2" class="text-primary"></b-icon>
                            </b-button>
                        </div>
                    </div>
                </div>
                <!-- end commenting -->
            </div>
        </div>
    </div>
    <div v-else class="d-flex justify-content-center mt-5">
        <b-spinner variant="primary"></b-spinner>
    </div>

    <!-- approve dialog -->
    <b-modal v-model="approveDialog" centered hide-footer>
        <div class="justify-content-center mt-3 ml-n1">
            <p class="text-center mb-0">
                <b-icon class="big-icon text-success-light" icon="check"></b-icon>
            </p>
            <p class="data1 text-center mb-0">Contract Approved</p>
            <p class="helper-text3 text-center">When they send the contract for signature, you will see this in your dashboard.</p>
            
            <p class="text-center px-5">
                <b-button class="my-btn bg-primary-light" @click="dashboard">
                <p>Finish</p>
            </b-button>
            </p>
        </div>
    </b-modal>
    <!-- end approve dialog -->
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
            contractDialog: false,
            commentCount: 0,
            warn: false,
            warnText: '',
            commenting: false,
            comment: '',
            disabled: true,
            replying: false,
            approveText: 'Approve',
            approveDisabled: false,
            approveDialog: false
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
                    this.contract = res.data

                })
                .catch(err => console.log(err));
            axios
                .get(
                    "https://dealzlegal.herokuapp.com/api/user/get-comment/" +
                    this.id, {
                        headers: {
                            Authorization: this.$auth.strategy.token.get()
                        }
                    }
                )
                .then(response => {
                    this.comments = response.data
                })
                .catch(error => console.log(error.response));

        },
        goBack() {
            this.$router.push({
                path: "/user/negotiation/all-contracts/"
            });
        },
        addingComment() {
            this.commenting = true
        },
        addComment() {
            if (this.comment != '') {
                const params = {
                    comment: this.comment,
                }
                const config = {
                    headers: {
                        Authorization: this.$auth.strategy.token.get()
                    }
                }
                axios.post('https://dealzlegal.herokuapp.com/api/contracts/comment/' + this.contract.userContract._id, params, config)
                    .then(res => {
                        this.comment = ''
                        this.commenting = false
                        this.comments.unshift(res.data)
                    })
                    .catch(err => console.log(err.response))
            } else {
                this.warn = true
                this.warnText = 'Nothing to comment'
            }
        },
        approve() {
            this.approveText = 'Approving'
            const params = {
                id: this.id,
            }
            const config = {
                headers: {
                    Authorization: this.$auth.strategy.token.get()
                }
            }
            axios.post(this.$axios.defaults.baseURL + '/user/approve-contract/', params, config)
                .then(res => {
                    this.approveText = 'Approved'
                    this.approveDisabled = true
                    this.approveDialog = true
                })
                .catch(err => console.log(err))
        },
        dashboard(){
            this.$router.push('/user/negotiation/all-contracts')
        }

    }
}
</script>

<style lang="scss">
.zoom-btn {
    position: absolute;
    bottom: 75px;
    right: 40px;
    border: 1px solid #DFE6EC;
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

.adjust-btn {
    margin: 0px 0px 1px 1px;
    border: none;
    border-radius: 0px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.input-group-text {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border: 1px solid #dfe6ec;
}

.q-title {
    border: 1px solid #dfe6ec;
    padding: 5px 10px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    display: inline-block;
}

.input-adjust {
    border-top-left-radius: 0px;
    border-right: 1px solid #dfe6ec;
}

.ok-btn {
    padding: 5px 10px;
    border: 1px solid #04a5f6;
    border-radius: 10px;
    display: inline-block;
    height: 40px;
    margin-top: 35px;
}
</style>
