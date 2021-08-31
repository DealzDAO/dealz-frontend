<template>
<div>
    <div class="container bg-white">
        <div class="row bg-light-light" style="border-bottom:1px solid rgba(17, 17, 17, 0.1);">
            <p class="subtitle-text mt-3 px-3">Dashboard</p>
        </div>
        <div class="row pl-2 py-4">
            <div class="col-8">
                <!-- token stats -->
                <p class="data-head mb-n3">Token stats</p><br>
                <div class="row">
                    <div class="data-box justify-content-center" v-for="(item,i) in tokenStats" :key="i">
                        <p>
                            <b-icon class="admin-icon icon-helper3" icon="info-circle"></b-icon>
                        </p>
                        <p class="data1">{{item.num}}</p>
                        <p class="helper-text3">{{item.text}}</p>
                    </div>
                </div>
                <!-- end token stats -->

                <!-- pricing stats -->
                <p class="data-head mb-n3 mt-4">Token stats</p><br>
                <div class="row">
                    <div class="data-box justify-content-center" v-for="(item,i) in pricingStats" :key="i">
                        <span class="data1">{{item.price}}</span><br>
                        <span class="helper-text3">{{item.text}}</span>
                    </div>
                </div>
                <!-- end pricing stats -->

                <!-- contract stats -->
                <p class="data-head mb-n3 mt-4">Token stats</p><br>
                <div class="row">
                    <div class="data-box justify-content-center" v-for="(item,i) in contractStats" :key="i">
                        <div class="row">
                            <div class="col-3">
                                <b-icon class="admin-icon icon-helper3" :icon="item.icon"></b-icon>
                            </div>
                            <div class="col-9">
                                <span class="data1">{{item.num}}</span><br>
                                <span class="helper-text3">{{item.text}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end contract stats -->
            </div>
            <!-- dealz essential -->
            <div class="col-4">
                <p class="data-head mb-n3 mt-4">Dealz Essentials</p><br>
                <div class="data-box justify-content-center mt-3 ml-n1" v-for="(item,i) in essential" :key="i">
                    <p>
                        <b-icon class="big-icon text-success-light" icon="check"></b-icon>
                    </p>
                    <p class="data1">{{item.title}}</p>
                    <p class="helper-text3">{{item.text}}</p>
                </div>
            </div>
            <!-- end essential -->
        </div>
        
        <div class="row pl-4 py-4 mt-n4">
            <div class="col-5">
                <p class="data-head">Popular contracts</p>
               <div class="table-container">
                <table>
                    <tr>
                        <th class="helper-text">Contract</th>
                        <th class="helper-text">Usage</th>
                    </tr>
                    <tr v-for="(item,i) in contracts" :key="i">
                        <td class="table-data">{{item.contract}}</td>
                        <td class="table-data">{{item.usage}}</td>
                    </tr>
                </table>
            </div>
            </div>
            <div class="col-5">
                <p class="data-head">Popular contracts</p>
                <div class="table-container">
                <table>
                    <tr>
                        <th class="helper-text">Name</th>
                        <th class="helper-text">Earnings($)</th>
                    </tr>
                    <tr v-for="(item,i) in attorneys" :key="i">
                        <td class="table-data">{{item.name}}</td>
                        <td class="table-data">{{item.earnings}}</td>
                    </tr>
                </table>
            </div>
            </div>
            

        </div>
    </div>
</div>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        return {
            contracts: [{
                    contract: 'Lorem Ipsum Contract',
                    usage: '1.9k'
                },
                {
                    contract: 'Ipsum Lorem Limited V3 Contract II Contract',
                    usage: '1.6k'
                },
                {
                    contract: 'Lorem Ipsum Contract',
                    usage: '1.4k'
                },
                {
                    contract: 'Ipsum Lorem Limited V3 Contract II Contract',
                    usage: '1.34k'
                },
            ],
            attorneys: [{
                    name: 'Jane Doe',
                    earnings: '4k'
                },
                {
                    name: 'Jannet Doe',
                    earnings: '3k'
                },
                {
                    name: 'John Doe',
                    earnings: '2.6k'
                },
            ],
            tokenStats: [{
                    num: '$230.89',
                    text: 'Price per token'
                },
                {
                    num: '54k',
                    text: 'Token purchased'
                },
                {
                    num: '39.9k',
                    text: 'Tokens used'
                },
                {
                    num: '84k',
                    text: 'Tokens Available'
                }
            ],
            pricingStats: [{
                    price: '$390k',
                    text: 'All Time Revenue'
                },
                {
                    price: '$104k',
                    text: "This month's earnings"
                },
                {
                    price: '$5k',
                    text: 'Dividend Distributed'
                },
            ],
            contractStats: [{
                    icon: 'pencil',
                    color: '',
                    num: '230',
                    text: 'Created'
                },
                {
                    icon: 'check2',
                    color: '',
                    num: '5k',
                    text: 'Executed'
                },
                {
                    icon: 'person',
                    color: '',
                    num: '12.5k',
                    text: 'Users'
                },
                {
                    icon: 'briefcase',
                    color: '',
                    num: '480',
                    text: 'Attorneys'
                }
            ],
            essential: [{
                    title: 'Wallet Verified',
                    text: 'Your wallet has been verified.'
                },
                {
                    title: 'Linked to Bank Account',
                    text: 'Your account has been linked to The Bank of America'
                },
            ]
        }
    }
}
</script>

<style lang="scss">

</style>
