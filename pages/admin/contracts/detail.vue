<template>
<div>
    <div class="container bg-light-light py-3">
        <div class="px-4">
            <div class="row">
                <p class="title-text2">{{detail.title}}</p>
                <div class="admin-chip bg-primary-chip mt-1">
                    <p class="text-primary-light">{{detail.status}}</p>
                </div>
            </div>
            <div class="row mt-n2">
                <div class="col-4">
                    <p class="mb-0">
                        <b-icon icon="person" class="helper-text"></b-icon>
                        <span class="text-date">User:</span> <span class="helper-text">{{detail.lawyer_name}}</span>
                    </p>
                    <p class="mb-0">
                        <b-icon icon="calendar" class="helper-text"></b-icon>
                        <span class="text-date">Created on:</span> <span class="helper-text">{{ moment.utc(detail.createdAt).format("MMM Do YYYY")}}</span>
                    </p>
                </div>
                <div class="col-4">
                    <p class="mb-0">
                        <b-icon icon="cash" class="helper-text"></b-icon>
                        <span class="text-date">Price Range:</span> <span class="helper-text">100-200</span>
                    </p>
                    <p class="mb-0">
                        <b-icon icon="globe" class="helper-text"></b-icon>
                        <span class="text-date">Industry:</span> <span class="helper-text">{{detail.bundles}}</span>
                    </p>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col">
                    <p class="title-helper">Contract</p>
                    <div class="contract-box hidden-scroll bg-white" style="height:200px" v-html="detail.contract_details">

                    </div>
                    <p class="float-right text-helper helper-text mt-2" style="cursor:pointer" @click="fullViewDialog=true">
                        <b-icon icon="zoom-in"></b-icon> Full screen
                    </p>
                </div>
            </div>
            <hr>

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
            

            
            <div class="row">
                <b-form-textarea size="sm" v-model="commentText" class="comment-area ml-3 mr-2" placeholder="Write comment here..."></b-form-textarea>
                <b-button class="admin-btn bg-success-light" @click="sendComment" :disabled="sendDisabled">
                    <p class="text-helper2 text-white">{{btnText}}</p>
                </b-button>
            </div>
        </div>
        <!-- end comments -->

        <!-- action buttons -->
        <div class="row px-4 bg-white mt-2 top-border" v-if="detail.status != 'Rejected'">
            <div class="action-area">
                <div class="row">
                    <b-button v-if="detail.status=='New'" class="admin-btn bg-primary-light mx-2" @click="sendForReview" :disabled="disableReview">
                        <p class="text-helper2 text-white">{{reviewBtnText}}</p>
                    </b-button>
                    <b-button v-if="detail.status=='New'" class="admin-btn bg-danger-soft" style="position:absolute;right:5px" @click="rejectContract">
                        <p class="text-danger">Reject</p>
                    </b-button>
                </div>
            </div>
        </div>
        <!-- end action buttons -->
    </div>
</div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
export default {
    data() {
        return {
            moment: moment,
            commentText: '',
            sendDisabled: true,
            btnText: 'Send Comment',
            reviewBtnText: 'Send for Review',
            disableReview: false
        }
    },
    computed: {
        detail() {
            return this.$store.state.admin.detail
        },
        comments(){
            return this.$store.state.admin.comments
        }
    },
    watch: {
        commentText() {
            if (this.commentText != '') {
                this.sendDisabled = false
            }
        }
    },
   
    methods: {
        sendComment() {
            this.btnText = 'Commenting...'
            const params = {
                comment: this.commentText,
            }
            const config = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
                }
            }
            axios.post('https://dealzlegal.herokuapp.com/api/contracts/comment/' + this.detail._id, params, config)
                .then(res => {
                    this.btnText = 'Send Comment'
                    this.commentText = ''
                    this.$store.commit('admin/updateComment', res.data)
                })
                .catch(err => console.log(err.response))
        },
        sendForReview() {
            
            this.reviewBtnText = 'Sending...'
            this.disableReview = true
            const params = {
                id: this.detail._id
            }
            const config = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
                }
            }
            axios.post('https://dealzlegal.herokuapp.com/api/admin/review-contract',params,config)
                .then(res => {
                    this.reviewBtnText='Sent for Review'
                    this.$store.commit('admin/updateContractStatus')
                })
                .catch(err => {
                    console.log(err.response)
                    this.reviewBtnText='Send for Review'
                    this.disableReview=false
                })

        },
        rejectContract(){
            const params = {
                id: this.detail._id
            }
            const config = {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
                }
            }
            axios.post('https://dealzlegal.herokuapp.com/api/admin/reject-contract',params,config)
                .then(res => {
                    this.$store.commit('admin/contractRejected')
                })
                .catch(err => {
                    console.log(err.response)
                    this.reviewBtnText='Send for Review'
                    this.disableReview=false
                })
        }

    }
}
</script>

<style lang="scss">
.comment-area {
    border-radius: 10px;
    max-width: 400px;
}

.action-area {
    width: 100%;
    height: 80;
    background-color: white;
    padding: 10px 36px;
}
</style>
