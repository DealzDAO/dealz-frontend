<template>
<div >
    <div class="container px-4">
        <div class="row">
            <div class="col">
                <div v-for="(item,i) in items" :key="i" class="mt-4">
                    <p class="mb-1 subtitle-text4">{{item.title}}</p>
                    <div class="admin-chip" :class="getBg(item)">
                        <p class="helper-text4" :class="getColor(item)">
                            <b-icon :icon="getIcon(item)" class="user-icon"></b-icon>
                            {{item.status}}
                        </p>
                    </div>
                    <div v-if="item.comments>0" class="admin-chip bg-light-light">
                        <p class="text-secondary">
                            <b-icon icon="chat" ></b-icon>
                            {{item.comments}} comments
                        </p>
                    </div>
                    <div v-if="item.terms>0" class="admin-chip bg-success-light2">
                        <p class="text-helper4 text-success-light">
                            <b-icon icon="chat"></b-icon>
                            {{item.terms}} term changes
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    layout: 'user',
    data() {
        return {
            items: [{
                    title: 'Brain Trust New Sound Exchange Procedures for LOD',
                    status: 'Received',
                    comments: 3,
                    terms: 0,
                },
                {
                    title: 'Founder advisor standard template',
                    status: 'Signed',
                    comments: 0,
                    terms: 5,
                },

            ]
        }
    },
    methods:{
        getIcon(item){
            if(item.status=='Received'){
                return 'arrow-repeat'
            }
            else if(item.status=='Signed'){
                return 'check2'
            }
        },
        getColor(item){
            if(item.status=='Received'){
                return 'text-warning'
            }
            else if(item.status=='Signed'){
                return 'text-success-light'
            }
        },
        getBg(item){
            if(item.status=='Received'){
                return 'bg-warning-light2'
            }
            else if(item.status=='Signed'){
                return 'bg-success-light2'
            }
        }
    }
}
</script>
