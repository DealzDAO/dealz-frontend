<template>
<div>
    <div class="container px-4">
        <div class="row" v-if="contracts.length>0">
            <div class="col">
                <div v-for="(item,i) in contracts" :key="i" class="mt-4">
                    <p class="mb-1 subtitle-text4 clickable" @click="seeSignedDetail(item)">{{item.contract_id.title}}</p>
                    <div class="admin-chip" :class="getBg(item)">
                        <p class="helper-text4" :class="getColor(item)">
                            <b-icon :icon="getIcon(item)" class="user-icon"></b-icon>
                            {{getStatus(item)}}
                        </p>
                    </div>
                    <div v-if="item.contract_id.comments>0" class="admin-chip bg-light-light">
                        <p class="text-secondary">
                            <b-icon icon="chat"></b-icon>
                            {{item.contract_id.comments}} comments
                        </p>
                    </div>
                    <div v-if="item.terms" class="admin-chip bg-success-light2">
                        <p class="text-helper4 text-success-light">
                            <b-icon icon="chat"></b-icon>
                            {{item.terms}} term changes
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="d-flex justify-content-center mt-5">
            <b-spinner variant="primary"></b-spinner>
        </div>
        <div class="d-flex justify-content-center mt-5">
            <p class="helper-text3">{{noText}}</p>
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
            contracts: [],
            noText: '',
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
    mounted() {
        this.getExecutedContracts()
    },
    methods: {
        getExecutedContracts() {
            axios.get(this.$axios.defaults.baseURL + '/user/executed-contracts', {
                    headers: {
                        Authorization: this.$auth.strategy.token.get()
                    }
                })
                .then(res => {
                    if (res.data.length > 0) {
                        this.contracts = res.data
                    }
                    else{
                        this.noText='No contracts'
                    }

                })
                .catch(err => console.log(err))
        },
        getStatus(item) {
            if (item.sign_id.length > 1) {
                return 'Signed'
            } else {
                return 'Received'
            }
        },
        getIcon(item) {
            if (item.sign_id.length > 1) {
                return 'check2'
            } else {
                return 'arrow-repeat'
            }
        },
        getColor(item) {
            if (item.sign_id.length > 1) {
                return 'text-success-light'
            } else {
                return 'text-warning-light'
            }
        },
        getBg(item) {
            if (item.sign_id.length > 1) {
                return 'bg-success-soft'
            } else {
                return 'bg-warning-soft'
            }
        },
        seeSignedDetail(item){
            this.$router.push({
                name: "user-executed-signed-id",
                params:{id:item._id}
            });
        }
    }
}
</script>
