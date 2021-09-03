<template>
<div>
    <div class="sidebar-2">
        <div class="adjusted">
            <b-input-group>
                <template #prepend>
                    <b-input-group-text class="bg-white input-prepend">
                        <b-icon icon="search" style="opacity:0.2"></b-icon>
                    </b-input-group-text>
                </template>
                <b-form-input class="input-style" :state="null" placeholder="Search"></b-form-input>
            </b-input-group>
        </div>

        <p class="subtitle-text adjusted mt-3">Lawyers</p>
        <hr>
        <div class="row adjusted">
            <div class="admin-chip bg-light-light">
                <p class="text-primary-light">New</p>
            </div>
            <div class="admin-chip bg-light-light">
                <p class="text-warning-light">Pending
                    <b-badge pill class="bg-warning-light py-1">12</b-badge>
                </p>

            </div>
            <div class="admin-chip bg-light-light">
                <p class="text-success-light">Accepted</p>
            </div>
        </div>
        <hr class="mb-0">
        <div style="overflow:auto;max-height:500px" >
            <b-list-group v-if="contracts.length>0" flush class="pt-0 mx-0">
                <b-list-group-item v-for="(item,i) in contracts" :key="i" class="link" :class="checkActive(item)" @click="selectContract(item)">
                    <div class="row" style="overflow-x:hidden">
                        <div class="col-12">
                            <p class="user-name text-left mb-1">{{item.title}}</p>
                            <div class="row pl-3">
                                <div v-if="item.status=='New'" class="admin-chip bg-primary-soft ml-n1">
                                    <p class="text-primary-light">New</p>
                                </div>
                                <div v-else-if="item.status=='Rejected'" class="admin-chip bg-danger-soft ml-n1">
                                    <p class="text-danger-light">Rejected</p>
                                </div>
                                <div v-else-if="item.status=='Accepted'" class="admin-chip bg-primary-soft ml-n1">
                                    <p class="text-success-light">Verified</p>
                                </div>
                                <div v-else class="admin-chip bg-primary-soft ml-n1">
                                    <p class="text-warning-light">Pending</p>
                                </div>

                                <p class="text-date mt-2">{{ moment.utc(item.createdAt).fromNow()}}</p>

                                <p class="comment-text" v-if="item.comments" style="position:absolute;right:5px">
                                    <b-icon class="mb-n1 mr-n2" icon="dot" font-scale="2"></b-icon>
                                    <span>{{item.comments}} comments</span>
                                </p>
                            </div>
                            <p class="text-date mt-n2 mb-0">
                                <b-icon icon="person"></b-icon>
                                {{item.lawyer_name}}
                            </p>
                        </div>
                    </div>
                </b-list-group-item>
            </b-list-group>
            <div v-else class="d-flex justify-content-center">
                <p class="helper-text3">{{noText}}</p>
            </div>

            <div class="d-flex justify-content-center mb-3">
                <p v-if="dataEnd" class="helper-text3">End of contracts</p>
                <b-spinner v-else variant="primary" v-b-visible="loadOnScroll"></b-spinner>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment';
export default {
    data() {
        return {
            moment: moment,
            page: 0,
            limit: 5,
            dataEnd: false,
            noText: ''
        }
    },
    computed: {
        selectedContract() {
            return this.$store.state.admin.selectedContract
        },
        contracts() {
            return this.$store.state.admin.contracts
        },
    },
    methods: {
        getContracts() {
            axios.get('https://dealzlegal.herokuapp.com/api/admin/all-contracts?page=' + this.page + '&limit=' + this.limit, {
                    headers: {
                        Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                    }
                })
                .then(res => {
                    console.log('fethed:', res.data)
                    if (res.data.contracts.length == 0) {
                        this.dataEnd = true
                        this.noText = 'No contracts found'
                    }
                    if (this.page == 1) {
                        this.$store.commit('admin/setContracts', res.data.contracts)
                        this.$store.commit('admin/selectContract', res.data.contracts[0])
                        this.$store.dispatch('admin/getDetail')
                    } else if (this.page > 1) {
                        for (var x = 0; x < res.data.contracts.length; x++) {
                            this.$store.commit('admin/insertIntoContract', res.data.contracts[x])
                        }

                    }

                })
                .catch(err => console.log(err.response))
        },
        checkActive(item) {
            if (this.selectedContract == item) {
                return 'active-contract'
            }
        },
        selectContract(item) {
            this.checkActive(item)
            this.$store.commit('admin/selectContract', item)
            this.$store.dispatch('admin/getDetail')
        },
        loadOnScroll() {
            this.page += 1
            this.getContracts()
        },
    }
}
</script>

<style lang="scss">
.sidebar-2 {
    max-width: 400px;
    padding: 25px 0px;
    background-color: white;
    border:1px solid #DFE6EC;
}

.adjusted {
    margin: 0px 15px;
}

.active-contract {
    background-color: #f5f7f9;
    border-right: 3px solid #04A5F6 !important;
}

.link:hover {
    background-color: #f5f7f9;
}

.data-component {
    height: 200px;
    overflow: auto;
}
</style>
