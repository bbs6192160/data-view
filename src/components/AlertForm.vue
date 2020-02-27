<template>
    <div>
    <v-tabs
     v-model="panel"
     background-color="transparent"
    >
      <v-tab
        v-for="item in tabItems"
        :key="item.title"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="panel">
      <v-tab-item
        v-for="item in tabItems"
        :key="item.title"
      >

      </v-tab-item>
    </v-tabs-items>

      <!--panel 0-->

      <v-container v-if="panel==0">
        <div>
          <list-item :source="conditions" @click="listClick"></list-item>
        </div>
      <div v-if="selected">
          <v-list-item-title class="pt-3 pb-0 px-5">{{selected.title}}</v-list-item-title>
        <v-divider></v-divider>
      <v-row align="center" v-for="(src_item,index) in rules" :key="index">
        <v-col cols="2">
            <v-text-field v-if="index ==0" value='满足值'></v-text-field>
            <v-select v-else :items="['且','或']" v-model="src_item.and"></v-select>
        </v-col>
        <!-- <v-col cols="3">
            <v-select :items="['pro1','pro2']" v-model="src_item.traget"></v-select>
        </v-col> -->
        <v-col>
            <v-select :items="opItems" v-model="src_item.operate"></v-select>
        </v-col>
        <v-col v-if="showBegin(src_item.operate)">
            <v-text-field type="number" v-model="src_item.value" ></v-text-field>
        </v-col>
        <v-col v-if="showEnd(src_item.operate)">
            <v-text-field type="number" v-model="src_item.valueEx"></v-text-field>
        </v-col>
        <v-col>
            <v-btn icon @click="remove(src_item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
          <v-btn @click="addItem">
            添加条件
          </v-btn>
      </v-row>
      </div>
      </v-container>

<!--panel 1-->

    <v-container v-if="panel==1">
      <div>
        <list-item @click="listClick" :source="notifications"></list-item>
      </div>
      <div v-if="selected">
      <v-list-item-title class="pt-3 pb-0 px-5">{{selected.title}}</v-list-item-title>
      <v-divider></v-divider>
      <v-list-item-title class="pt-3 pb-0 px-5">类型</v-list-item-title>
      <v-radio-group v-model="selected_type" row class="py-0 px-5 mx-3">
        <v-flex lg4 v-for="item in types" :key="item.type">
            <v-radio :label="item.name" :value="item.type" class="mt-3"></v-radio>
        </v-flex>
      </v-radio-group>
      </div>
      <div v-if="selected && selected_type">
          <v-divider></v-divider>
          <v-list-item-title class="pt-3 pb-0 px-5">属性</v-list-item-title>
          <v-card flat class="py-3 mx-12">
          <mo-form :schema="el_schema" :model="selected.config" ></mo-form>
          </v-card>
      </div>
    </v-container>

    </div>
</template>
<script>
import ListItem from './ListItemGroup'
import MoForm from './MoForm'
const _schema = {
  "n-color":{
    fields:[{
          type:'text',
          label:'颜色',
          model:'color',
          default:'red',
    }]
  },
  "n-dialog":{
    fields:[{
          type:'text',
          label:'弹出消息',
          model:'msg',
          default:'',
      },
      {
          type:'combobox',
          label:'严重程度',
          model:'error',
          items:['一般','警告','错误','严重'],
          default:'警告',
      },
    ]
  }
}
export default {
    props:['data'],
    components:{
      'list-item':ListItem,
      'mo-form':MoForm,
    },
    data(){
        return{
            tabItems:[
                {
                  title:'报警条件',
                },
                {
                  title:'报警方式'
                },
              ],
            opItems:['大于','小于','区间内','区间外','NULL'],
            types:[
                {
                  name:'颜色报警',
                  type:'n-color',
                },
                {
                  name:'弹框报警',
                  type:'n-dialog',
                }
              ],
            panel:null,
            defSource:{conditions:[],notifications:[]},
            listitem: null,
            selected:null,
        }
    },
    computed:{
        source(){
          if(this.data)
            return this.data;
          return this.defSource;
        },
        conditions(){
          if(this.data && this.data.conditions)
            return this.data.conditions;
          return null;
        },
        rules(){
          let res =[];
          if(this.selected && this.selected.config && !this.selected.config.rules){
            this.$set(this.selected.config,'rules',res);
          }
          return this.selected.config.rules;
        },
        notifications(){
          if(this.data && this.data.notifications)
            return this.data.notifications;
          return null;
        },
        el_schema(){
          return _schema[this.selected_type]
        },
        selected_type: {
          get: function () {
            return this.selected ? this.selected.type : null;
          },
          set: function (v) {
            if (this.selected) {
                this.selected.type = v;
            }
         }
      },
    },
    methods:{
      listClick(el){
        this.selected = el;
      },
      addItem(){
        this.rules.push({
          and:'且',
          operate:'大于',
          value:null,
          valueEx:null,
        })
      },
      remove(item){
        let i = this.rules.indexOf(item);
        this.rules.splice(i,1);
      },
      showBegin(op)
      {
        if(op && op.indexOf("NULL")==-1){
          return true;
        }
        return false;
      },
      showEnd(op)
      {
        if(op && op.indexOf("区间")!=-1){
          return true;
        }
        return false;
      }
    }
}
</script>