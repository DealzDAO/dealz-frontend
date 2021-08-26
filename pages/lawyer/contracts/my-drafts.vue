<template>
<div>
    <div class="container">
        <div class="row px-3">
            <div class="col">
                <div v-for="(item,i) in drafts" :key="i" class="mt-4">
                    <p class="subtitle-text4 mb-2">{{item.title}}</p>
                    <p class="helper-text"><b>Last Edited:</b> {{ moment.utc(item.createdAt).fromNow()}}</p>
                </div>

            </div>
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
            items: [{
                    title: 'Brain Trust New Sound Exchange Procedures for LOD',
                    date: '2',
                },
                {
                    title: 'Founder advisor standard template',
                    date: '1',
                },

            ]
        }
    },
    mounted(){
        this.getAllDrafts()
    },
    methods:{
        getAllDrafts(){
            axios.get('https://dealzlegal.herokuapp.com/api/contracts/getalldrafts')
            .then(res=>this.drafts=res.data)
            .catch(err=>console.log(err.response))
        }
    }
}
</script>
