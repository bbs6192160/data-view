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
}
</script>