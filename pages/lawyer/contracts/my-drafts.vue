<template>
<div>
    <div class="container">
        <div v-if="drafts.length>0" class="row px-3">
            <div class="col">
                <div v-for="(item,i) in drafts" :key="i" class="p-2 mt-2 clickable">
                    <p class="subtitle-text4 mb-2">{{item.title}}</p>
                    <p class="helper-text mb-0"><b>Last Edited:</b> {{ moment.utc(item.createdAt).fromNow()}}</p>
                </div>

            </div>
        </div>
        <div v-else-if="drafts.length==0 && noText==''" class="d-flex justify-content-center mt-5">
                <b-spinner variant="primary"></b-spinner>
            </div>
        <div class="row justify-content-center mt-5">
             <p class="helper-text3">{{noText}}</p>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment';
export default {
    layout: 'user',
    data() {
        return {
            moment:moment,
            drafts:[],
            noText:''
        }
    },
    mounted(){
        this.getAllDrafts()
    },
    methods:{
        getAllDrafts(){
            axios.get('https://dealzlegal.herokuapp.com/api/contracts/all-drafts',{
                 headers: {
                        Authorization: this.$auth.strategy.token.get()
                    }
            })
            .then(res=>{
                this.drafts=res.data
                if(res.data.length==0){
                    this.noText='No Drafts found'
                }
            })
            .catch(err=>console.log(err.response))
        },
        editDraft(item){
            this.$store.commit('lawyer/editDraft',item)
            this.$store.dispatch('lawyer')
        }
    }
}
</script>
