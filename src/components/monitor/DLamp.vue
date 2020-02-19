<template>
    <div>
        <v-col cols="12" v-if="source_.length>0">
            <v-list-item-title clos="12">{{title}}</v-list-item-title>
            <div v-for="(item, index) in source_" v-bind:key="index"
                style="width: 100%; height:46px">
                <v-avatar :color="index%2===0?'red':'grey'" size=19 class="d-inline-flex"> </v-avatar>
                <v-subheader class="subtitle-1 d-inline-flex"> {{item.title}} </v-subheader>
            </div>
        </v-col>
        <v-col cols="12" v-else>
            <v-list-item-title clos="12">{{title}}</v-list-item-title>
            <div style="width: 100%; height:46px">
                <v-avatar color="red" size=19 class="d-inline-flex"> </v-avatar>
                <v-subheader class="subtitle-1 d-inline-flex"> &lt;名称&gt; </v-subheader>
            </div>
        </v-col>
    </div>
</template>

<script>
    export default {
        props: ["config", "source"],

        computed: {
            title: function() {
                if(this.config && this.config.title) {
                    return this.config.title;
                }
                return '<标题>'
            },
            source_:function() {
                let res = [];
                if(!this.source) {
                    return res;
                }
                for(let s of this.source) {
                    if(s.title || s.target) {
                        res.push(s);
                    }
                }
                return res;
            },
        },

        methods: {
            remove() {
                this.$emit("remove", this.data);
            },
            select() {
                this.$emit("select", this.data);
            }
        }
    };
</script>