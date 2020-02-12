<template>
  <div>
    <v-content>
        <monitor :initLayout="layout" :initDesign="false" :initOverlay="false"></monitor>
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
        reload(){
            let id = this.$route.params.projId;
            let data = localStorage.getItem(id);
            //window.console.log(data);
            if(data!=null){
                let res = JSON.parse(data);
                this.layout = res;
            }
            this.$forceUpdate();
        }
    },
    created(){
        this.reload();
    },
}
</script>