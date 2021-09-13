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
                <div class="row" v-if="templates.length>0">
                    <div class="col-6" v-for="(item,i) in templates" :key="i">
                        <div class="data-box my-2 link" @click="viewContract(item)">
                            <p class="data2 text-left mb-0">{{item.title}}</p>
                            <div v-if="item.bundles" class="admin-chip bg-light-light">
                                <p class="helper-text">{{item.bundles}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="d-flex justify-content-center">
                    <b-spinner variant="primary"></b-spinner>
                </div>
                <!-- end contracts -->

                <!-- pricing stats -->
                <div class="row justify-content-between px-4">
                    <p class="data-head mb-n3 mt-2">Contracts in Negotiation</p><br>
                    <p class="helper-text link" @click="seeAllNegotiation">See All</p>
                </div>

                <div class="row nego-box mx-3">
                    <div class="col" v-if="nego.length>0">
                        <div v-for="(item,i) in nego" :key="i" class=" clickable">
                            <div v-if="i<2" class="mb-3">
                                <p class="mb-1 subtitle-text4 link" @click="viewContract(item.contract_id)">{{item.contract_id.title}}</p>
                                <div class="admin-chip" :class="getBg(item)">
                                    <p :class="getColor(item)">
                                        <b-icon :icon="getIcon(item)"></b-icon>
                                        {{item.status}}
                                    </p>
                                </div>
                                <div v-if="item.comment" class="admin-chip bg-secondary-light">
                                    <p class="text-helper">
                                        <b-icon icon="chat" class="user-icon"></b-icon>
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
                                    <p class="text-helper">
                                        <b-icon icon="check2" class="user-icon"></b-icon>
                                        {{item.questions}} Questions
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="nego.length==0 && noText==''" class="d-flex justify-content-center">
                        <b-spinner variant="primary"></b-spinner>
                    </div>
                    <div v-else class="d-flex justify-content-center">{{noText}}</div>
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
                <!-- wallet -->
                <div class="data-box justify-content-center mt-3 ml-n1">
                    <p>
                        <b-icon class="big-icon text-success-light" icon="wallet"></b-icon>
                    </p>
                    <p class="data1">Connect Wallet</p>
                    <p class="helper-text3">Connect Dealz with your wallet.</p>
                    <p>
                        <b-button @click="connectWallet" class="my-btn bg-primary-light mx-auto mt-2 enableEthereumButton">
                            <p>{{walletBtn}}</p>
                        </b-button>
                    </p>
                </div>
                <!-- end wallet -->

                <!-- bank account -->
                <div class="data-box justify-content-center mt-3 ml-n1">
                    <p>
                        <b-icon class="big-icon text-success-light" icon="check"></b-icon>
                    </p>
                    <p class="data1">Link to Bank Account</p>
                    <p class="helper-text3">Your account has been linked to The Bank of America.</p>

                </div>
                <!-- end bank account -->
            </div>
            <!-- end essential -->
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    middleware: 'isUser',
    layout: 'user',
    data() {
        return {
            walletBtn: 'Connect',
            noText: '',
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
            nego: []
        }
    },
    mounted() {
        this.getContracts()
        this.getNegotiation()
    },
    methods: {
        getContracts() {
            axios.get('https://dealzlegal.herokuapp.com/api/user/userdash-contract', {
                    headers: {
                        Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                    }
                })
                .then(res => {
                    this.templates = res.data
                })
                .catch(err => console.log(err.response))
        },
        connectWallet() {
            const ethereumButton = document.querySelector('.enableEthereumButton');
            const showAccount = document.querySelector('.showAccount');

            ethereumButton.addEventListener('click', () => {
                getAccount();
            });

            async function getAccount() {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts'
                });
                const account = accounts[0];
                showAccount.innerHTML = account;
                console.log(account)
            }

        },
        viewContract(item) {
            this.$router.push({
                path: '/user/dashboard/contract/' + item._id,
                params: {
                    id: item._id
                }
            })
        },
        seeAllNegotiation() {
            this.$router.push('/user/negotiation/all-contracts')
        },
        getNegotiation() {
            axios.get(this.$axios.defaults.baseURL + '/user/all-contracts?page=' + 1 + '&limit=' + 2, {
                    headers: {
                        Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                    }
                })
                .then(res => {
                    console.log(res.data)
                    this.nego = res.data.contracts
                    if (res.data.docCount == 0) {
                        this.noText = 'No contracts found'
                    }
                })
                .catch(err => console.log(err))
        },
        getBg(item) {
            switch (item.status) {
                case 'New':
                    return 'bg-primary-soft';
                    break;
                case 'Ready to send':
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
                case 'Ready to send':
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
                case 'New':
                    return 'text-primary-light';
                    break;
                case 'Ready to send':
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
