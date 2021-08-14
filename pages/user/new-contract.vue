<template>
<div>
    <div class="container">
        <div class="row py-3 px-4 line-border mild-back">
            <p class="subtitle-text mb-0">
                <a href="/user/dashboard">
                    <b-icon icon="arrow-left" class="mr-2 icon-helper"></b-icon>
                </a>
                <span>New Contract</span>
            </p>
        </div>
        <div>
            <p class="subtitle-text4">Search contract templates</p>
            <b-input-group class="p-0">
                <template #prepend>
                    <b-input-group-text class="bg-white input-prepend p-0">
                        <b-form-select v-model="bundle" :options="bundles" class="adjust-btn"></b-form-select>
                    </b-input-group-text>
                </template>
                <b-form-input v-model="search" class="input-style" style="border-left:none;" :state="null" placeholder="Contract Templates"></b-form-input>
            </b-input-group>

        </div>

        <!-- search section -->
        <div class="row px-3 mt-3">
            <div class="col-6">
                <p class="subtitle-text4">Search contract templates</p>
                <b-input-group>
                    <template #prepend>
                        <b-input-group-text class="bg-white input-prepend">
                            <b-icon icon="search" style="opacity:0.2"></b-icon>
                        </b-input-group-text>
                    </template>
                    <b-form-input v-model="search" class="input-style" style="border-left:none;" :state="null" placeholder="Contract Templates"></b-form-input>
                </b-input-group>

                <div v-if="searched==true">
                    <p class="helper-text2 mt-3">Search Results</p>
                    <ul v-if="results.length>0">
                        <li v-for="(item,i) in results" :key="i" class="mt-2" @click="seeContractDetail(item)">
                            <a href="#" class=" list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <p class="mb-1 subtitle-text">{{item.title}}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <small v-else class="text-muted ml-5">No contracts found. Try something else.</small>
                </div>
            </div>
            <div class="col-6">
                <p class="subtitle-text4">Or select a contract bundle</p>
                <b-form-select v-model="bundle" :options="bundles" class="input-style"></b-form-select>
            </div>

        </div>
        <div class="row center-push justify-content-center" v-if="results.length>0">
            <b-pagination v-model="page" prev-text="Prev" next-text="Next" size="sm" @input="input" :total-rows="rows" hide-goto-end-buttons :per-page="limit"></b-pagination>
        </div>
        <!-- end search section -->

        <!-- contract templates -->
        <div class="row px-3 mt-5">
            <p class="subtitle-text4 px-3 mb-1">New contract templates</p><br>
            <div class="row">
                <div class="col-4" v-for="(item,i) in templates" :key="i">
                    <div class="data-box my-2">
                        <p class="menu-text text-left mb-0">{{item.title}}</p>
                        <div class="admin-chip bg-light-light">
                            <p class="helper-text">{{item.type}}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- and contract templates -->

        <!-- contract bundles -->
        <div class="row px-3 mt-4">
            <p class="subtitle-text4 px-3 mb-1">New contract Bundles</p><br>
            <div class="row">
                <div class="col-4" v-for="(item,i) in templates" :key="i">
                    <div class="data-box my-2">
                        <p class="menu-text text-left mb-0">{{item.title}}</p>
                        <div class="admin-chip bg-light-light">
                            <p class="helper-text">{{item.type}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end contract bundles -->

        <!-- recommended -->
        <div class="row px-3 mt-4">
            <div class="col">
                <p class="helper-text2 mt-3">Recommended for you</p>
                <p class="subtitle-text3 link" v-for="(item,i) in templates" :key="i">{{item.title}}</p>
            </div>

        </div>
        <!-- end recommended -->

    </div>

    <!-- contract view dialog -->
    <b-modal size="xl" centered v-model="viewContractDialog" hide-footer>
        <div v-if="readyContract" class="container-fluid" style="margin-top:5%">
            <div class="row justify-content-center">
                <div class="col-8">
                    <div class="row justify-content-center">
                        <b-icon icon="flower1"></b-icon><br>
                    </div>

                    <p class="title-text3 text-center mb-0">Congratulations!</p>
                    <p class="subtitle-text3 text-center">Your contract is ready to use.</p>
                    <b-card class="bg-light-light">
                        <p class="text-center"><small><b>Your transaction hash</b></small></p>
                        <p class="text-helper text-center">jiw4384834y485 vheiuhfwr387y4852y3urj30qu2q38rq39r3u84wer</p>
                        <div class="row justify-content-center">

                            <b-button class="btn-outlined">
                                <p>View on Explorer</p>
                            </b-button>
                        </div>

                    </b-card>
                    <div class="row justify-content-center">
                        <a href="/user/dashboard">
                            <b-button class="my-btn px-5 mt-2" @click="continuePayment">
                                <p>Go to Dashboard</p>
                            </b-button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="bg-white viewBox">
                <div class="col">
                    <p class="title-text2">{{selectedContract.title}}</p>
                    <p class="helper-text3">Pulvinar in lacus, enim mattis elementum erat massa diam turpis. Ut dolor, nunc sed lacinia pretium. Euismod in lobortis enim nulla nec. Arcu lectus dolor faucibus ac mus aenean. Rutrum massa faucibus ut lobortis sit mattis posuere aliquet interdum. Diam enim lectus in nunc pellentesque tincidunt diam sem tincidunt.</p>
                    <p class="helper-text3">You do not have sufficient Dealz. To use this contract, you will need to purchase Dealz.</p>
                    <p class="helper-text3"><b>Available Dealz:</b> 198 Dz</p>
                    <b-button class="btn-outlined">
                        <p>Buy Dealz</p>
                    </b-button>
                    <br>
                    <div class="admin-chip bg-warning-soft mt-5">
                        <p class="text-warning-light">
                            <b-icon icon="tag"></b-icon>
                            Price:{{selectedContract.price}} Dealz Tokens
                        </p>
                    </div>
                    <br>
                    <b-button class="my-btn px-5 mt-3">
                        <p>Select Contract</p>
                    </b-button><br>
                    <div class="contract-box hidden-scroll mt-5">
                        <div v-html="selectedContract.contract_details"></div>
                    </div>
                    <div class="row justify-content-end">
                        <p class="float-right text-helper helper-text" style="cursor:pointer" @click="fullViewDialog=true">
                            <b-icon icon="zoom-in"></b-icon> Full screen
                        </p>
                    </div>

                    <p class="subtitle-text4">Who needs this contract?</p>
                    <p class="helper-text3">Pulvinar in lacus, enim mattis elementum erat massa diam turpis. Ut dolor, nunc sed lacinia pretium. Euismod in lobortis enim nulla nec. Arcu lectus dolor faucibus ac mus aenean.</p>
                    <p class="subtitle-text4">How to start Lorem Ipsum?</p>
                    <p class="helper-text3" v-for="(item,i) in start" :key="i"><span class="num-list mr-2">{{i+1}}</span>{{item.title}}</p>
                    <p class="subtitle-text4">Use cases of this contract</p>
                    <ul>
                        <li v-for="(item,i) in usecase" :key="i">
                            <p class="helper-text3 mb-0">{{item.case}}</p>
                        </li>
                    </ul>
                    <p class="subtitle-text4">FAQs</p>

                    <b-list-group>
                        <b-list-group-item v-for="(item,i) in faq" :key="i" v-b-toggle="'item'+i">
                            <div class="row justify-content-between px-2">
                                <span>{{item.title}}</span>
                                <b-icon icon="chevron-down"></b-icon>
                            </div>

                            <b-collapse :id="'item'+i" class="mt-2">
                                <hr>
                                <ul>
                                    <li class="helper-text3">{{item.text}}</li>
                                </ul>

                            </b-collapse>
                        </b-list-group-item>
                    </b-list-group>

                    <p class="subtitle-text4 mt-4">What our customers say</p>
                    <div class="row">
                        <div class="col-4" v-for="(item,i) in customers" :key="i">
                            <b-form-rating class="ml-n4" :value="item.rating" inline no-border></b-form-rating>
                            <p class="data2">{{item.name}}</p>
                            <p class="helper-text3">{{item.text}}</p>
                        </div>
                    </div>
                    <div class="admin-chip bg-warning-soft">
                        <p class="text-warning-light">
                            <b-icon icon="tag"></b-icon>
                            Price:{{selectedContract.price}} Dealz Tokens
                        </p>
                    </div>
                    <b-button block class="my-btn mt-3" @click="continuePayment">Select Contract</b-button>
                </div>
            </div>
        </div>

    </b-modal>
    <!-- end contract view dialog -->
    <b-modal size="xl" scrollable centered v-model="fullViewDialog" hide-footer>
        <div class="full-box hidden-scroll px-10" v-html="selectedContract.contract_details">

        </div>
    </b-modal>
    <!-- <contractDialog></contractDialog> -->
</div>
</template>

<script>
import axios from 'axios';
import ContractDialog from '../../components/Dialog/contractviewdialog';
export default {
    components: {
        ContractDialog
    },
    data() {
        return {
            search: '',
            searched: false,
            page: 1,
            limit: 5,
            results: [],
            rows: 0,
            viewContractDialog: false,
            selectedContract: {
                id: '',
                title: ''
            },
            bundle: null,
            bundles: [{
                    value: null,
                    text: "Select bundle",
                    disabled: true
                },
                {
                    value: "Music Artist",
                    text: "Music Artist"
                },
                {
                    value: "Designer",
                    text: "Designer"
                },
                {
                    value: "Founder",
                    text: "Founder"
                },
            ],
            readyContract: false,
            fullViewDialog: false,
            token: '',
            templates: [{
                    title: 'Brain Trust New Sound Exchange Procedures for LOD',
                    type: 'Startup'
                },
                {
                    title: 'Brain Trust New Sound Exchange Procedures for LOD',
                    type: 'Music'
                },
                {
                    title: 'Brain Trust New Sound Exchange Procedures for LOD',
                    type: 'Art'
                },
            ],
            start: [{
                    title: 'Leo adipiscing id egestas neque sapien hendrerit odio felis.'
                },
                {
                    title: 'Leo diam rhoncus quisque amet est ullamcorper purus.'
                },
                {
                    title: 'Nunc, pellentesque dui amet leo integer lobortis egestas duis.'
                },
                {
                    title: 'Semper enim condimentum ac lectus consequat porttitor proin ac vitae.'
                },
            ],
            usecase: [{
                    case: 'Pulvinar in lacus, enim mattis '
                },
                {
                    case: 'elementum erat massa diam turpis. '
                },
                {
                    case: 'Ut dolor, nunc sed lacinia pretium. '
                },
                {
                    case: 'Euismod in lobortis enim nulla nec.'
                },
                {
                    case: 'Arcu lectus dolor faucibus ac mus aenean.'
                },
            ],
            faq: [{
                    title: 'Non senectus posuere amet ultrices et est mi amet.',
                    text: 'Semper aliquam morbi nullam non eget fringilla. Fringilla nunc, amet posuere ultrices. Aliquet amet, dui eu rhoncus viverra libero sed volutpat. Eget et justo vitae maecenas mauris. Id libero, consectetur consequat, eget nunc ornare at lectus consequat. Pretium dignissim curabitur nunc neque mauris pellentesque venenatis quisque. Neque tortor nulla est ornare praesent dictum odio. Augue porttitor nisi, neque ultricies posuere adipiscing pellentesque.'
                },
                {
                    title: 'Vitae egestas turpis duis posuere.',
                    text: 'Semper aliquam morbi nullam non eget fringilla. Fringilla nunc, amet posuere ultrices. Aliquet amet, dui eu rhoncus viverra libero sed volutpat. Eget et justo vitae maecenas mauris. Id libero, consectetur consequat, eget nunc ornare at lectus consequat. Pretium dignissim curabitur nunc neque mauris pellentesque venenatis quisque. Neque tortor nulla est ornare praesent dictum odio. Augue porttitor nisi, neque ultricies posuere adipiscing pellentesque.'
                },
                {
                    title: 'Enim egestas sed at urna ultricies non est quam.',
                    text: 'Semper aliquam morbi nullam non eget fringilla. Fringilla nunc, amet posuere ultrices. Aliquet amet, dui eu rhoncus viverra libero sed volutpat. Eget et justo vitae maecenas mauris. Id libero, consectetur consequat, eget nunc ornare at lectus consequat. Pretium dignissim curabitur nunc neque mauris pellentesque venenatis quisque. Neque tortor nulla est ornare praesent dictum odio. Augue porttitor nisi, neque ultricies posuere adipiscing pellentesque.'
                },
                {
                    title: 'Vulputate eu, sed sapien a, etiam fringilla.',
                    text: 'Semper aliquam morbi nullam non eget fringilla. Fringilla nunc, amet posuere ultrices. Aliquet amet, dui eu rhoncus viverra libero sed volutpat. Eget et justo vitae maecenas mauris. Id libero, consectetur consequat, eget nunc ornare at lectus consequat. Pretium dignissim curabitur nunc neque mauris pellentesque venenatis quisque. Neque tortor nulla est ornare praesent dictum odio. Augue porttitor nisi, neque ultricies posuere adipiscing pellentesque.'
                }
            ],
            customers: [{
                    rating: '4',
                    name: 'John Doe',
                    text: 'Tellus dictum tempor parturient et nunc justo varius. Pharetra vel enim justo, mi elementum pulvinar in. Fringilla nullam viverra augue eleifend.'
                },
                {
                    rating: '4',
                    name: 'John Doe',
                    text: 'Aliquam velit nunc pellentesque sapien pulvinar eu eget egestas. Mi eu arcu, id arcu in lacus habitasse vel nec. Tristique nisl ut sapien aliquam vel rhoncus feugiat. Maecenas turpis adipiscing at sodales egestas vestibulum tellus.'
                },
                {
                    rating: '4',
                    name: 'John Doe',
                    text: 'Eleifend suspendisse pulvinar potenti lacus, elit nisl. Rhoncus sit sapien massa a hendrerit et augue. Eget eu tortor volutpat suspendisse. Magna auctor eget pellentesqu'
                }
            ]
        }
    },
    watch: {
        search(newValue, oldValue) {
            if (newValue.split(' ').length != oldValue.split(' ').length) {
                this.page = 1
                this.searchContracts()
            } else {
                window.setTimeout(() => {
                    this.page = 1
                    this.searchContracts()
                }, 2000);
            }

        }
    },
    mounted() {
        this.token = localStorage.getItem('dealz-token')
    },
    methods: {
        searchContracts() {
            axios.get('https://dealzlegal.herokuapp.com/api/contracts/search?search=' + this.search + '&page=' + this.page + '&limit=' + this.limit)
                .then(res => {
                    this.searched = true
                    this.results = res.data.search
                    this.rows = res.data.total_results
                }).catch(err => console.log(err.response))
        },
        input(e) {
            this.page = e
            this.searchContracts()
        },
        seeContractDetail(item) {
            this.selectedContract = item
            this.viewContractDialog = true
            axios.get('https://dealzlegal.herokuapp.com/api/contracts/getcontract?id=' + item._id)
                .then(res => {
                    this.selectedContract = res.data
                })
                .catch(err => console.log(err.response))
        },
        continuePayment() {
            const bodyParameters = {
                contract_id: this.selectedContract._id,
                txnId: 123
            }
            const config = {
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            }
            axios.post('https://dealzlegal.herokuapp.com/api/contracts/select', bodyParameters, config)
                .then(res => {
                    this.readyContract = true
                }).catch(err => console.log(err.response))

        },
        getbundles() {

        }
    }
}
</script>

<style lang="scss">
@import "~/assets/styles/Dashboard.scss";

::placeholder {
    opacity: 0.2;
    margin-left: -10px;
}

.modal-header {
    height: 0px;
    border-bottom: none;
}

.modal-dialog {
    padding: 0 30px;
}

.modal-dialog-centered.modal-dialog-scrollable .modal-content {
    padding: 0 15px;
    height: 595px;
}
.adjust-btn{
    border:1px;
    margin:0px 0px 1px 1px;
    border-right: 1px solid #dfe6ec;
    border-left: none;
    border-top: none;
    border-bottom: none;
    border-top-left-radius:10px;
    border-bottom-left-radius:10px;
    border-top-right-radius:0px;
    border-bottom-right-radius:0px;

}
b-card {
    box-shadow: none;
}
</style>
