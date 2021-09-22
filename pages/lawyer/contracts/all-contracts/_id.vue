<template>
<div>
    <div class="container px-4 my-2">
        <div class="row">
            <div class="col">
                <p class="mb-1 subtitle-text4">
                    <b-icon icon="arrow-left" class="link" @click="seeAll"></b-icon>
                    {{contract.title}}
                </p>
                <!-- status -->
                <div class="admin-chip bg-warning-soft">
                    <p class="text-warning-light">{{contract.status}}</p>
                </div>
                <!-- end status -->

                <!-- accepted -->
                <div class="chip bg-white">
                    <span>Accepted {{moment.utc(contract.createdAt).fromNow()}}</span>
                </div>
                <!-- end accepted -->
            </div>

        </div>
        <div class="row">
            <div class="col-7">

                <div class="contract-box mt-3 hidden-scroll" v-html="contract.contract_details"></div>


            </div>
            <div class="col-5">
                <!-- comments -->
                <div class="row mt-3 pl-3">
                    <p class="title-helper">Comments</p>
                </div>
                <div class="mt-3 pl-3" v-if="comments.length>0">
                    <div v-for="(item,i) in comments" :key="i">
                        <div class="row mb-2">
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
                <div v-else class="helper-text3 mt-n3 mb-2">No comments yet</div>

                <div class="row justify-content-around">
                    <div class="col-10 pl-0">
                        <b-form-input size="sm" v-model="commentText" class="comment-area ml-3 mr-2 radius10" placeholder="Write comment here..."></b-form-input>
                    </div>
                    <div class="col-2">
                        <b-button class="my-btn bg-primary-light float-right" @click="sendComment" :disabled="sendDisabled">
                            <b-icon icon="arrow-right"></b-icon>
                        </b-button>
                    </div>
                </div>
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
            contract: '',
            comments: [],
            commentText: '',
            sendDisabled: true,
            disabled: false,
            btnText:'Approve Contract',
            approving:false,
            approvedDialog:false
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        dealzUser(){
            return this.$store.state.dealz.dealzUser
        }
    },
    watch: {
        commentText() {
            if (this.commentText != '') {
                this.sendDisabled = false
            }
        }
    },
    mounted() {
        this.getContractDetails()
    },
    methods: {
        getContractDetails() {
            axios.get('https://dealzlegal.herokuapp.com/api/lawyer/single-contract/' + this.id, {
                    headers: {
                        Authorization: this.$auth.strategy.token.get()
                    }
                })
                .then(res => {
                    console.log('res:',res.data)
                    this.contract = res.data[0]
                    this.getComments()
                })
                .catch(err => console.log(err.response))
        },
        getComments() {
            axios.get('https://dealzlegal.herokuapp.com/api/contracts/get-comment/' + this.contract._id, {
                    headers: {
                        Authorization: this.$auth.strategy.token.get()
                    }
                })
                .then(res => {
                    this.comments = res.data
                })
                .catch(err => console.log(err.response))
        },
        sendComment() {
            this.btnText = 'Commenting...'
            this.sendDisabled = true
            const params = {
                comment: this.commentText,
            }
            const config = {
                headers: {
                    Authorization: this.$auth.strategy.token.get()
                }
            }
            axios.post('https://dealzlegal.herokuapp.com/api/contracts/comment/' + this.contract._id, params, config)
                .then(res => {
                    this.commentText = ''
                    this.sendDisabled = true
                    this.comments.push(res.data)
                })
                .catch(err => console.log(err.response))
        },
        seeAll(){
            this.$router.push('/lawyer/contracts/all-contracts')
        }
    }
}
</script>
