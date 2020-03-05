<template>
     <div>
        <v-col cols="12">
            <a v-if="type ==='v-list-item-title' && href.length" :style="style" :href='href'>{{title}}</a>
            <!-- <v-list-item-title v-else-if="type ==='v-list-item-title'" :style="style">{{title}}</v-list-item-title> -->
            <component v-else v-bind:is="type" :src="imgSrc" :style="style"  :color="config.color"
            
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            :class="selfClass"
            :caption="caption"
            >{{type==='v-img'?'':title}}
            </component>
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
        data(){
            return{
            }
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
                let res = {fontSize:'',color:'',backgroundColor:''};
                if(this.config && this.config.size)
                    res.fontSize = this.config.size + 'px';
                if(res.fontSize === 'px')
                    res.fontSize ='';
                if(this.config && this.config.color)
                   res.color = this.config.color;
                if(this.config && this.config.backcolor)
                   res.backgroundColor = this.config.backcolor;
                return res;
            },
            selfClass(){
                if(this.type === 'v-data-table')
                    return 'elevation-1';
                return '';
            },
            title: function() {
                if(this.config && this.config.title) {
                    return this.config.title;
                }
                return '<名称>'
            },
            caption: function() {
                if(this.config && this.config.title) {
                    return this.config.title;
                }
                return ''
            },        
            imgSrc(){
                if(this.config && this.config.imgSrc) {
                    return this.config.imgSrc;
                }
                return ''
            },
            href(){
                if(this.config && this.config.href) {
                    return this.config.href;
                }
                return ''
            },
            btnBackColor(){
                if(this.config && this.config.backcolor) {
                    return this.config.backcolor;
                }
                return ''
            },
            headers(){
                let res = [];
                if(!this.source) {
                    return res;
                }
                for(let s of this.source) {
                    if(s.title || s.target) {
                        res.push({text:s.title,value:s.target});
                    }
                }
                return res;                
            },
            desserts(){
                let res = [];
                let it = {};
                for(let i = 0;i<10;i++){
                    for(let head of this.headers){
                    if(head.text =='Time')
                        this.$set(it,head.value,'2020-01-01 12:00:00');
                    else
                        this.$set(it,head.value,'测试数据XXX');
                    }
                    res.push(it);
                }
                //window.console.log(JSON.stringify(res));
                return res;
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