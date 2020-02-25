<template>
    <div>
        <div>
            <grid-layout :layout.sync="layout" :col-num="col_num" :row-height="row_height" :is-draggable="true"
                :is-resizable="true" :is-mirrored="false" :margin="[10, 10]" :use-css-transforms="true"
                :isDraggable="isDesign" :isResizable="isDesign">
                <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
                    :key="item.i" @container-resized="cellResizedEvent" @resized="cellResizedEvent">
                    <cell-item :isDesign="isDesign" :data="item" :selected="selected===item" :redraw="redraw"
                        @remove="removeItem" @select="selectItem" @clone="cloneItem">
                    </cell-item>

                    <v-btn v-if="isDesign && item.type ==='nil'" class="ma-2" dark color="indigo" :fab="true" 
                     style="position: absolute; bottom:0px; left:0px; z-index:0"
                     title="绑定组件类型"
                    @click="selectItem(item)">
                        <v-icon >mdi-pencil</v-icon>
                    </v-btn>
                </grid-item>
            </grid-layout>
            <!--<script-editor v-if="isCoding" @goback="isCoding=!isCoding" :config="config_.layout">
            </script-editor>-->
            <div v-if="isDesign">
                <v-btn icon title="添加组件" @click="createItem"
                    style="position: absolute; bottom:-50px; left:0px; z-index:0">
                    <v-icon>add</v-icon>
                </v-btn>
                <!-- <v-btn icon title="编辑脚本" @click="isCoding=!isCoding"
                    style="position: absolute; bottom:0px; left:60px; z-index:999">
                    <v-icon>code</v-icon>
                </v-btn> -->
                <v-btn icon title="预览" @click="isDesign=!isDesign"
                    style="position: absolute; bottom:-50px; left:60px; z-index:0">
                    <v-icon>mdi-monitor</v-icon>
                </v-btn>
                <!-- <v-btn icon title="执行" @click="play"
                    style="position: absolute; bottom:0px; left:180px; z-index:999">
                    <v-icon>mdi-play</v-icon>
                </v-btn> -->
            </div>
            <v-btn v-else-if="isOverlay" icon title="关闭预览" @click="isDesign=!isDesign"
                style="position: absolute; right:0px; top:0px; z-index:999">
                <v-icon>mdi-close</v-icon>
            </v-btn>

        <v-overlay v-if="isOverlay" :value="!isDesign">
        </v-overlay>
        </div>

<v-row justify="center">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">是否删除组件?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">取消</v-btn>
          <v-btn color="green darken-1" text @click="clearItem()">好</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-row>




        <v-navigation-drawer v-model="showcfg" :width="600" temporary app right>
            <template v-slot:prepend>
                <v-list-item-title class="pt-3 pb-0 px-5">组件类型</v-list-item-title>
                <type-tabs v-model="selected_type" :reload="showcfg" :schema="types"></type-tabs>
                <!-- <v-radio-group v-model="selected_type" row class="py-0 px-5 mx-3">
                    <v-layout wrap>
                        <v-flex lg4 v-for="item in types" v-bind:key="item.type">
                            <v-radio :label="item.name" :value="item.type" class="mt-3"></v-radio>
                        </v-flex>
                    </v-layout>
                </v-radio-group> -->
            </template>
            <div v-if="selected && selected.config && el_schema">
                <v-divider></v-divider>
                <v-list-item-title class="pt-3 pb-0 px-5">属性</v-list-item-title>
                <v-card flat class="py-3 mx-12">
                <mo-form :schema="el_schema" :model="selected.config" @change="onChartConfigChanged"></mo-form>
                </v-card>
            </div>
            <div v-if="selected && selected.source && src_schema">
                <v-divider></v-divider>
                <v-card flat class="pa-0">
                    <v-list-item-title class="pt-3 pb-0 px-5">数据源</v-list-item-title>
                    <div class="py-3 px-8">
                        <hot-table :settings="src_schema" :data="selected.source"></hot-table>
                    </div>
                </v-card>
            </div>
        </v-navigation-drawer>

    </div>
</template>

