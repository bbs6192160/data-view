<template>
    <div>
        <v-col cols="12" v-if="source_.length>0">
            <v-list-item-title clos="12">{{title}}</v-list-item-title>
            <v-switch v-for="(item, index) in source_" v-bind:key="index"
                :label="item.title" 
                cols="12" color="red" hide-details>
            </v-switch>
        </v-col>
        <v-col cols="12" v-else>
            <v-list-item-title clos="12">{{title}}</v-list-item-title>
            <v-switch cols="12" label="<名称>" color="red" hide-details>
            </v-switch>
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