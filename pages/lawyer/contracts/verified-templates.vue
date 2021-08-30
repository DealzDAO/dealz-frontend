<template>
<div>
    <div class="container">
        <div class="row" v-if="contracts.length>0">
            <div class="col-9" >
                <div v-for="(item,i) in contracts" :key="i" class="m-3">
                    <p class="mb-1 subtitle-text4">{{item.title}}</p>
                    <!-- status -->
                    <div class="admin-chip bg-success-soft">
                       <p class="text-success-light"> <b-icon icon="check2"></b-icon>
                        Verified
                        </p>
                    </div>
                    <!-- end status -->

                    <!-- comments -->
                    <div class="admin-chip bg-secondary-soft">
                        <p class="text-secondary-light">
                            <b-icon icon="chat"></b-icon>
                            <span>{{item.comments}} comments</span>
                        </p>
                    </div>
                    <!-- end comments -->
                </div>
            </div>
        </div>
        <div v-else class="row justify-content-center mt-5">
            <p class="helper-text3">{{noText}}</p> 
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    layout: 'lawyer',
    data() {
        return {
            noText: '',
            contracts: [],
        }
    },
    mounted(){
        this.getVerifiedTemplates()
    },
    methods:{
        getVerifiedTemplates(){
            axios.get('https://dealzlegal.herokuapp.com/api/lawyer/verified-templates',{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('dealz-token')
                    }
                })
                .then(res => {
                    this.contracts = res.data
                    if(res.data.length==0){
                        this.noText='No verified templates'
                    }
                })
                .catch(err => console.log(err.response))
        }
    }
}
</script>
