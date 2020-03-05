<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-icon>home</v-icon>
            <v-toolbar-title>&nbsp;&nbsp;监控列表</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn icon large @click="showNew=true" v-on="on">
                  <v-icon>add_circle</v-icon>
                </v-btn>
              </template>
              <span>新建监控</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-title v-if="showNew">
            <v-spacer></v-spacer>
            <v-text-field autofocus v-model="newProj" label="输入新建监控名称" single-line class="mx2" @keydown="keydown" />

            <v-btn icon small @click="createProj">
              <v-icon>done</v-icon>
            </v-btn>
            <v-btn icon small @click="showNew=false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <div class="text-center">
            <v-progress-circular indeterminate color="primary" v-if="!items"></v-progress-circular>
            </div>
            <v-list>
              <list-item v-for="(item) in items" :key="item.id" :id="item.id" :title="item.name" @change="change" />
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import shortid from "shortid";
  import ListItem from '../components/ListItem';
  export default {
    components: {
      "list-item": ListItem
    },
    data: () => ({
      drawer: null,
      showNew: false,
      newProj: '',
      items: []
    }),
    created: function () {
      // this.$store.dispatch('getProjList')
      //   .then((res) => {
      //     this.items = res;
      //     if (this.items.length === 0) {
      //       this.showNew = true;
      //     }
      //   });
      let data = localStorage.getItem('project');
      if(data != null){
        let res = JSON.parse(data);
        this.items = res;
      }
      if (this.items.length === 0) {
          this.showNew = true;
      }
    },
    methods: {

      //删除项目
      delItem: function (id) {
        window.console.log("remove " + id)
         let len = this.items.length;
              for (let i = 0; i < len; i++) {
                if (this.items[i].id == id) {
                  this.items.splice(i, 1);
                  if (this.items.length === 0) {
                    this.showNew = true;
                  }
                  break;
                }
              }

        localStorage.setItem('project', JSON.stringify(this.items));
        // this.$store.dispatch('delProj', id)
        //   .then((res) => {
        //     if (res && res.id == id) {
        //       let len = this.items.length;
        //       for (let i = 0; i < len; i++) {
        //         if (this.items[i].id == id) {
        //           this.$store.commit("setMsgInfo", '"' + this.items[i].name + '" 已删除 ');
        //           this.items.splice(i, 1);
        //           if (this.items.length === 0) {
        //             this.showNew = true;
        //           }
        //           break;
        //         }
        //       }
        //     }
        //   })
      },
      change(id,name){
        for(let item of this.items){
          if(item.id == id){
              item.name = name;
              break;
          }
        }
        localStorage.setItem('project', JSON.stringify(this.items));
      },
      //新建项目
      createProj: function () {
        this.newProj = this.newProj.trim();
        window.console.log( this.newProj)
        this.items.push(
          {
            id:shortid.generate(),
            name:this.newProj,
          }
        )
        localStorage.setItem('project', JSON.stringify(this.items));
        // this.$store.dispatch('newProj', this.newProj)
        //   .then(res => {
        //     if (res && res.id) {
        //       this.$router.push({
        //         name: 'ProjSrc',
        //         params: {
        //           projId: res.id
        //         }
        //       });
        //       // this.$store.commit("setMsgSuccess", '"' + this.newProj +'" 创建成功');
        //     }
        //   });
      },

      //快捷键
      keydown: function (event) {
        if (event.key === "Enter") {
          this.createProj();
        } else if (event.key === "Escape") {
          this.showNew = false;
        }
      },
    },

    //called by ListItem
    provide: function () {
      return {
        delItem: this.delItem
      }
    }
  }
</script>