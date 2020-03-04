function getTypeSrc(src) {
    return {
        height: 200,
        colHeaders: src.colHeaders ? src.colHeaders :['名称','绑定字段'],
        licenseKey: 'non-commercial-and-evaluation',
        stretchH: 'last',
        width: '100%',
        currentRowClassName: 'currentCol',
        colWidths: src.colWidths? src.colWidths:'auto',
        manualColumnResize: true,
        rowHeaders: true,
        wordWrap: false,
        observeChanges: true,
        minSpareRows: 1,
        columns: src.columns?src.columns:[
            {
                data: 'title',
                type: 'text',
            },
            {
                data: "target",
                type: 'autocomplete',
            }
        ],
        language: 'zh-CN',
        contextMenu: ['row_above', 'row_below', '---------', 'remove_row', '---------', 'undo', 'redo', '---------'],
    }
}

function getAlertSrc(){
    return {
        height: 200,
        colHeaders: ['监控对象','报警条件','报警方式'],
        licenseKey: 'non-commercial-and-evaluation',
        stretchH: 'last',
        width: '100%',
        currentRowClassName: 'currentCol',
        colWidths: [100,150,100],
        manualColumnResize: true,
        rowHeaders: true,
        wordWrap: false,
        observeChanges: true,
        minSpareRows: 1,
        columns: [
            {
                data: "target",
                type: 'autocomplete',
                strict: false,
                allowInvalid: true,
                source: ['protocol_1.name', 'protocol_2.name', 'protocol_2.ch']
            },
            {
                data: "conditions",
                type: 'autocomplete',
                strict: true,
                allowInvalid: false,
                source: ['无']
            },
            {
                data: "notifications",
                type: 'autocomplete',
                strict: true,
                allowInvalid: false,
                source: ['无']
            }
        ],
        language: 'zh-CN',
        contextMenu: ['row_above', 'row_below', '---------', 'remove_row', '---------', 'undo', 'redo', '---------'],
    }
}

function getBaseSrc() {
    return {
        height: 200,
        colHeaders: ['名称', '监控对象','报警条件','报警方式'],
        licenseKey: 'non-commercial-and-evaluation',
        stretchH: 'last',
        width: '100%',
        currentRowClassName: 'currentCol',
        colWidths: [100,150,100],
        manualColumnResize: true,
        rowHeaders: true,
        wordWrap: false,
        observeChanges: true,
        minSpareRows: 1,
        columns: [{
                data: 'title'
            },
            {
                data: "target",
                type: 'autocomplete',
                strict: false,
                allowInvalid: true,
                source: ['protocol-1', 'protocol-2', 'protocol-3','protocol-4']
            },
            {
                data: "conditions",
                type: 'autocomplete',
                strict: true,
                allowInvalid: false,
                source: ['无']
            },
            {
                data: "notifications",
                type: 'autocomplete',
                strict: true,
                allowInvalid: false,
                source: ['无']
            }
        ],
        language: 'zh-CN',
        contextMenu: ['row_above', 'row_below', '---------', 'remove_row', '---------', 'undo', 'redo', '---------'],
    }
}

// const formSchema = {
//     height: 300,
//     colHeaders: ['名称', '输入类型', '绑定对象', '参数'],
//     licenseKey: 'non-commercial-and-evaluation',
//     stretchH: 'last',
//     width: '100%',
//     currentRowClassName: 'currentCol',
//     colWidths: [100, 90, 160, 80],
//     manualColumnResize: true,
//     rowHeaders: true,
//     wordWrap: false,
//     observeChanges: true,
//     minSpareRows: 1,
//     columns: [{
//             data: 'title'
//         }, {
//             data: 'type',
//             type: 'autocomplete',
//             strict: true,
//             allowInvalid: false,
//             source: ['text', 'number', 'select', 'checkbox']
//         },
//         {
//             data: "target",
//             type: 'autocomplete',
//             strict: false,
//             allowInvalid: true,
//             source: ['cvt.']
//         }, {
//             data: 'config'
//         }
//     ],
//     language: 'zh-CN',
//     contextMenu: ['row_above', 'row_below', '---------', 'remove_row', '---------', 'undo', 'redo', '---------'],
// }

