<template>
    <div>
        <v-btn class="ma-2" dark color="indigo" :fab="!config.title" @click="showDlg=true">
            <v-icon :left="config.title?true:false">mdi-pencil</v-icon> {{config.title}}
        </v-btn>
        <v-dialog v-model="showDlg" width="500" persistent :transition="false">
            <v-card>
                <v-card-title class="headline">{{config.title || '输入'}}</v-card-title>
                <div class="my-3 mx-8">
                <!-- <vue-form-generator :schema="dlgSchema" :model="model" :options="formOptions">
                </vue-form-generator> -->
                <mo-form :schema="dlgSchema" :model="model"></mo-form>
                </div>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn text @click="showDlg = false">
                        确定
                    </v-btn>
                    <v-btn text @click="showDlg = false">
                        取消
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import MoForm from '../MoForm'
    export default {
        props: ["config", "source"],
        components:{
            'mo-form':MoForm
        },
        data: function () {
            return {
                showDlg: false,
                formOptions: {
                    validateAfterLoad: true,
                    validateAfterChanged: true,
                    validateAsync: true,
                },
                model: {}
            }
        },
        methods: {
            getValues: function(ss) {
                if(!ss) {
                    return [];
                }
                try {
                    let vs = JSON.parse(ss);
                    if(Array.isArray(vs)){
                        return vs;
                    }
                    return [];
                } catch (error) {
                    return [];
                }
            }
        },
        computed: {
            dlgSchema: function () {
                let fields = [];
                if (this.source) {
                    for (let s of this.source) {
                        let fd = null;
                        switch (s.type) {
                            case 'text':
                                fd = {
                                    type: 'input',
                                    inputType: 'text',
                                    label: s.title || '<名称>',
                                    model: s.model,
                                }
                                break;
                            case 'number':
                                fd = {
                                    type: 'input',
                                    inputType: 'number',
                                    label: s.title || '<名称>',
                                    model: s.model,
                                }
                                break;
                            case 'boolean':
                                fd = {
                                    type: 'check',
                                    label: s.title || '<名称>',
                                    values: this.getValues(s.config),
                                    selectOptions: {
                                        noneSelectedText: '<空>'
                                    },
                                    model: s.model,
                                }
                                break;
                            case 'array':
                                fd = {
                                    type: 'combobox',
                                    label: s.title || '<名称>',
                                    model: s.model,
                                }
                                break;
                            default:
                                break;
                        }
                        if (fd) {
                            fields.push(fd)
                        }
                    }
                }
                if (fields.length === 0) {
                    fields.push({
                        type: 'label',
                        label: '<请设置数据源>'
                    })
                }
                return {fields:fields}
            }
        }
    };
</script>