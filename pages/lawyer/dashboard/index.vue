<template>
<div>
    <div class="container">
        <div class="row px-4 pt-3 line-border  mild-back">
            <p class="subtitle-text">Dashboard</p>
        </div>
        <div class="row py-4">
            <div class="col-8">
                <div class="row justify-content-between px-3">
                    <p class="data-head mb-n3 ">Dealz Essentials</p><br>
                    <div>
                        <b-button class="dash-btn" @click="earnDialog">Earn Dealz</b-button>
                        <b-button class="dash-btn" @click="buyDialog">Buy Dealz</b-button>
                    </div>
                </div>

                <div class="row">
                    <!-- financial stats -->
                    <div class="col-6">
                        <div class="data-box data-box-spacing justify-content-center">
                            <div class="row">
                                <div class="col-3">
                                    <div class="icon-back bg-earned">
                                        <p><b-icon icon="cash" class="admin-icon text-warning"></b-icon></p>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <span class="data1">983</span><br>
                                    <span class="helper-text3">Dealz tokens earned</span>
                                </div>
                            </div>
                            <div class="row ml-2 mt-2">
                                <p class="helper-text4 text-success mb-0">
                                    <b-icon icon="graph-up"></b-icon>
                                    <span>+4 this week</span>
                                </p>
                            </div>
                        </div>
                        <div class="data-box data-box-spacing justify-content-center">
                            <div class="row">
                                <div class="col-3">
                                    <div class="icon-back bg-value">
                                        <p><b-icon class="admin-icon text-success" icon="globe"></b-icon></p>
                                    </div>
                                </div>
                                <div class="col-9">
                                    <span class="data1">$45k</span><br>
                                    <span class="helper-text3">Dealz tokens earned</span>
                                </div>
                            </div>
                            <div class="row ml-2 mt-2">
                                <p class="helper-text4 text-danger mb-0">
                                    <b-icon icon="graph-down"></b-icon>
                                    <span>-3 this week</span>
                                </p>

                            </div>
                        </div>
                    </div>
                    <!-- end financial stats -->
                    <div class="col-6"></div>
                </div>

                <!-- performance stats -->
                <p class="data-head mb-n3 mt-2">Your performance stats</p><br>

                <div class="row pl-2">
                    <div class="data-box data-box-spacing justify-content-center" v-for="(item,i) in performances" :key="i">
                        <div class="row">
                            <div class="col-3">
                                <div class="icon-back" :class="getBg(item)">
                                    <p><b-icon class="admin-icon" :icon="item.icon" :class="getColor(item)"></b-icon></p>
                                </div>
                            </div>
                            <div class="col-9">
                                <span class="data1">{{item.num}}</span><br>
                                <span class="helper-text3">{{item.text}}</span>
                            </div>
                        </div>
                        <div class="row ml-2 mt-2">
                            <p class="helper-text4 text-success mb-0" v-if="item.increase">
                                <b-icon icon="graph-up"></b-icon>
                                <span>+{{item.count}} this week</span>
                            </p>
                            <p class="helper-text4 text-danger mb-0" v-else>
                                <b-icon icon="graph-down"></b-icon>
                                <span>-{{item.count}} this week</span>
                            </p>

                        </div>
                    </div>
                </div>
                <!-- end performance stats -->

                <!-- bounties earned -->
                <p class="data-head mb-n3 mt-4">Bounties Earned</p><br>
                <div class="table-container">
                    <table>
                        <tr>
                            <th class="helper-text">Contract</th>
                            <th class="helper-text">Bounty earned</th>
                        </tr>
                        <tr v-for="(item,i) in bounties" :key="i">
                            <td class="table-data">{{item.contract}}</td>
                            <td class="table-data">{{item.usage}}</td>
                        </tr>
                    </table>
                </div>
                <!-- end bounties-->
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
    </div>
     <earnDealz></earnDealz>
     <buyDealz></buyDealz>
</div>
</template>

<script>
import EarnDealz from '../../../components/dialog/earndealz';
import BuyDealz from '../../../components/dialog/buydealz';
export default {
    layout: 'user',
    components:{EarnDealz,BuyDealz},
    data() {
        return {
            performances: [{
                    icon: 'journal',
                    num: 7,
                    text: 'Contracts pending',
                    increase: true,
                    count: 4
                },
                {
                    icon: 'check2',
                    num: 128,
                    text: 'Contracts executed',
                    increase: false,
                    count: 3
                },
                {
                    icon: 'arrow-clockwise',
                    num: 3,
                    text: 'Approval waiting',
                    increase: true,
                    count: 4
                },
            ],
            bounties: [{
                    contract: 'Lorem ipsum contract',
                    bounty: '$320'
                },
                {
                    contract: 'Ipsum lorem limited V3 contract II',
                    bounty: '$45'
                },
                {
                    contract: 'Lorem ipsum contract',
                    bounty: '$320'
                },
                {
                    contract: 'Ipsum lorem limited V3 contract II',
                    bounty: '$45'
                },
                {
                    contract: 'Lorem ipsum contract',
                    bounty: '$320'
                },

            ],
            essential: [{
                    title: 'Wallet Verified',
                    text: 'Your wallet has been verified.',
                },
                {
                    title: 'Link to Bank Account',
                    text: 'Your account has been linked to The Bank of America',
                },

            ],
        }
    },
    methods: {
        getBg(item) {
            if (item.text == 'Contracts pending') {
                return 'bg-pending'
            } else if (item.text == 'Contracts executed') {
                return 'bg-executed'
            } else if (item.text == 'Approval waiting') {
                return 'bg-waiting'
            }
        },
        getColor(item) {
            if (item.text == 'Contracts pending') {
                return 'text-pending'
            } else if (item.text == 'Contracts executed') {
                return 'text-success'
            } else if (item.text == 'Approval waiting') {
                return 'text-waiting'
            }
        },
        earnDialog(){
            this.$store.commit('lawyer/setEarnDealzDialog')
        },
        buyDialog(){
            this.$store.commit('lawyer/setBuyDealzDialog')
        }
    }
}
</script>

<style lang="scss">
.data-box-spacing {
    margin: 5px;
    padding: 10px 10px;
}
.dash-btn{
    background: none;
    border:1px solid #DFE6EC;;
    border-radius:10px;
    color:rgba(17, 17, 17, 0.64);
    font-weight: 500;
    font-size: 12px;
    border-radius: 8px;
}
</style>
