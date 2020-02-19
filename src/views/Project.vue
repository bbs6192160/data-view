<template>
    <v-container>
        <v-app-bar :clipped-right="$vuetify.breakpoint.lgAndUp" clipped-left app color="blue darken-3" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <span>{{proj_name}}</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link :to="{ name: 'Designer',query:{name:proj_name} }" tag="div">
                <v-btn text>设计</v-btn>
            </router-link>
            <router-link :to="{ name: 'Viewer',query:{name:proj_name} }" tag="div">
                <v-btn text>监控</v-btn>
            </router-link>
            <!-- <router-link :to="{ name: 'ProjSrc' }" tag="div">
                <v-btn text>记录</v-btn>
            </router-link>
            <router-link :to="{ name: 'ProjSrc' }" tag="div">
                <v-btn text>助手</v-btn>
            </router-link> -->
            <router-link :to="{ name: 'ProjList' }" tag="div">
                <v-btn icon target="_blank">
                    <v-icon class="px-4">home</v-icon>
                </v-btn>
            </router-link>
        </v-app-bar>
        <router-view/>

            <v-navigation-drawer
                v-model="drawer"
                absolute
                left
                temporary
                >
                <v-list>
                    <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    link
                    @click="onDrawerClick(item)"
                    >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            proj_id: -1,
            proj_name: '',
            drawer:false,
            items: [
                {type:'export',title: '导出JSON', icon: 'mdi-export' },
                {type:'import', title: '导入JSON', icon: 'mdi-import' },
            ],
        }),
        created: function () {
            this.proj_id = this.$route.params.projId;
            this.proj_name = this.$route.query.name;
            // this.$store.dispatch('openProj', this.proj_id)
            //     .then(res => {
            //         this.proj_name = res.name
            //     })
        },
        methods:{
            // onDrawerClick(item){
            //     //window.console.log(item.type)
            // }
        }
    }
</script>