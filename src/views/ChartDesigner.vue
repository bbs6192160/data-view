<template>
  <div>
    <v-content>
        <monitor :initLayout="layout"></monitor>
    </v-content>
  </div>
</template>
<script>
import Monitor from '../components/MoDesigner';
export default {
    data(){
      return{
        layout:[],
      }
    },
    components:{
        'monitor':Monitor
    },
    methods:{
      saveData(){
        //window.console.log("save new")
        let id = this.$route.params.projId;
        localStorage.setItem(id,JSON.stringify(this.layout));
      },
      loadData(){
        let id = this.$route.params.projId;
        let data = localStorage.getItem(id);
        if(data!=null){
            let res = JSON.parse(data);
            this.layout = res;
        }
      }
    },
    created(){
      this.loadData();
    },
    beforeDestroy(){
      this.saveData();
    },
    watch:{
        layout:{
          handler() {
            this.saveData();
          },
          deep: true
        },
    }
}
</script>