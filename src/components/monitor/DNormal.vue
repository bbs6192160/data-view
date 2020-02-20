<template>
     <div>
        <v-col cols="12" >
            <component v-bind:is="type" clos="12">{{title}}</component>
        </v-col>
    </div>  
</template>

<script>
import {VListItemTitle,VBtn,VDataTable} from 'vuetify/lib'
    export default {
        props: ["config", "source"],
        components:{
            'v-list-item-title':VListItemTitle,
            'v-btn':VBtn,
            'v-data-table':VDataTable,
        },
        computed:{
            type(){
                //重定向的类型
                if(this.config && this.config.reType){
                    switch(this.config.reType){
                        case 'n-lable':
                            return 'v-list-item-title';
                        case 'n-btn':
                            return 'v-btn';
                        case 'n-table':
                            return 'v-data-table';
                    }
                    return this.config.reType;
                }
                return null;
            },
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
    };
</script>