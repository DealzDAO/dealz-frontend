<template>
<div>
    <div class="sidebar-2">
        <div class="adjusted">
            <b-input-group>
                <template #prepend>
                    <b-input-group-text class="bg-white input-prepend">
                        <b-icon icon="search" style="opacity:0.2"></b-icon>
                    </b-input-group-text>
                </template>
                <b-form-input class="input-style" :state="null" placeholder="Search"></b-form-input>
            </b-input-group>
        </div>

        <p class="subtitle-text adjusted mt-3">Lawyers</p>
        <hr>
        <div class="row adjusted">
            <div class="admin-chip bg-primary-soft">
                <p class="text-primary-light">New</p>
            </div>
            <div class="admin-chip bg-warning-soft">
                <p class="text-warning-light">Pending</p>
            </div>
            <div class="admin-chip bg-success-soft">
                <p class="text-success-light">Accepted</p>
            </div>
        </div>
        <hr class="mb-0">
        <b-list-group flush class=" py-0 mx-0">
            <b-list-group-item v-for="(item,i) in lawyers" :key="i" :class="checkActive(item)" @click="selectLawyer(item)">
                <div class="row">
                    <div class="col-3">
                        <b-img src="https://picsum.photos/125/125/?image=58" alt="circle" width="58" height="58" rounded="circle"></b-img>
                    </div>
                    <div class="col-9">
                        <div class="row justify-content-between">
                            <p class="user-name">{{item.name}}</p>
                            <p class="float-right comment-text" v-if="item.comments>0">
                                <b-icon class="mb-n1" icon="dot" font-scale="2"></b-icon>
                                <span class="mt-n2 ml-n2">{{item.comments}} comments</span>
                            </p>
                        </div>
                        <div class="row mt-n2">
                            <div v-if="item.status=='New'" class="admin-chip bg-primary-soft ml-n1">
                                <p class="text-primary-light">{{item.status}}</p>
                            </div>
                            <div v-if="item.status=='Pending'" class="admin-chip bg-warning-soft ml-n1">
                                <p class="text-warning-light">{{item.status}}</p>
                            </div>
                            <div v-if="item.status=='Accepted'" class="admin-chip bg-success-soft ml-n1">
                                <p class="text-success-light">{{item.status}}</p>
                            </div>
                            <div v-if="item.status=='Rejected'" class="admin-chip bg-danger-soft ml-n1">
                                <p class="text-danger-light">{{item.status}}</p>
                            </div>
                            <p class="text-date mt-2">{{moment.utc(item.createdAt).fromNow()}} </p>
                        </div>
                    </div>
                </div>
            </b-list-group-item>
        </b-list-group>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
    data() {
        return {
            moment:moment,
            page:1,
            limit:5
        }
    },
    mounted(){
        this.getLawyer()
    },
    computed:{
        selectedLawyer(){
            return this.$store.state.admin.selectedLawyer
        },
        lawyers(){
            return this.$store.state.admin.lawyers
        }
    },
    methods: {
        getLawyer(){
            axios.get('https://dealzlegal.herokuapp.com/api/admin/all-lawyer',{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
                    }
                })
                .then(res => {
                    this.$store.commit('admin/setLawyers',res.data)
                    this.$store.commit('admin/selectLawyer',res.data[0])
                    this.$store.dispatch('admin/getLawyerDetail')
                    
                })
                .catch(err => console.log(err.response))
        },
        checkActive(item){
            if(this.selectedLawyer==item){
                return 'active-contract'
            }
        },
        selectLawyer(item){
            this.checkActive(item)
            this.$store.commit('admin/selectLawyer',item)
            this.$store.dispatch('admin/getLawyerDetail')
        }
    },
}
</script>

<style lang="scss">
.sidebar-2 {
    max-width: 400px;
    padding: 25px 0px;
    background-color: white;
    border:1px solid #DFE6EC;
}

.adjusted {
    margin: 0px 15px;
}
.active-contract{
    background-color: #f5f7f9;
    border-right:3px solid #04A5F6 !important;
}
.link:hover{
    background-color: #f5f7f9;
}
</style>