<script>
    import shortid from "shortid";
    import VueGridLayout from 'vue-grid-layout';
    import CellItem from './CellItemD';
    //import autosave from './../utils/autosave';
    import mocfg from "../utils/mo_config";
    import MoForm from './MoForm'
    import TypeTabs from './TypeTabs'
    //import ScriptEditor from './MoScript';

    import { HotTable } from '@handsontable/vue';
    import 'handsontable/dist/handsontable.full.css';
    import 'handsontable/languages/zh-CN'

    export default {
        components: {
            'GridLayout': VueGridLayout.GridLayout,
            'GridItem': VueGridLayout.GridItem,
            'cell-item': CellItem,
            "hot-table": HotTable,
            "mo-form":  MoForm,
            'type-tabs':TypeTabs,
            //'vue-form-generator':VueFormGenerator,
            //"script-editor": ScriptEditor,
        },
        //mixins: [autosave],
        //name: 'monitor',
        props:{
        initLayout:{
            type: Array,
            default: function(){
                return [];
            }
        },
        initOverlay:{
            default:true
        },
        initDesign:{
            default:true
        }},
        data: function () {
            return {
                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true,
                },
                //layout:this.initLayout,
                selected: null,
                col_num: 24,
                row_height: 30,
                showcfg: false,
                isDesign: this.initDesign,
                isOverlay: this.initOverlay,
                isCoding: false,
                src_schema: null,
                redraw: false,
                dialog: false,
                bDialog: true,
            }
        },
        computed: {
            layout:function() {
                if(this.initLayout){
                    //本地缓存
                    let id = this.$route.params.projId;
                    localStorage.setItem(id,JSON.stringify(this.initLayout));
                    //window.console.log(JSON.stringify(this.initLayout));
                    return this.initLayout;
                }
                return [];
            },
            types: function () {
                return mocfg.allTypes;
            },
            selected_type: {
                get: function () {
                    return this.selected ? this.selected.type : null;
                },
                set: function (v) {
                    if (this.selected) {
                        this.selected.type = v;
                    }
                }
            },
            el_schema: function () {
                if (this.selected) {
                    return mocfg.configSchema(this.selected.type);
                }
                return null;
            },

        },
        watch: {
            selected_type: function (new_type) {
                let el = this.selected;
                this.src_schema = this.getsrcSchema(new_type, el && el.config && el.config.istime);
            },
            showcfg: function(n){
                if(n == false)
                    this.reDraw();
            }
        },
        methods: {
            reDraw: function () {
                if (this.selected) {
                    this.redraw = !this.redraw;
                }
            },
            selectChanged(new_type){
                this.selected_type = new_type;
            },
            onChartConfigChanged: function (value, name) {
                this.change_bycmd = false;
                if (name === 'istime') {
                    this.src_schema = this.getsrcSchema(this.selected.type, value);
                }
            },
            cellResizedEvent: function (i, newH, newW, newHPx, newWPx) {
                let cell = this.layout.find(p => p.i === i);
                if (cell) {
                    cell.size = {
                        // 不知为啥 svg width小于30会ERROR:inValid
                        width: newWPx < 30? 30 :newWPx,
                        height: newHPx
                    };
                }
            },
            getsrcSchema: function (type, istime) {
                //let ss = this.$store.state;
                let src = mocfg.sourceSchema(type, [], [], [], istime);
                if (!src) {
                    return src;
                }
                let self = this;
                src.afterRemoveRow = function () {
                    self.selected.source.push({});
                    self.selected.source.pop();
                };
                return src;
            },
            //删除
            removeItem: function (el) {
                this.dialog = true;
                this.selected = el;
                //let idx = this.layout.indexOf(el);
                //this.layout.splice(idx, 1);
                // for (let e of this.layout) {
                //     if (e === el) {
                //         this.layout.splice(idx, 1);
                //         return;
                //     }
                //     idx += 1;
                // }
            },
            clearItem:function(){
                this.dialog = false;
                let idx = this.layout.indexOf(this.selected);
                this.layout.splice(idx, 1);
            },
            //选中
            selectItem: function (el) {
                this.selected = el;
                let istime = el.type === 'd-line' && el.config && el.config.istime;
                this.src_schema = this.getsrcSchema(el.type, istime);
                this.showcfg = true;
            },
            //克隆
            cloneItem: function (el) {
                let last_y = this.getLastY();
                let item = JSON.parse(JSON.stringify(el));
                item.x = 0;
                item.y = last_y;
                item.i = shortid.generate();
                this.layout.push(item);
            },

            getLastY(){
                let last_y = 0;
                if (this.layout.length === 1) {
                    last_y = this.layout[0].y + this.layout[0].h + 1;
                } else if (this.layout.length > 1) {
                    last_y = this.layout.reduce((n1, n2) => {
                        return (n1.y + n1.h) > (n2.y + n2.h) ? (n1.y + n1.h) : (n2.y + n2.h)
                    }) + 1;
                }
                return last_y;
            },
            //添加
            createItem: function () {
                let last_y = this.getLastY();
                this.layout.push({
                    x: 0,
                    y: last_y,
                    w: 6,
                    h: 4,
                    i: shortid.generate(),
                    config: {},
                    source: [],
                    type: 'nil',
                    size: {}
                })
            },

            play: function() {
                // const { href } = this.$router.resolve({
                //     name: "ArticleDetail",
                //     params: { id: 0 }
                // });
                // console.log(href)
                // window.open('http://localhost:8080/', '_blank', 'toolbar=false, width=900, height=700')
                window.open('http://localhost:8080/', '_blank', 'channelmode=yes, fullscreen=yes, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')

            }
        },

    };
</script>