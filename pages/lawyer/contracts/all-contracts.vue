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
        <div class="row justify-content-center">
            <div class="col-9">
                <ul v-if="contracts.length>0">
                    <li v-for="(item,i) in contracts" :key="i" class="mt-2">
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

                        <!-- comments -->
                        <div v-if="item.comments>0" class="chip bg-warning-light">
                            <b-icon icon="chat" class="my-icon"></b-icon>
                            <span class="text-helper2">{{item.comments}} comments</span>
                        </div>
                        <!-- end spots -->

                    </li>
                </ul>
                <p v-else class="text-muted text-center">No contracts found</p>
            </div>
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
            token: '',
            contracts: [],
            items: [{
                    title: 'Brain Trust New Sound Exchange Procedures For LOD',
                    status: 'Completed',
                    comments: 0,
                },
                {
                    title: 'founder advisor standard template',
                    status: 'Pending review',
                    comments: 3,
                },

                {
                    title: 'Music Contract',
                    status: 'Overdue',
                    comments: 8,
                },

            ],
            objects: [{
                    title: 'Pending review'
                },
                {
                    title: 'Completed'
                },
                {
                    title: 'Rejected'
                },
            ]
        }
    },
    mounted() {
        this.token = localStorage.getItem('dealz-token')
        console.log(this.token)
        this.getLawyerContracts()
    },
    methods: {
        getLawyerContracts() {
            axios.get('https://dealzlegal.herokuapp.com/api/user/lawyer/contracts', {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                })
                .then(res => {
                    console.log(res.data)
                    this.contracts = res.data
                })
                .catch(err => console.log(err.response))
        },
        getBg(item) {
            if (item.status == 'Pending review') {
                return 'bg-secondary-light'
            } else if (item.status == 'Completed') {
                return 'bg-success-light'
            } else if (item.status == 'Overdue') {
                return 'bg-danger-light'
            }
        },
        getIcon(item) {
            if (item.status == 'Pending review') {
                return 'clock-history'
            } else if (item.status == 'Completed') {
                return 'check2'
            } else if (item.status == 'Overdue') {
                return 'bg-danger-light'
            }
        }
    }
}
</script>
