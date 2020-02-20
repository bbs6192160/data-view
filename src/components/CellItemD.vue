<template>
    <div v-bind:style="{border: isDesign?'1px solid lightgray':'0', 
        background: isDesign&&data&&data.type==='nil'?'lightgray':'', height:'100%', width:'100%'}">

        <v-btn v-if="isDesign" @click="remove" small icon color="black" title="删除组件" 
            style="position: absolute; top:0px; right:0px; z-index:10">
            <v-icon small>mdi-delete</v-icon>
        </v-btn>
        <v-btn v-if="isDesign && thisType !='nil'" @click="select" small icon :color="selected?'red':'black'" title="设置组件" 
            style="position: absolute; top:0px; right:40px; z-index:10">
            <v-icon small>mdi-wrench</v-icon>
        </v-btn>
        <component ref="chart" v-if="data && data.type!='nil'" v-bind:is="thisType"
            :config="data.config" :source="data.source" :size="data.size" :id="'_' + data.i" :isDesign="isDesign">
        </component>
    </div>
</template>
<style scoped>
    @import '../assets/c3.min.css';
</style>
<script>
    import DSwitch from './monitor/DSwitch';
    import DLamp from './monitor/DLamp';
    import DSingleText from './monitor/DSingleText';
    import DMultiText from './monitor/DMultiText';
    import DInputForm from './monitor/DInputForm';
    import DGauge from './monitor/DGauge';
    import DLine from './monitor/DLine';
    import DStep from './monitor/DStep';
    import DPoint from './monitor/DPoint';
    import DInput from './monitor/DInput'
    import DNormal from './monitor/DNormal'
    import DWelcome from './monitor/DWelcome'

    export default {
        props: ["selected", "data", "isDesign", "redraw"],
        components: {
            'd-switch': DSwitch,
            'd-lamp': DLamp,
            'd-text': DSingleText,
            'd-textout': DMultiText,
            'd-form': DInputForm,
            'd-value': DGauge,
            'd-line': DLine,
            'd-step': DStep,
            'd-point': DPoint,
            'd-nil':DWelcome,
            'form-input': DInput,
            'normal-view':DNormal,
        },
        computed:{
            thisType(){
                if(this.data && this.data.type){
                    //对类型进行分组
                    if(this.data.type.indexOf('v-') !=-1){
                        this.$set(this.data.config,'reType',this.data.type);
                        return 'form-input';
                    }else if(this.data.type.indexOf('n-') !=-1){
                        this.$set(this.data.config,'reType',this.data.type);
                        return 'normal-view';
                    }else
                        return this.data.type;
                }
                return 'nil';
            }
        },
        watch: {
            redraw: function() {
                if(this.selected && this.$refs.chart && this.$refs.chart.reDraw) {
                    this.$refs.chart.reDraw();
                }
            }
        },
        methods: {
            remove() {
                this.$emit("remove", this.data);
            },
            select() {
                this.$emit("select", this.data);
            },

        }
    };
</script>