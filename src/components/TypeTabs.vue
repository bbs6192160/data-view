<template>
<div>
    <!-- <v-expansion-panels v-model="panel">
    <v-expansion-panel
      v-for="(item,index) in items"
      :key="index"
    >
      <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>
      <v-expansion-panel-content>
            <v-radio-group v-model="selected_type" row class="py-0 px-5 mx-3">
                    <v-flex lg4 v-for="it in item.types" v-bind:key="it.type">
                        <v-radio :label="it.name" :value="it.type" class="mt-3"></v-radio>
                    </v-flex>
            </v-radio-group>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels> -->


    <v-tabs
     v-model="panel"
     background-color="transparent"
    >
      <v-tab
        v-for="item in items"
        :key="item.title"
      >
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="panel">
      <v-tab-item
        v-for="item in items"
        :key="item.title"
      >
            <v-radio-group v-model="selected_type" row class="py-0 px-5 mx-3">
                    <v-flex lg4 v-for="it in item.types" v-bind:key="it.type">
                        <v-radio :label="it.name" :value="it.type" class="mt-3"></v-radio>
                    </v-flex>
            </v-radio-group>

      </v-tab-item>
    </v-tabs-items>

</div>
</template>

<script>
export default {
    model: {
        prop: 'selected',
        event: 'selecteChange'
    },
    props:['schema','selected','reload'],
    data(){
        return{
            panel:null,
            seletType:'nil',
        }
    },
    computed:{
        items(){
            if(this.schema != null)
                return this.schema;
            return [];
        },
        selected_type:{
            get: function () {
                if(this.selected)
                    return this.selected;
                return '';
            },
            set: function (v) {
                this.$emit("selecteChange",v);
            }
      },
      show(){
        if(this.reload)
             return this.reload;
        return '';
      }
    },
    watch:{
        show(v){
            if(v == true)
                this.typeToPanel(this.selected_type);
        },
    },
    methods:{
        //根据type选择panel
        typeToPanel(type){
            let findItem = null;
            for(let item of this.items){
                for(let t of item.types){
                    if(t.type === type){
                        findItem = item;
                        break;
                    }
                }
                if(findItem != null)
                    break;
            }
            if(findItem !=null){
                this.panel = this.items.indexOf(findItem);
            }else
                this.panel = '';
        }
    }
}
</script>