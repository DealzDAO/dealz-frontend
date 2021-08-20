<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col-9" v-if="items.length>0">
                <div v-for="(item,i) in items" :key="i" class="m-3">
                    <p class="mb-1 subtitle-text4">{{item.title}}</p>
                    <!-- status -->
                    <div class="admin-chip" :class="getBg(item)">
                       <p :class="getText(item)"> <b-icon :icon="getIcon(item)"></b-icon>
                        {{item.status}}
                        </p>
                    </div>
                    <!-- end status -->

                    <!-- comments -->
                    <div v-if="item.comments>0" class="admin-chip bg-secondary-soft">
                        <p class="text-secondary-light">
                            <b-icon icon="chat"></b-icon>
                            <span>{{item.comments}} comments</span>
                        </p>
                    </div>
                    <!-- end comments -->
                </div>
            </div>
            <p v-else class="text-muted text-center">{{noText}}</p> 
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
            noText: '',
            contracts: [],
            items: [{
                    title: 'Brain Trust New Sound Exchange Procedures For LOD',
                    status: 'Draft',
                    comments: 0,
                },
                {
                    title: 'Founder advisor standard template',
                    status: 'Verified',
                    comments: 3,
                },

                {
                    title: 'Music Contract',
                    status: 'Verification Awaiting',
                    comments: 0,
                },

            ],
        }
    },
    mounted() {
        this.token = localStorage.getItem('dealz-token')
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
                    this.contracts = res.data
                    if(res.data.length==0){
                        this.noText='No Contracts found'
                    }
                })
                .catch(err => console.log(err.response))
        },
        getBg(item) {
            if (item.status == 'Draft') {
                return 'bg-secondary-soft'
            } else if (item.status == 'Verified') {
                return 'bg-success-soft'
            } else if (item.status == 'Verification Awaiting') {
                return 'bg-warning-soft'
            }
        },
        getIcon(item) {
            if (item.status == 'Draft') {
                return 'pencil'
            } else if (item.status == 'Verified') {
                return 'check2'
            } else if (item.status == 'Verification Awaiting') {
                return 'clock-history'
            }
        },
        getText(item) {
            if (item.status == 'Draft') {
                return 'text-secondary-light'
            } else if (item.status == 'Verified') {
                return 'text-success-light'
            } else if (item.status == 'Verification Awaiting') {
                return 'text-warning-light'
            }
        }
    }
}
</script>
