<template>
<div>
    <div class="container" style="padding:10px 30px">
        <div class="row">
            <div class="admin-chip bg-light-light" v-for="(item,i) in status" :key="i">
                <p class="text-primary-light">{{item.title}}
                     <b-badge v-if="item.new>0" pill class="bg-primary-light px-2 py-1">{{item.new}}</b-badge>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div v-if="items.length>0">
                    <div v-for="(item,i) in items" :key="i" class="mt-4">
                        <p class="mb-1 subtitle-text4" :class="clickable(item)" @click="approve(item)">{{item.title}}</p>
                        <div class="admin-chip" :class="getBg(item)">
                            <p :class="getColor(item)">
                                <b-icon :icon="getIcon(item)"></b-icon>
                                {{item.status}}
                            </p>
                        </div>
                        <div v-if="item.comment" class="admin-chip bg-secondary-light">
                            <p class="helper-text5">
                                <b-icon icon="chat"></b-icon>
                                {{item.comment}} Comments
                            </p>
                        </div>
                        <div v-if="item.approved" class="admin-chip bg-primary-soft">
                             <p class="text-helper">
                                <b-icon icon="check2" class="user-icon"></b-icon>
                                Approved 
                            </p>
                        </div>
                        <div v-if="item.questions>0" class="admin-chip bg-primary-soft">
                             <p>
                                <b-icon icon="check2" class="user-icon"></b-icon>
                                {{item.questions}} Questions 
                            </p>
                        </div>

                    </div>
                </div>
                <p v-else class="text-muted text-center mt-5">No contracts found</p>

                <div v-if="contracts.length>0" class="row helper-text px-2 mt-4">
                    <b-pagination v-model="page" pills prev-text="Prev" next-text="Next" size="sm" next-class="next-button" @input="input" :total-rows="rows" hide-goto-end-buttons :per-page="limit"></b-pagination>
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    layout: 'user',
    data() {
        return {
            contracts: [],
            limit: 5,
            rows: 0,
            page: 1,
            hasBg: true,
            status:[
                {title:'Sent for approval',new:0},
                {title:'Received for approval',new:0},
                {title:'Pending signature',new:1},
                {title:'Cancel requests',new:0}
            ],
            items: [{
                    title: 'Brain Trust New Sound Exchange Procedures for LOD',
                    status: 'Selected',
                    comment: '',
                    approved: true,
                    sent: true
                },
                {
                    title: 'Founder advisor standard template',
                    status: 'Draft',
                    comment: '3',
                    approved: false,
                    sent: true
                },
                {
                    title: 'Music contract',
                    status: 'Sent',
                    comment: '8',
                    approved: false,
                    sent: true
                },
                {
                    title: 'Founder advisor standard template',
                    status: 'Received',
                    comment: '3',
                    approved: false,
                    sent: true
                },
                {
                    title: 'Founder advisor standard template',
                    status: 'Pending Signature',
                    comment: '3',
                    approved: false,
                    sent: true
                },
                {
                    title: 'Founder advisor standard template',
                    status: 'Cancel Requests',
                    comment: '3',
                    approved: false,
                    sent: true
                },

            ],
            token: ''
        }
    },
    mounted() {
        this.token = localStorage.getItem('dealz-token')
        this.getContracts()
    },
    methods: {
        getBg(item) {
            switch (item.status) {
                case 'Selected':
                    return 'bg-success-soft';
                    break;
                case 'Draft':
                    return 'bg-light';
                    break;
                case 'Sent':
                    return 'bg-completed';
                    break;
                case 'Received':
                    return 'bg-primary-soft';
                    break;
                case 'Pending Signature':
                    return 'bg-secondary-soft';
                    break;
                case 'Cancel Requests':
                    return 'bg-danger-soft';
                    break;
                case 'Verification Awaiting':
                    return 'bg-warning-soft';
                    break;
            }
        },
        getIcon(item) {
            switch (item.status) {
                case 'Selected':
                    return 'arrow-up-right'
                case 'Draft':
                    return 'pencil';
                    break;
                case 'Sent':
                    return 'arrow-right';
                    break;
                case 'Received':
                    return 'arrow-left';
                    break;
                case 'Pending Signature':
                    return 'pencil';
                    break;
                case 'Cancel Requests':
                    return 'file-earmark-excel';
                    break;
                case 'Verification Awaiting':
                    return 'clock-history';
                    break;
            }
        },
        getColor(item) {
            switch (item.status) {
                case 'Selected':
                case 'Draft':
                    return 'text-secondary-light';
                    break;
                case 'Sent':
                    return 'text-completed-light';
                    break;
                case 'Received':
                    return 'text-primary-light';
                    break;
                case 'Pending Signature':
                    return 'bg-secondary-soft';
                    break;
                case 'Cancel Requests':
                    return 'text-danger-light';
                    break;
                case 'Verification Awaiting':
                    return 'text-warning-light';
                    break;
            }
        },
        getContracts() {
            var cont = []
            axios.get('https://dealzlegal.herokuapp.com/api/user/contracts?page=' + this.page + '&limit=' + this.limit, {
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                })
                .then(res => {
                    this.contracts = res.data.contracts
                    this.rows = total_contracts
                })
                .catch(err => console.log(err.response))

        },
        input(e) {
            this.page = 1
            this.getContracts()
        },
        clickable(item){
            if(item.status=='Received'){
                return 'link'
            }
        },
        approve(item){
            if(item.status=='Received'){
                this.$router.push('/user/negotiation/action-required/received')
            }
        }
        
    }
}
</script>
<style scoped>

</style>
