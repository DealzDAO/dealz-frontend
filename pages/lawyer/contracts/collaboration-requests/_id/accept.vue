<template>
<div>
    <div class="container px-4 my-2">
        <div class="row">
            <div class="col">
                <p class="mb-1 subtitle-text4">
                    {{contract.title}}
                </p>
                <!-- status -->
                <div class="admin-chip bg-secondary-soft">
                    <p class="text-secondary-light">{{contract.status}}</p>
                </div>
                <!-- end status -->

                <!-- comments -->
                <div class="admin-chip bg-primary-soft">
                    <p class="text-primary-light" v-if="contract!=''">
                    {{6-contract.accepted.length}} spots left
                    </p>
                </div>
                <!-- end spots -->

                <!-- accepted -->
                <div class="chip bg-white">
                    <span>Accepted {{moment.utc(contract.createdAt).fromNow()}}</span>
                </div>
                <!-- end accepted -->

                <div class="contract-box mt-3 hidden-scroll" v-html="contract.contract_details"></div>

                <b-button class="my-btn bg-primary-light mt-3" @click="acceptContract()" :disabled="disabled">
                    <p>{{btnText}}</p>
                </b-button>
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
            moment:moment,
            contract:'',
            disabled:false,
            btnText:''
        }
    },
    computed:{
        id(){
            return this.$route.params.id
        },
        dealzUser(){
            return this.$store.state.dealz.dealzUser
        }
    },
    mounted(){
        this.getContractDetails()
    },
    methods: {
        getContractDetails(){
            axios.get('https://dealzlegal.herokuapp.com/api/lawyer/single-collab-requests/'+this.id,{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
                    }
                })
                .then(res => {
                    this.contract=res.data
                    this.getBtn()
                    console.log('detail:',res.data)
                })
                .catch(err => console.log(err.response))
        },
        acceptContract(){
            const params={
                id:this.contract._id
            }
            const config={
                   headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
                    }
            }
             axios.post('https://dealzlegal.herokuapp.com/api/lawyer/accept-contract-collab',params,config)
                .then(res => {
                    this.contract=res.data
                    this.getBtn()
                })
                .catch(err => console.log(err.response))
        },
        getBtn(){
            if(this.contract.accepted.includes(this.dealzUser.id)){
                this.disabled=true
                this.btnText='Collaborator Request Accepted'
            }
            else{
                this.btnText='Accept Contract Collaborator Seat'
            }
            
        }
    }
}
</script>
