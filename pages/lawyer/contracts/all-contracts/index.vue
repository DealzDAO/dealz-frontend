<template>
<div>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12" v-if="contracts.length>0">
                <div v-for="(item,i) in contracts" :key="i" class="m-3 link" @click="viewContract(item)">
                    <p class="mb-1 subtitle-text4">{{item.title}}</p>
                    <!-- status -->
                    <div class="admin-chip" :class="getBg(item)">
                       <p :class="getText(item)"> <b-icon :icon="getIcon(item)"></b-icon>
                        {{getStatus(item)}}
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

                <b-pagination class="mx-3" v-model="page" pills prev-text="Prev" next-text="Next" @input="input" :total-rows="rows" hide-goto-end-buttons :per-page="limit"></b-pagination>

            </div>
            <div v-else-if="contracts.length==0 && noText==''" class="d-flex justify-content-center mt-5">
                <b-spinner variant="primary"></b-spinner>
            </div>
            
            <p v-else class="helper-text3 text-center">{{noText}}</p>
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
            limit: 5,
            rows: 0,
            page: 1,
        }
    },
    mounted() {
        this.token = localStorage.getItem('dealz-token')
        this.getLawyerContracts()
    },
    methods: {
        getLawyerContracts() {
            axios.get('https://dealzlegal.herokuapp.com/api/lawyer/all-contracts?page=' + this.page + '&limit=' + this.limit,{
                    headers: {
                        Authorization: 'Bearer ' + this.token
                    }
                })
                .then(res => {
                    this.contracts = res.data.contracts
                    this.rows=res.data.docCount
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
            } else if (item.status =='New') {
                return 'bg-primary-soft'
            } else if (item.status =='Available' || item.status=='Work in Progress') {
                return 'bg-warning-soft'
            }else if (item.status =='Rejected') {
                return 'bg-danger-soft'
            }
        },
        getStatus(item){
            if (item.status =='Available' || item.status=='Work in Progress') {
                return 'Verification Pending'
            } else {
                return item.status
            }
        },
        getIcon(item) {
            if (item.status == 'Draft') {
                return 'pencil'
            } else if (item.status == 'Verified') {
                return 'check2'
            } else if (item.status =='Available' || item.status=='Work in Progress') {
                return 'clock-history'
            }else if (item.status =='New') {
                return 'file-earmark-excel'
            }
        },
        getText(item) {
            if (item.status == 'Draft') {
                return 'text-secondary-light'
            } else if (item.status == 'Verified') {
                return 'text-success-light'
            } else if (item.status =='Available' || item.status=='Work in Progress') {
                return 'text-warning-light'
            }else if (item.status == 'New') {
                return 'text-primary-light'
            }else if (item.status == 'Rejected') {
                return 'text-danger-light'
            }
        },
        input(e) {
            this.page = e
            this.getLawyerContracts()
        },
        viewContract(item){
            this.$router.push({
                    name: 'lawyer-contracts-all-contracts-id',
                    params: {
                        id: item._id
                    }
                })
        }
    }
}
</script>
