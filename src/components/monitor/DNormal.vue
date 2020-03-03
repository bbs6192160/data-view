<template>
     <div>
        <v-col cols="12">
            <component v-bind:is="type" :src="srcImg" :style="style">{{type==='v-img'?'':title}}</component>
        </v-col>
    </div>  
</template>

<script>
import {VListItemTitle,VBtn,VDataTable,VImg} from 'vuetify/lib'
    export default {
        props: ["config", "source"],
        components:{
            'v-list-item-title':VListItemTitle,
            'v-btn':VBtn,
            'v-data-table':VDataTable,
            'v-img':VImg,
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
                        case 'n-img':
                            return 'v-img';
                    }
                    return this.config.reType;
                }
                return null;
            },
            style(){
                let res = '';
                if(this.config && this.config.size);
                  res +='font-size:'+ this.config.size + 'px;';
                if(this.config && this.config.color);
                  res +='color:'+ this.config.color +";";
                return res;
            },
            title: function() {
                if(this.config && this.config.title) {
                    return this.config.title;
                }
                return '<名称>'
            },
            srcImg(){
                if(this.config && this.config.upload) {
                    return this.config.upload;
                }
                return ''
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