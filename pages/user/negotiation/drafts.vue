<template>
<div>
    <div class="container">
        <div class="row px-3">
            <div class="col">
                <div v-for="(item,i) in items" :key="i" class="mt-4">
                    <p class="subtitle-text4 mb-2">{{item.title}}</p>
                    <p class="helper-text"><b>Last Edited:</b> {{item.date}} days ago</p>
                </div>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    layout: 'user',
    data() {
        return {
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
        this.getDrafts()
    },
    methods:{
        getDrafts(){
            const config={
                headers: {
                        Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                    }
            }
            axios.get(this.$axios.defaults.baseURL +'/user/all-drafts/',config)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => console.log(err))
        }
    }
}
</script>
