<template>
<div>
    <div class="container">
        <div class="row px-2 justify-content-center">
            <div class="col" v-if="contracts.length>0">
                <div v-for="(item,i) in contracts" :key="i" class="m-2 p-2 clickable">
                    <p class="mb-1 subtitle-text4 link" @click="seeSelected(item)">{{item.contract_id.title}}</p>
                    <div class="admin-chip" :class="getBg(item)">
                        <p :class="getColor(item)">
                            <b-icon v-if="item.status !='New'" :icon="getIcon(item)"></b-icon>
                            {{getStatus(item)}}
                        </p>
                    </div>
                    <div v-if="item.comments.length>0" class="admin-chip bg-secondary-light">
                        <p class="text-helper">
                            <b-icon icon="chat" class="user-icon"></b-icon>
                            {{item.comments.length}} Comments
                        </p>
                    </div>
                    <div v-if="item.approved" class="admin-chip bg-primary-soft">
                        <p class="text-helper">
                            <b-icon icon="check2" class="user-icon"></b-icon>
                            Approved
                        </p>
                    </div>
                    <div v-if="item.contract_id.questions>0" class="admin-chip bg-primary-soft">
                        <p class="text-helper">
                            <b-icon icon="check2" class="user-icon"></b-icon>
                            {{item.contract_id.questions.length}} Questions
                        </p>
                    </div>

                </div>
                <div class="px-4 mt-4">
                    <b-pagination v-model="page" pills prev-text="Prev" next-text="Next" @input="input" :total-rows="rows" hide-goto-end-buttons :per-page="limit"></b-pagination>
                </div>
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
            noText: ''
        }
    },
    mounted() {
        this.getContracts()

    },
    methods: {
        getStatus(item) {
            if (item.status == 'Sent') {
                if (item.sent_id.includes(this.$auth.$state.user.id)) {
                    return 'Received'
                } else {
                    return 'Sent'
                }
            } else {
                return item.status
            }
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
        getContracts() {
            axios.get(this.$axios.defaults.baseURL + '/user/all-contracts?page=' + this.page + '&limit=' + this.limit, {
                    headers: {
                        Authorization: 'Bearer ' + this.$auth.$state.user.data.token
                    }
                })
                .then(res => {
                    console.log('nego:', res.data)
                    this.contracts = res.data.contracts
                    this.rows = res.data.docCount
                    if (this.contracts.length == 0) {
                        this.noText = 'No Contracts Found'
                    }
                })
                .catch(err => console.log(err))

        },
        input(e) {
            this.page = e
            this.getContracts()
        },
        seeSelected(item) {
            console.log(item)
            switch (item.status) {
                case 'New':
                case 'Ready to send':
                    this.$router.push({
                        name: 'user-negotiation-all-contracts-id-edit',
                        params: {
                            id: item._id
                        }
                    })
                    break;
                case 'Draft':
                    this.$router.push({
                        name: "user-negotiation-all-contracts-id-fill",
                        params: {
                            id: item._id
                        }
                    });
                    break;
                case 'Sent':
                    console.log(item)
                    // this.$router.push({
                    //     name: 'user-negotiation-all-contracts-id-view',
                    //     params: {
                    //         id: item._id
                    //     }
                    // })
                    break;
                    // case 'Received':
                    //     return 'bg-primary-soft';
                    //     break;
                    // case 'Pending Signature':
                    //     return 'bg-secondary-soft';
                    //     break;
                    // case 'Cancel Requests':
                    //     return 'bg-danger-soft';
                    //     break;
                    // case 'Verification Awaiting':
                    //     return 'bg-warning-soft';
                    //     break;
            }

        }

    }
}
</script>
