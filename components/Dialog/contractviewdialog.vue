<template>
<div>
    <b-modal size="xl" centered v-model="selectContractDialog" hide-footer>
        <div v-if="readyContract" class="container-fluid" style="margin-top:5%">
            <div class="row justify-content-center">
                <div class="col-8">
                    <div class="row justify-content-center">
                        <b-icon icon="flower1"></b-icon><br />
                    </div>

                    <p class="title-text3 text-center mb-0">Congratulations!</p>
                    <p class="subtitle-text3 text-center">
                        Your contract is ready to use.
                    </p>
                    <b-card class="bg-light-light">
                        <p class="text-center">
                            <small><b>Your transaction hash</b></small>
                        </p>
                        <p class="text-helper text-center">
                            jiw4384834y485 vheiuhfwr387y4852y3urj30qu2q38rq39r3u84wer
                        </p>
                        <div class="row justify-content-center">
                            <b-button class="btn-outlined">
                                <p>View on Explorer</p>
                            </b-button>
                        </div>
                    </b-card>
                    <div class="row justify-content-center">
                        <b-button class="my-btn px-5 mt-2" @click="$router.push('/user/dashboard')">
                            <p>Go to Dashboard</p>
                        </b-button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="bg-white viewBox">
                <div class="col">
                    <p class="title-text2">{{ selectedContract.title }}</p>
                    <p class="helper-text3">
                        Pulvinar in lacus, enim mattis elementum erat massa diam turpis.
                        Ut dolor, nunc sed lacinia pretium. Euismod in lobortis enim nulla
                        nec. Arcu lectus dolor faucibus ac mus aenean. Rutrum massa
                        faucibus ut lobortis sit mattis posuere aliquet interdum. Diam
                        enim lectus in nunc pellentesque tincidunt diam sem tincidunt.
                    </p>
                    <p class="helper-text3">
                        You do not have sufficient Dealz. To use this contract, you will
                        need to purchase Dealz.
                    </p>
                    <p class="helper-text3"><b>Available Dealz:</b> 198 Dz</p>
                    <b-button class="btn-outlined">
                        <p>Buy Dealz</p>
                    </b-button>
                    <br />
                    <div class="admin-chip bg-warning-soft mt-5">
                        <p class="text-warning-light">
                            <b-icon icon="tag"></b-icon>
                            Price:{{ selectedContract.price }} Dealz Tokens
                        </p>
                    </div>
                    <br />
                    <b-button class="my-btn px-5 mt-3">
                        <p>Select Contract</p>
                    </b-button><br />
                    <div class="contract-box hidden-scroll mt-5">
                        <div v-html="selectedContract.contract_details"></div>
                    </div>
                    <div class="row justify-content-end">
                        <p class="float-right text-helper helper-text" style="cursor:pointer" @click="fullViewDialog = true">
                            <b-icon icon="zoom-in"></b-icon> Full screen
                        </p>
                    </div>

                    <p class="subtitle-text4">Who needs this contract?</p>
                    <p class="helper-text3">
                        Pulvinar in lacus, enim mattis elementum erat massa diam turpis.
                        Ut dolor, nunc sed lacinia pretium. Euismod in lobortis enim nulla
                        nec. Arcu lectus dolor faucibus ac mus aenean.
                    </p>
                    <p class="subtitle-text4">How to start Lorem Ipsum?</p>
                    <p class="helper-text3" v-for="(item, i) in start" :key="i">
                        <span class="num-list mr-2">{{ i + 1 }}</span>{{ item.title }}
                    </p>
                    <p class="subtitle-text4">Use cases of this contract</p>
                    <ul>
                        <li v-for="(item, i) in usecase" :key="i">
                            <p class="helper-text3 mb-0">{{ item.case }}</p>
                        </li>
                    </ul>
                    <p class="subtitle-text4">FAQs</p>

                    <b-list-group>
                        <b-list-group-item v-for="(item, i) in faq" :key="i" v-b-toggle="'item' + i">
                            <div class="row justify-content-between px-2">
                                <span>{{ item.title }}</span>
                                <b-icon icon="chevron-down"></b-icon>
                            </div>

                            <b-collapse :id="'item' + i" class="mt-2">
                                <hr />
                                <ul>
                                    <li class="helper-text3">{{ item.text }}</li>
                                </ul>
                            </b-collapse>
                        </b-list-group-item>
                    </b-list-group>

                    <p class="subtitle-text4 mt-4">What our customers say</p>
                    <div class="row">
                        <div class="col-4" v-for="(item, i) in customers" :key="i">
                            <b-form-rating class="ml-n4" :value="item.rating" inline no-border></b-form-rating>
                            <p class="data2">{{ item.name }}</p>
                            <p class="helper-text3">{{ item.text }}</p>
                        </div>
                    </div>
                    <div class="admin-chip bg-warning-soft">
                        <p class="text-warning-light">
                            <b-icon icon="tag"></b-icon>
                            Price:{{ selectedContract.price }} Dealz Tokens
                        </p>
                    </div>
                    <b-button block class="my-btn mt-3" @click="continuePayment">Select Contract</b-button>
                </div>
            </div>
        </div>
    </b-modal>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            readyContract: false,
            text: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor synth nesciunt you probably haven't heard of them accusamus labore VHS.",
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
    computed: {
        selectedContract() {
            return this.$store.state.user.selectedContract
        },
        selectContractDialog: {
            get(){
                return this.$store.state.user.selectContractDialog

            },
            set(value){
                this.$store.commit('user/setSelectContractDialog',value)
            }
        }
    },
    methods: {
        continuePayment() {
            const params = {
                id: this.selectedContract._id
            };
            const config = {
                headers: {
                    Authorization: "Bearer " + this.$auth.$state.user.data.token
                }
            };
            axios
                .post(
                    this.$axios.defaults.baseURL + "/user/select-contract",
                    params,
                    config
                )
                .then(res => {
                    this.readyContract = true;
                })
                .catch(err => console.log(err.response));
        },
    }
}
</script>

<style lang="scss">
.viewBox {
    padding: 10px;
}
</style>
