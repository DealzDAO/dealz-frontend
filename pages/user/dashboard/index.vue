<template>
<div>
    <div class="container-fluid">
        <div class="row header px-4 pt-3 line-border mild-back">
            <p class="subtitle-text">Dashboard</p>
        </div>
        <div class="row pl-2 py-4">
            <div class="col-8">
                <!-- contracts -->
                <p class="data-head mb-n3">New Contracts Template</p><br>
                <div class="row">
                    <div class="col-6" v-for="(item,i) in templates" :key="i">
                        <div class="data-box my-2">
                            <p class="data2 text-left mb-0">{{item.title}}</p>
                            <div v-if="item.bundles" class="admin-chip bg-light-light">
                                <p class="helper-text">{{item.bundles}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end contracts -->

                <!-- pricing stats -->
                <div class="row justify-content-between px-4">
                    <p class="data-head mb-n3 mt-2">Contracts in Negotiation</p><br>
                    <p class="helper-text">See All</p>
                </div>

                <div class="row nego-box mx-3">
                    <div class="col">
                        <div>
                            <p class='data2 ml-n3'>Founder Advisor Standard Template</p>
                            <div class="row mt-n2">
                                <div class="chip bg-light-light">
                                    <b-icon icon="arrow-left" class="text-primary"></b-icon>
                                    <span class="text-primary">Received</span>
                                </div>
                                <div class="chip bg-light-light">
                                    <b-icon icon="chat" class="my-icon text-helper"></b-icon>
                                    <span class="text-helper">3 Comments</span>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3">
                            <p class="data2 ml-n3">Founder Advisor Standard Template</p>
                            <div class="row mt-n2">
                                <div class="chip bg-light-light">
                                    <b-icon icon="arrow-left" class="text-primary"></b-icon>
                                    <span class="text-primary">Received</span>
                                </div>
                                <div class="chip bg-light-light">
                                    <b-icon icon="chat" class="my-icon text-helper"></b-icon>
                                    <span class="text-helper">3 Comments</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end pricing stats -->

                <!-- financial stats -->
                <p class="data-head mb-n3 mt-4">Your Financial stats</p><br>
                <div class="row justify-content-around">
                    <div class="data-box justify-content-center px-5" v-for="(item,i) in financial" :key="i">
                        <p>
                            <b-icon class="admin-icon icon-helper3" icon="info-circle"></b-icon>
                        </p>
                        <p class="data1">{{item.price}}</p>
                        <p class="helper-text3">{{item.text}}</p>
                    </div>
                </div>
                <!-- end financial stats-->
            </div>
            <!-- dealz essential -->
            <div class="col-4">
                <p class="data-head mb-n3 mt-4">Dealz Essentials</p><br>
                <div class="data-box justify-content-center mt-3 ml-n1" v-for="(item,i) in essential" :key="i">
                    <p>
                        <b-icon class="big-icon text-success-light" :icon="item.icon"></b-icon>
                    </p>
                    <p class="data1">{{item.title}}</p>
                    <p class="helper-text3">{{item.text}}</p>
                    <p>
                        <b-button v-if="item.button" class="my-btn mx-auto mt-2">
                            <p>Connect</p>
                        </b-button>
                    </p>

                </div>
            </div>
            <!-- end essential -->
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
            financial: [{
                    price: '$230.89',
                    text: 'Dealz Balance'
                },
                {
                    price: '$230.89',
                    text: 'Tokens earned'
                },
                {
                    price: '$230.89',
                    text: 'Total transactions'
                },
            ],
            essential: [{
                    icon: 'wallet',
                    title: 'Connect Wallet',
                    text: 'Connect Dealz with your wallet.',
                    button: true
                },
                {
                    icon: 'check',
                    title: 'Link to Bank Account',
                    text: 'Your account has been linked to The Bank of America',
                    button: false
                },

            ],
            templates: [],
        }
    },
    mounted(){
        this.getContracts()
        console.log(localStorage.getItem('dealz-token'))
    },
    methods: {
        getContracts(){
             axios.get('https://dealzlegal.herokuapp.com/api/user/userdash-contract', {
                 headers: {
                        Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                    }
             })
                    .then(res => {
                       this.templates=res.data
                       console.log(res.data)
                    })
                    .catch(err => console.log(err.response))
        }
    }
}
</script>

<style lang="scss">
.nego-box {
    border: 1px solid #DFE6EC;
    padding: 16px 24px;
    border-radius: 12px;
}
</style>