function getXYSchema() {
    return {
        height: 200,
        colHeaders: ['名称','绑定(X)','绑定(Y)'],
        licenseKey: 'non-commercial-and-evaluation',
        stretchH: 'last',
        width: '100%',
        currentRowClassName: 'currentCol',
        colWidths: [120, 160, 100],
        manualColumnResize: true,
        rowHeaders: true,
        wordWrap: false,
        observeChanges: true,
        minSpareRows: 1,
        columns: [{
                data: 'title'
            },
            {
                data: "x",
                type: 'autocomplete',
                strict: false,
                allowInvalid: true
            },
            {
                data: "target",
                type: 'autocomplete',
                strict: false,
                allowInvalid: true
            },
        ],
        language: 'zh-CN',
        contextMenu: ['row_above', 'row_below', '---------', 'remove_row', '---------', 'undo', 'redo', '---------'],
    }
}


function getCitList(bchs, ichs, schs) {
    let res = [];
    if (bchs) {
        for (let ch of bchs) {
            res.push('cit.' + ch.name);
        }
    }
    if (ichs) {
        for (let ch of ichs) {
            res.push('cit.' + ch.name);
        }
    }
    if (schs) {
        for (let ch of schs) {
            res.push('cit.' + ch.name);
        }
    }
    res.push('cvt.')
    res.push('cpt.')
    return res;
}

import typeList from './type_lists' //组件属性和数据源

export default {
    configSchema: function (type) {
        //return _schema[type];
        return typeList.getSchema(type);
    },
    sourceSchemaBase: function (type){
        if(this.configSchema(type) && this.configSchema(type).source){
            let src = this.configSchema(type).source;
            let base = getTypeSrc(src);
            return base;
        }
        return null;
    },
    alertSource:function(){
        let alert =  getAlertSrc();
        return alert;
    },
    sourceSchema: function (type, binfs, iinfs, sinfs, istime) {
        let base = null;
        switch (type) {
            //case 'd-switch':
            case 'd-lamp':
                base = getBaseSrc();
                base.columns[1].source = getCitList(binfs, null, null);
                return base;
            case 'd-textout':
            case 'd-text':
                base = getBaseSrc();
                base.columns[1].source = getCitList(binfs, iinfs, sinfs);
                return base;
            case 'd-value':
            case 'd-table':
                base = getBaseSrc();
                base.columns[1].source = getCitList(null, iinfs, null);
                return base;
            //case 'd-form':
                //return formSchema;
            case 'd-line':
            case 'd-step':
            case 'd-point':
                base = getXYSchema();
                if (istime || type === 'd-step') {
                    if (type === 'd-step') {
                        base.columns[1].source = getCitList(binfs, null, null);
                    } else{
                        base.columns[1].source = getCitList(null, iinfs, null);
                    }
                    base = getBaseSrc();

                    // base.colHeaders.pop();
                    // base.colHeaders.pop();
                    // base.colWidths.pop();
                    // base.colWidths.pop();
                    // base.columns.pop();
                    // base.columns.pop();
                } else {
                    base.columns[1].source = getCitList(null, null, null);
                }
                return base;
        }
        return this.sourceSchemaBase(type);
    },
    //
    alertConfig:{
        tabs:[
            {
                title:'报警条件',
                source:['大于','小于','区间内','区间外','NULL'],
            },{
                title:'报警方式'
            }
        ],
        //所有的报警方式
        alertTypes:[
            {
                name:'颜色报警',
                type:'n-color',
            },
            {
                name:'弹框报警',
                type:'n-dialog',
            }
        ],
    },
    //所有组件类型在此定义
    allTypes: [
        {
            title:'通用',
            types:[
                {
                    type: 'n-lable',
                    name: '文本标签'
                },
                {
                    type: 'n-btn',
                    name: '按钮'
                },
                {
                    type: 'n-img',
                    name: '图片'
                },
            ]
        },
        {
            title:'监视',
            types:[
                {
                    type: 'd-lamp',
                    name: '指示灯'
                },
                {
                    type: 'd-text',
                    name: '单行文本'
                },
                {
                    type: 'd-textout',
                    name: '多行文本'
                },
                {
                    type: 'd-value',
                    name: '数值表盘'
                },
                {
                    type: 'n-table',
                    name: '表格'
                },
                {
                    type: 'd-line',
                    name: '曲线图'
                },
                {
                    type: 'd-step',
                    name: '阶梯图'
                }, {
                    type: 'd-point',
                    name: '散点图'
                }, 
            ]
        },
        {
            title:'控制',
            types:[
                {
                    type: 'v-text-field',
                    name: '文本框'
                },
                {
                    type: 'v-select',
                    name: '下拉框',
                },
                {
                    type: 'v-slider',
                    name: '滑块'
                },
                {
                    type: 'v-switch',
                    name: '开关'
                },
                {
                    type: 'd-form',
                    name: '输入表单'
                },
                // {
                //     type: 'v-file-input',
                //     name: '文件加载'
                // }
            ]
        },
    ],
}