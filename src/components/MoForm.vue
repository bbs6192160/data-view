<template>
<div>
    <v-row v-for="(item,index) in items" :key="index">
        <component v-if="item.visible ? item.visible(config) :true" v-bind:is="item.type" v-model="config[item.model]" 
        :type="item.inputType" :label="item.label"
        @change="Change(config[item.model],item.model)"
        >
        </component>
    </v-row>
</div>
</template>
<script>
import {VTextField,VSwitch} from 'vuetify/lib'
export default {
    props:['schema','model'],
    components:{
       "v-text-field":VTextField,
       "v-switch":VSwitch
    },
    data(){
        return{
            defModel:{}
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
                            this.$set(this.model,field.model,'')
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
        }
    },
}
</script>