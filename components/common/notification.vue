<template>
<div>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <p class="menu-text visible2">Recent</p>
                <b-list-group v-if="notifications.length>0" flush class="pt-0 mx-0">
                    <b-list-group-item v-for="(item,i) in notifications" :key="i" class="link">
                        <div class="row" style="overflow-x:hidden">
                            <div class="col-1 p-0">
                                <b-img src="https://picsum.photos/125/125/?image=58" alt="circle" width="58" height="58" rounded></b-img>
                                <div class="bg-light-light">
                                    <div class="icon-badge" :class="getBg(item)">
                                        <p class="text-center" :class="getColor(item)">
                                            <b-icon :icon="getIcon(item)"></b-icon>
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div class="col-9 p-0">
                                <p class="menu-text text-left mb-1 ml-n2" v-html="getText(item)"></p>
                                <p class="comment-text ml-n2">
                                    2 hours ago
                                </p>
                            </div>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            notifications: [{
                    icon: 'file-earmark-excel',
                    user: null,
                    name: 'My Mutually Cancellable Contract',
                    status: 'Overdue',
                    type: 'status-overdue'
                },
                {
                    icon: 'check2',
                    user: 'Jane Doe',
                    name: "Founder's Negotiation Terms",
                    status: 'Approved',
                    type: 'status-approved'
                },
                {
                    icon: 'check2',
                    user: null,
                    name: 'My Mutually Cancellable Contract',
                    status: 'Verified',
                    type: 'status-verified'
                },
                {
                    icon: 'chat',
                    user: 'Janet Doe',
                    name: 'Contract for Founders',
                    status: null,
                    type: 'comment-added'
                },
                {
                    icon: 'file-earmark-excel',
                    user: null,
                    name: 'FA Contract that is cancelled',
                    status: 'Rejected',
                    type: 'status-rejected'
                }

            ]
        }
    },
    methods: {
        getText(item) {
            let text;
            switch (item.type) {
                case 'status-overdue':
                    text = "Your contract review for <span class='text-primary-light'>" + item.name + "</span> is overdue.";
                    break;
                case 'status-approved':
                    text = "<b>" + item.user + "</b> approved <span class='text-primary-light'>" + item.name + "</span>";
                    break;
                case 'status-verified':
                    text = "You contract <span class='text-primary-light'>" + item.name + "</span> is now verified.";
                    break;
                case 'comment-added':
                    text = "<b>" + item.user + "</b> added new comments on <span class='text-primary-light'>." + item.name + "</span>";
                    break;
                case 'status-rejected':
                    text = "Your contract <span>" + item.name + "</span> has been rejected by admin.";
                    break;
            }
            return text
        },
        getBg(item) {
            switch (item.type) {
                case 'status-overdue':
                    return 'bg-danger-soft'
                    break;
                case 'status-approved':
                    return 'bg-success-soft'
                    break;
                case 'status-verified':
                    return 'bg-success-soft'
                    break;
                case 'comment-added':
                    return 'bg-light-light'
                    break;
                case 'status-rejected':
                    return 'bg-danger-soft'
                    break;
            }
        },
        getColor(item) {
            switch (item.type) {
                case 'status-overdue':
                    return 'text-danger-light'
                    break;
                case 'status-approved':
                    return 'text-success-light'
                    break;
                case 'status-verified':
                    return 'text-success-light'
                    break;
                case 'comment-added':
                    return 'text-light-light'
                    break;
                case 'status-rejected':
                    return 'text-danger-light'
                    break;
            }
        },
        getIcon(item) {
            switch (item.type) {
                case 'status-overdue':
                    return 'file-earmark-excel'
                    break;
                case 'status-approved':
                    return 'check2'
                    break;
                case 'status-verified':
                    return 'check-2'
                    break;
                case 'comment-added':
                    return 'chat'
                    break;
                case 'status-rejected':
                    return 'file-earmark-excel'
                    break;
            }
        }
    }
}
</script>

<style lang="scss">
.icon-badge {
    width: 35px;
    height: 35px;
    border: 3px solid white;
    padding: 3px;
    border-radius: 50%;
    float: right;
    margin-top: -20px;
    margin-left: 40px;
    z-index: 500;
    position: fixed;
    display: block;
}

div.list-group-item.link {
    border: none
}
</style>
