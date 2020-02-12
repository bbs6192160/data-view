<template>
  <div>
    <!-- <v-navigation-drawer v-model="left_panel" clipped app>
      <k-file-tree :proj_id="parseInt($route.params.projId)">
      </k-file-tree>
    </v-navigation-drawer> -->
    <v-content v-if="current_editor!=''">
      <component v-bind:is="current_editor"></component>
    </v-content>
  </div>
</template>

<script>
  //import FileTree from '../components/FileTree';
  //import ProtocolBinary from '../components/ProtocolUI';
  //import Tcg from '../components/TcgUI';
  //import Interface from '../components/ChannelUI';
  import Monitor from '../components/MoDesigner';
  //import LuaEditor from '../components/LuaEditor';

  export default {
    components: {
     // "k-file-tree": FileTree,
      //"protocol": ProtocolBinary,
      //"tcg": Tcg,
      //"interface": Interface,
      "monitor": Monitor,
      //"lua_editor": LuaEditor,
    },
    data: () => ({

    }),
    created: function () {
      // this.$store.commit('setCurrentSrc', {
      //   id: -1,
      //   name: '',
      //   file: '',
      //   catalog: ''
      // });
    },
    computed: {
      left_panel: {
        get: function () {
          //return this.$store.state.left_panel;
          return [];
        },
        set: function (newValue) {
          return newValue;
        }
      },
      current_editor: function () {
        // let src = this.$store.state.current_src;
        // if(src.file==='lua') {
        //   return 'lua_editor'
        // } else if(src.file==='monitor') {
        //   return 'monitor'
        // }
        // return src.catalog;
        return 'monitor';
      },
    },
  }
</script>