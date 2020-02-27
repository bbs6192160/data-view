<template>
      <v-container>
      <v-list>
      <v-list-item-group v-model="itemIndex">
      <v-list-item v-for="(item,index) in items" :key="index"
        @mouseover="item.self.hoting=true" @mouseleave="item.self.hoting=false"
        @click="itemClick(item)"
        >
        <v-list-item-icon>
            <v-icon>view_list</v-icon>
        </v-list-item-icon>
        <v-text-field autofocus class="pt-0 mt-0" hide-details v-if="item.self.editing" v-model="title_editing" @mousedown.stop @click.stop
            @keydown="keydown">
        </v-text-field>
        <v-list-item-title v-else>{{item.title}}</v-list-item-title>
        <v-spacer></v-spacer>
        <v-btn icon small target="_blank" v-if="!item.self.editing && item.self.hoting" @click.prevent="onEditing(item)" title="编辑">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-btn icon small target="_blank" v-if="!item.self.editing && item.self.hoting" @click.prevent="onDelItem(item)" title="删除">
            <v-icon>delete</v-icon>
        </v-btn>
        <v-btn icon small target="_blank" v-if="item.self.editing" @click.prevent="onEndEdit(item)" title="完成">
            <v-icon>done</v-icon>
        </v-btn>
        <v-btn icon small target="_blank" v-if="item.self.editing" @click.prevent="onCancelEdit(item)" title="取消">
            <v-icon>close</v-icon>
        </v-btn>
    </v-list-item>
      </v-list-item-group>
    </v-list>
          <v-col>
          <!-- <v-btn icon small @click="onAddItem">
          <v-icon>add</v-icon>
        </v-btn> -->
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn icon large @click="onAddItem" v-on="on">
                  <v-icon>add_circle</v-icon>
                </v-btn>
              </template>
              <span>新建报警</span>
            </v-tooltip>
      </v-col>
    </v-container>
</template>

<script>
    import shortid from "shortid";
    export default {
        props: ["source"],
        data: function () {
            return {
                defSource:[],
                itemIndex:null,
                title_editing:null,
                selected:null,
            }
        },
        computed:{
            items(){
                if(this.source){
                    return this.source;
                }
                return this.defSource;
            }
        },
        watch:{
            itemIndex(v){
                if(v == null)
                    this.$emit("click",null);
            }
        },
        methods: {
            onAddItem:function() {
                let item ={
                    title:null,
                    i: shortid.generate(),
                    type:null,
                    config:{},
                    self:{editing:null,hoting:null}
                }
                this.items.splice(0,0,item);
                this.onEditing(item);
            },
            onDelItem: function (el) {  
                let i = this.items.indexOf(el);
                this.items.splice(i,1);
            },
            onEditing: function (el) {
                this.selected = el;
                this.title_editing = el.title;
                for(let item of this.items){
                    item.self.editing = false;
                }
                el.self.editing = true;
            },
            onCancelEdit: function (el) {
                el.self.editing = false;
            },
            onEndEdit: function (el) {
                el.title = this.title_editing;
                el.self.editing = false;    
            },
            keydown: function (event) {
                if (event.key === "Enter") {
                    this.onEndEdit(this.selected);
                } else if (event.key === "Escape") {
                    this.onCancelEdit(this.selected);
                }
            },
            itemClick(item){
                this.$emit("click",item);
            }
        }
    }
</script>