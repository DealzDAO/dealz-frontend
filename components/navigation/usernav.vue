<template>
<div>
    <div class="bg-light-light sidebar">
        <div class="sidebar">
            <b-img src="/logo.png" fluid alt="Responsive image"></b-img>
            <div class="sidebar-menu-outlined link" @click="createNew({title:'new'})" :class="getActiveLook({title:'new'})">
                <p>
                    <b-icon icon="file-earmark-plus" class="icon-helper" :class="getActiveLook({title:'new'})"></b-icon>
                    <span class="menu-text">Create a new contract</span>
                </p>
            </div>
            <div class="sidebar-menu">
                <div v-for="(item,i) in menu" :key="i" class="sidebar-menu-item" :class="getActiveLook(item)" @click="menuClick(item)">
                    <p :class="getActiveLook(item)">
                        <b-icon :icon="item.icon" class="icon-helper" ></b-icon>
                        <span class="menu-text">{{item.title}}</span>
                    </p>
                </div>
            </div>

            <div class="sidebar-menu sidebar-bottom">
                <div class="sidebar-menu-item">
                    <p>
                        <b-icon icon="chat-square-text" class="icon-helper"></b-icon>
                        <span class="menu-text">Messages</span>
                        <b-badge pill variant="danger">3</b-badge>
                    </p>
                </div>
                <div class="sidebar-menu-item">
                    <p>
                        <b-icon icon="bell" class="icon-helper"></b-icon>
                        <span class="menu-text">Notifications</span>
                        <b-badge pill variant="danger" class="ml-10">14</b-badge>
                    </p>
                </div>
                <hr>
                <div class="sidebar-menu-item">
                    <p>
                        <b-icon icon="gear" class="icon-helper"></b-icon>
                        <span class="menu-text">Setting</span>
                    </p>
                </div>
                <div class="sidebar-menu-item">
                    <p @click="logout">
                        <b-icon icon="box-arrow-left" class="icon-helper"></b-icon>
                        <span class="menu-text">Logout</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            active: 'Dashboard',
            menu: [{
                    title: 'Dashboard',
                    icon: 'columns',
                    link: '/user/dashboard'
                },
                {
                    title: 'Contracts in Negotiation',
                    icon: 'journal',
                    link: '/user/negotiation'
                },
                {
                    title: 'Executed Contracts',
                    icon: 'journal-check',
                    link: '/user/executed'
                }
            ]
        }
    },
    created() {
        this.$router.push('/user/dashboard')
    },
    methods: {
        menuClick(item) {
            this.active = item.title
            this.getActiveLook(item)
            this.$router.push(item.link)
        },
        getActiveLook(item) {
            if (this.active == item.title) {
                return ['text-primary-light', 'bg-white']
            }

        },
        createNew(item) {
            this.active = item.title
            this.$router.push('/user/new-contract')
        },
        logout() {
            this.$auth.logout()
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss">
.active-user-menu {
    color: #04a5f6;
    background-color: white;
}

.active-user-menu p {
    color: #04a5f6;
}

.sidebar {
    width: 268px;
    height: 100%;
    position: fixed;
    z-index: 50;
    border-right: 1px solid rgba(17, 17, 17, 0.1);
}

.sidebar-menu {
    margin: 20px 20px;
}

.sidebar-menu-item {
    height: 40px;
    border-radius: 8px;
    padding: 8px 16px;
    color: rgba(17, 17, 17, 0.8);
}

.sidebar-menu-item:hover {
    cursor: pointer;
    background-color: rgba(90, 205, 102, 0.24);
}

.sidebar-bottom {
    position: absolute;
    bottom: 0px;
}

.sidebar-menu-outlined {
    height: 40px;
    border-radius: 8px;
    padding: 8px 16px;
    border: 1px solid rgba(52, 208, 148, 0.3);
    margin: 20px 20px;
}
</style>
