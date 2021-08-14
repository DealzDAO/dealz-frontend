<template>
<div class="bg-white w-100">
    <div class="container-fluid">
        <div class="row justify-content-center py-2">
            <div class="col">
                <div class="chip mx-2 outlined-primary bg-white" v-for="(item,i) in objects" :key="i">
                    <p>{{item.title}}</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div>
                <ul>
                    <li v-for="(item,i) in items" :key="i" class="mt-2">
                        <a href="/view-contract" class=" list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <p class="mb-1 subtitle-text">{{item.title}}</p>
                            </div>
                        </a>
                         <!-- status -->
                        <div class="chip" :class="getBg(item)">
                            <b-icon v-if="item.status !='Overdue'" :icon="getIcon(item)" class="my-icon"></b-icon>
                            <span v-if="item.status=='Overdue'" class="text-danger">{{item.status}}</span>
                            <span v-else>{{item.status}}</span>
                        </div>
                        <!-- end status -->
                    
                        <!-- spots -->
                        <div v-if="item.spotsLeft>0" class="chip bg-primary-light">
                            <b-icon icon="arrow-clockwise" class="my-icon"></b-icon>
                            <span class="text-white">{{item.spotsLeft}} spots left</span>
                        </div>
                        <!-- end spots -->

                        <!-- accepted -->
                        <div v-if="item.accepted>0" class="chip bg-white">
                            <b-icon icon="people" class="icon-helper"></b-icon>
                            <span>Accepted by {{item.accepted}} lawyers</span>
                        </div>
                        <!-- end accepted -->

                        <!-- fined -->
                        <div v-if="item.fined" class="chip bg-danger-light">
                            <span class="text-danger">Fined</span>
                        </div>
                        <!-- end fined -->
                        
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    layout:'lawyer',
    data() {
        return {
            items: [{
                    title: 'founder advisor standard template',
                    status: 'Available',
                    spotsLeft: 6,
                    accepted: 4,
                    fined: false
                },
                 {
                    title: 'Brain Trust New Sound Exchange Procedures For LOD',
                    status: 'Completed',
                    comment: 0,
                    accepted: 0,
                    fined: false
                },
                {
                    title: 'Brain Trust Net Profits Producer Form',
                    status: 'Completed',
                    comment: 0,
                    accepted: 0,
                    fined: false
                },
                {
                    title: 'Music Contract',
                    status: 'Overdue',
                    comment: 0,
                    accepted: 0,
                    fined: true
                },

            ],
            objects: [{
                    title: 'Available'
                },
                {
                    title: 'Completed'
                },
                {
                    title: 'Overdue'
                },
            ]
        }
    },
    methods:{
        getBg(item){
            if(item.status=='Available'){
                return 'bg-secondary-light'
            }
            else if(item.status=='Completed'){
                return 'bg-success-light'
            }
            else if(item.status=='Overdue'){
                return 'bg-danger-light'
            }
        },
        getIcon(item){
            if(item.status=='Available'){
                return 'clock-history'
            }
            else if(item.status=='Completed'){
                return 'check2'
            }
            else if(item.status=='Overdue'){
                return 'bg-danger-light'
            }
        }
    }
}
</script>
