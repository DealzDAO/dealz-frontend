<template>
<div>
    <div class="container-fluid bg-light">
        <div class="row">
            <div class="col mt-5 ml-3">
                <div class="row">
                    <div class="col-2">
                        <b-img src="https://picsum.photos/125/125/?image=58" alt="circle" width="100" height="100" rounded="circle"></b-img>
                    </div>
                    <div class="col-8">
                        <p class="user-name2 mt-2">{{lawyerDetail.name}}</p>

                        <p class="helper-text mt-n3">
                            <b-icon icon="envelope"></b-icon>
                            <span class="">{{lawyerDetail.email}}</span>
                        </p>
                        <p class="helper-text mt-n3">
                            <b-icon icon="calendar-check"></b-icon>
                            <span class="">Registered on {{moment.utc(lawyerDetail.createdAt).calendar()}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col mx-3">
                <p class="title-helper">Files attached</p>
            </div>
        </div>
        <div class="row justify-content-around">
            <div>
                <b-img src="https://picsum.photos/125/125/?image=58" alt="circle" class="contract-file" width="300" height="210" style="border-radius:8px;"></b-img>
                <p class="user-name">Lawyer ID</p>
                <p class="helper-text mt-n3">
                    <b-icon icon="paperclip"></b-icon>
                    <span>myid.pdf</span>
                </p>
            </div>

            <div>
                <b-img src="https://picsum.photos/125/125/?image=58" alt="circle" class="contract-file" width="300" height="210" style="border-radius:8px;"></b-img>
                <p class="user-name">Personal ID</p>
                <p class="helper-text mt-n3">
                    <b-icon icon="paperclip"></b-icon>
                    <span>mypersonalID.pdf</span>
                </p>
            </div>
        </div>
        <div class="row mt-3 px-5">
            <p class="title-helper">Comments</p>
        </div>
        <div class="row mt-3 px-5">
            <div class="row">
                <div class="col-3">
                    <b-img src="https://picsum.photos/125/125/?image=58" alt="circle" width="46" height="46" rounded="circle"></b-img>
                </div>
                <div class="col-9">
                    <div class="row px-2">
                        <p class="user-name3 mr-xl-2">Admin</p>
                        <p class="helper-text mt-1">
                            <span>2 hours ago</span>
                        </p>
                    </div>
                    <div class="row">
                        <p class="helper-text mt-n3 ml-2">
                            <span class="menu-text">Hey, can you send this to me?</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
        <div class="row mt-3 px-5">
            <div class="row">
                <div class="col-3">
                    <b-img src="https://picsum.photos/125/125/?image=58" alt="circle" width="46" height="46" rounded="circle"></b-img>
                </div>
                <div class="col-9">
                    <div class="row">
                        <p class="user-name3 mr-2 ml-3">Jane Doe</p>
                        <p class="helper-text mt-1">
                            <span>2 hours ago</span>
                        </p>
                    </div>
                    <div class="row">
                        <p class="helper-text mt-n3 ml-3">
                            <span class="menu-text">Please have the files.</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <b-form-textarea size="sm" class="comment-area ml-5 mr-2" placeholder="Write comment here..."></b-form-textarea>
            <b-button class="admin-btn bg-success-light">
                <p class="text-helper2">Send Comment</p>
            </b-button>
        </div>
        <div v-if="lawyerDetail.status=='New'" class="row bg-white mt-2 top-border">
            <div class="action-area">
                <div class="row justify-content-between">
                    <b-button class="my-btn bg-primary-light" @click="acceptLawyer()">
                        <p>Accept</p>
                    </b-button>
                    <b-button class="my-btn bg-danger-soft" @click="rejectLawyer()">
                        <p class="text-danger-light">Reject</p>
                    </b-button>
                </div>

            </div>
        </div>
   
    </div>
</div>
</template>

<script>
import moment from 'moment';
import axios from 'axios'
export default {
    data() {
        return {
            moment:moment
        }
    },
    computed:{
        lawyerDetail(){
            return this.$store.state.admin.lawyerDetail
        }
    },
    methods:{
        acceptLawyer(){
            const params = {
                id: this.lawyerDetail._id
            }
            const config = {
                headers: {
                    Authorization: this.$auth.strategy.token.get()
                }
            }
            axios.post('https://dealzlegal.herokuapp.com/api/admin/accept-lawyer',params,config)
                .then(res => {
                    this.$store.commit('admin/setLawyerDetail',res.data)
                })
                .catch(err => {
                    console.log(err.response)
                    this.reviewBtnText='Send for Review'
                    this.disableReview=false
                })

        },
        rejectLawyer(){
            const params = {
                id: this.lawyerDetail._id
            }
            const config = {
                headers: {
                    Authorization: this.$auth.strategy.token.get()
                }
            }
            axios.post('https://dealzlegal.herokuapp.com/api/admin/reject-lawyer',params,config)
                .then(res => {
                    this.$store.commit('admin/setLawyerDetail',res.data)
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
