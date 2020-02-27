<template>
  <div>
    <v-content>
        <monitor :initLayout="layout" :initAlert="alert" ></monitor>
    </v-content>
  </div>
</template>
<script>
import Monitor from '../components/MoDesigner';
export default {
    data(){
    return{
        layout:[],
        alert:{conditions:[],notifications:[]},
      }
    },
    components:{
        'monitor':Monitor
    },
    methods:{
      loadData(){
        let id = this.$route.params.projId;
        let data = localStorage.getItem(id);
        let alert = localStorage.getItem("alert_"+id);
        if(data!=null){
            let res = JSON.parse(data);
            this.layout = res;
        }
        if(alert!=null){
            let res = JSON.parse(alert);
            this.alert = res;
            window.console.log(alert);
        }
      }
    },
    created(){
      this.loadData();
    },
}
</script>