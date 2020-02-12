<template>
    <v-container>
        <v-app-bar :clipped-right="$vuetify.breakpoint.lgAndUp" clipped-left app color="blue darken-3" dark>
            <!-- <v-app-bar-nav-icon @click.stop="toggle_left_panel"></v-app-bar-nav-icon> -->
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
        <router-view />
    </v-container>

</template>

<script>
    export default {
        data: () => ({
            proj_id: -1,
            proj_name: '',
        }),
        created: function () {
            this.proj_id = this.$route.params.projId;
            this.proj_name = this.$route.query.name;
            // this.$store.dispatch('openProj', this.proj_id)
            //     .then(res => {
            //         this.proj_name = res.name
            //     })
        },
        methods: {
            toggle_left_panel: function () {
                //this.$store.commit("toggle_left_panel");
            },
        }
    }
</script>