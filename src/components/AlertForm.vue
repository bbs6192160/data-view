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
      <v-container v-if="panel==0">
      <v-row align="center" v-for="(src_item,index) in conditions" :key="index">
        <v-col cols="2">
            <v-text-field v-if="index ==0" value='满足'></v-text-field>
            <v-select v-else :items="['且','或']" v-model="src_item.and"></v-select>
        </v-col>
        <v-col cols="3">
            <v-select :items="['pro1','pro2']" v-model="src_item.traget"></v-select>
        </v-col>
        <v-col>
            <v-select :items="opItems" v-model="src_item.operate"></v-select>
        </v-col>
        <v-col>
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
          <v-btn icon @click="addItem">
            <v-icon>add_circle</v-icon>
          </v-btn>
      </v-row>
      </v-container>

      </v-tab-item>
    </v-tabs-items>
    </div>
</template>
<script>
export default {
    props:['data'],
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
            panel:null,
            source:[],
        }
    },
    computed:{
        conditions(){
          if(this.data)
            return this.data;
          return this.source;
        }
    }
    ,
    methods:{
      addItem(){
        this.conditions.push({
          and:'且',
          traget:null,
          operate:'大于',
          value:null,
          valueEx:null,
        })
      },
      remove(item){
        let i = this.conditions.indexOf(item);
        this.conditions.splice(i,1);
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