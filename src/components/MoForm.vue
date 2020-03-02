<template>
<div>
    <v-row v-for="(item,index) in items" :key="index">
        <component v-if="item.visible ? item.visible(config) :true" v-bind:is="PraseType(item.type)" v-model="config[item.model]" 
        :type="item.inputType" :label="item.label" :hint="item.hint"
        @change="Change(config[item.model],item.model)"
        :items="item.source"
        :clearable="item.clearable"  :chips="item.multiple" :multiple="item.multiple"
        >
        </component>
    </v-row>
</div>
</template>
<script>
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
            multiple:false,
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
                return this.model;
            }
            return null;
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
        }
    },
}
</script>