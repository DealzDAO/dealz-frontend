<template>
<div>
    <div class="container-fluid">
        <div class="col">
            <div class="sidebar">
                <b-img src="/logo.png" fluid alt="Responsive image"></b-img>
                <div class="sidebar-menu">
                    <div v-for="(item,i) in menu" :key="i" class="sidebar-menu-item" :class="getActiveLook(item)" @click="menuClick(item)">
                        <p>
                            <b-icon :icon="item.icon" class="icon-helper"></b-icon>
                            <span class="menu-text">{{item.title}}</span>
                        </p>
                    </div>
                </div>

                <div class="sidebar-bottom">
                    <div class="sidebar-menu-outlined mb-2">
                        <p>
                            <b-icon icon="file-earmark-plus" class="icon-helper"></b-icon>
                            <span class="helper-text">Create a new contract</span>
                        </p>
                    </div>
                    <div class="sidebar-menu">
                        <p @click="logout" class="sidebar-menu-item">
                            <b-icon icon="box-arrow-left" class="icon-helper"></b-icon>
                            <span class="menu-text">Logout</span>
                        </p>
                    </div>

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
                    link: '/admin/dashboard'
                },
                {
                    title: 'Lawyers',
                    icon: 'person',
                    link: '/admin/lawyers'
                },
                {
                    title: 'Contracts',
                    icon: 'journal',
                    link: '/admin/contracts'
                }
            ]
        }
    },
    created() {
        this.$router.push('/admin/dashboard')
    },
    methods: {
        menuClick(item) {
            console.log(item)
            this.active = item.title
            this.getActiveLook(item)
            this.$router.push(item.link)
        },
        getActiveLook(item) {
            if (this.active == item.title) {
                return 'active-menu'
            }

        },
        logout() {
            localStorage.removeItem('dealz-token')
            this.$store.commit('dealz/resetUser')
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss">
.sidebar-menu-item {
    height: 40px;
    border-radius: 8px;
    padding: 8px 16px;
}

.sidebar-menu-item:hover {
    cursor: pointer;
    background-color: rgba(90, 205, 102, 0.24);
}

.btn:hover {
    cursor: pointer;
    background-color: rgba(90, 205, 102, 0.24);
}

.fixed {
    position: fixed
}

.sidebar-bottom {
    position: fixed;
    bottom: 0;
}

.sidebar-menu-outlined {
    height: 40px;
    border-radius: 8px;
    padding: 8px 16px;
    border: 1px solid rgba(52, 208, 148, 0.3);
}
</style>
