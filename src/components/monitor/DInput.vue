<template>
    <div>
        <v-col cols="12" v-if="source_.length>0">
            <v-list-item-title clos="12">{{title}}</v-list-item-title>
            <component v-bind:is="PraseType(item)" v-for="(item, index) in source_" v-bind:key="index"
                v-model="item.target"  :label="item.title" :hint="item.hint" :type="inputType(item.type)"
                cols="12" hide-details clearable multiple chips>
            </component>
        </v-col>
        <v-col cols="12" v-else>
            <v-list-item-title clos="12">{{title}}</v-list-item-title>
            <component v-bind:is="PraseType(null)"
                label="<标题>" 
                cols="12" hide-details>
            </component>
        </v-col>
    </div>
</template>

<script>
import {VTextField, VSelect, VSwitch, VSlider, VCombobox, VFileInput,VCheckbox} from 'vuetify/lib'

export default {
        props: ["config", "source"],
        components:{
            'v-text-field':VTextField,
            'v-checkbox':VCheckbox,
            'v-select':VSelect,
            'v-switch':VSwitch,
            'v-slider':VSlider,
            'v-combobox':VCombobox,
            'v-file-input':VFileInput,
        },
        computed:{
            title: function() {
                if(this.config && this.config.title) {
                    return this.config.title;
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
        methods:{
            PraseType(item){
                //重定向的类型
                if(this.config && this.config.reType){
                    //对文本框进行特殊处理
                    if(this.config.reType === 'v-text-field'){
                        if(item && item.type === 'boolean')
                            return 'v-checkbox';
                        if( item && item.type === 'array')
                            return 'v-combobox';
                    }
                    return this.config.reType;
                }
                return null;
            },
            inputType(type){
                if(type === 'text' || type === 'number')
                    return type;
                return null;
            },
        }
}
</script>