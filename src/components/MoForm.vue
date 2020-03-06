<template>
<div>
    <v-row v-for="(item,index) in items" :key="index">
        <component v-if="item.visible ? item.visible(config) :true" v-bind:is="PraseType(item.type)" v-model="config[item.model]" 
        :type="item.inputType" :label="item.label" :hint="item.hint"
        @change="Change(config[item.model],item.model)"
        :items="item.source"
        :clearable="item.clearable"  :chips="item.multiple" :multiple="item.multiple"
        @click.native="onClick(item)"
        >
        </component>

        <v-col v-if="colorInput(item) && config[item.model]!=''" cols='1'>
            <v-avatar :color="config[item.model]" size="19" style="top:7px">
            </v-avatar>
        </v-col>

        <v-dialog v-model="colorDlg" max-width="315">
            <v-card>
                <v-card-title class="headline">选择颜色</v-card-title>
                <v-card-actions>
                <v-color-picker v-model="color" :swatches="swatches" show-swatches></v-color-picker>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</div>
</template>
<script>

const _swatches=[
        ['#000000'],
        ['#FF0000'],
        ['#FFFF00'],
        ['#00FF00'],
        ['#00FFFF'],
        ['#0000FF'],
        ['#FF00FF'],
]

import {VTextField,VSwitch,VCheckbox,VCombobox} from 'vuetify/lib'
export default {
    props:['schema','model'],
    components:{
       "v-text-field":VTextField,
       "v-switch":VSwitch,
       'v-checkbox':VCheckbox,
       'v-combobox':VCombobox,
    },
    data(){
        return{
            color:'',
            colorDlg:false,
            colorSelected:null,
            swatches:_swatches,
        }
    },
    computed:{
        items(){
            //从fields中导入属性列表
            if(this.schema && this.schema.fields)
                return this.schema.fields;
            return [];
        },
        config(){
            if(this.schema && this.schema.fields && this.model){
                for(let field of this.schema.fields){
                    //从model导入配置，没有则添加默认属性
                    if(field.model && !this.model[field.model]){
                        if(field.default)
                            this.$set(this.model,field.model,field.default)
                        else
                            this.$set(this.model,field.model,null)
                    }
                }
                //window.console.log(JSON.stringify(this.model));
                return this.model;
            }
            return null;
        }
    },
    watch:{
        color(n){
            if(this.colorSelected)
                this.config[this.colorSelected.model] = n;
        }
    },
    methods:{
        Show(field){
            if(field && field.visiable && field.visiable == false)
                return false;
            else
                return true;
        },
        Change(value,name){
            this.$emit('change',value,name);
        },
        PraseType(type){
            switch(type){
                case 'input' :
                    return 'v-text-field';
                case 'switch' :
                    return 'v-switch';
                case 'check' :
                    return 'v-checkbox';
                case 'combobox' :
                    return 'v-combobox';
                default:
                    return 'v-text-field';
            }
        },
        colorInput(item){
            if(item.type == 'input' && item.model && item.model.indexOf('color') != -1)
                return true;
            return false;
        },
        onClick(item){
            this.colorSelected = null;
            if(this.colorInput(item)){
                this.colorSelected = item;
                this.colorDlg = true;
            }
        }
    },
}
</script>