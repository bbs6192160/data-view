const _schema = {
    'd-switch': {
        fields: [{
            type: 'input',
            inputType: 'text',
            label: '标题',
            model: 'title',
        }]
    },
    'd-lamp': {
        fields: [{
            type: 'input',
            inputType: 'text',
            label: '标题',
            model: 'title',
        }]
    },
    'd-textout': {
        fields: [{
            type: 'input',
            inputType: 'text',
            label: '标题',
            model: 'title',
        }, {
            type: 'input',
            inputType: 'number',
            label: '显示行数',
            model: 'rows',
        }, {
            type: 'input',
            inputType: 'number',
            label: '最大保留行数',
            model: 'max_rows'
        }]
    },
    'd-form': {
        fields: [{
            type: 'input',
            inputType: 'text',
            label: '标题',
            model: 'title',
        }]
    },
    'd-value': {
        fields: [{
            type: 'input',
            inputType: 'number',
            label: '最小刻度值',
            model: 'min',
        }, {
            type: 'input',
            inputType: 'number',
            label: '最大刻度值',
            model: 'max'
        }, {
            type: 'input',
            inputType: 'number',
            label: '过小报警值(黄色)',
            model: 'min_warnning',
        }, {
            type: 'input',
            inputType: 'number',
            label: '过大报警值(红色)',
            model: 'max_warnning'
        }]
    },
    'd-line': {
        fields: [{
            type: 'checkbox',
            label: '时序曲线',
            model: 'istime',
        }, {
            type: 'input',
            inputType: 'number',
            label: '采样周期',
            hint: 'ms',
            model: 'step',
            visible: function (m) {
                return (m && m.istime);
            },
        }]
    },
    'd-step': {
        fields: [{
            type: 'input',
            inputType: 'number',
            label: '采样周期',
            hint: 'ms',
            model: 'step'
        }]
    },
    'd-point': {
        fields: [{
            type: 'checkbox',
            label: '时序散点',
            model: 'istime',
        }, {
            type: 'input',
            inputType: 'number',
            label: '采样周期',
            hint: 'ms',
            model: 'step',
            visible: function (m) {
                return (m && m.istime);
            },
        }]
    }

}

function getBaseSrc() {
    return {
        height: 300,
        colHeaders: ['名称', '监控对象'],
        licenseKey: 'non-commercial-and-evaluation',
        stretchH: 'last',
        width: '100%',
        currentRowClassName: 'currentCol',
        colWidths: [160, 180],
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
                //source: self.getParas(),
            }
        ],
        language: 'zh-CN',
        contextMenu: ['row_above', 'row_below', '---------', 'remove_row', '---------', 'undo', 'redo', '---------'],
    }
}

const formSchema = {
    height: 300,
    colHeaders: ['名称', '输入类型', '绑定对象', '参数'],
    licenseKey: 'non-commercial-and-evaluation',
    stretchH: 'last',
    width: '100%',
    currentRowClassName: 'currentCol',
    colWidths: [100, 90, 160, 80],
    manualColumnResize: true,
    rowHeaders: true,
    wordWrap: false,
    observeChanges: true,
    minSpareRows: 1,
    columns: [{
            data: 'title'
        }, {
            data: 'type',
            type: 'autocomplete',
            strict: true,
            allowInvalid: false,
            source: ['text', 'number', 'select', 'checkbox']
        },
        {
            data: "target",
            type: 'autocomplete',
            strict: false,
            allowInvalid: true,
            source: ['cvt.']
        }, {
            data: 'config'
        }
    ],
    language: 'zh-CN',
    contextMenu: ['row_above', 'row_below', '---------', 'remove_row', '---------', 'undo', 'redo', '---------'],
}

function getXYSchema() {
    return {
        height: 300,
        colHeaders: ['名称', '监控对象', 'X', 'Y'],
        licenseKey: 'non-commercial-and-evaluation',
        stretchH: 'last',
        width: '100%',
        currentRowClassName: 'currentCol',
        colWidths: [120, 160, 100, 100],
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
                allowInvalid: true
            }, {
                data: 'x'
            }, {
                data: 'y'
            }
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

export default {
    configSchema: function (type) {
        return _schema[type];
    },
    sourceSchema: function (type, binfs, iinfs, sinfs, istime) {
        let base = null;
        switch (type) {
            case 'd-switch':
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
                base = getBaseSrc();
                base.columns[1].source = getCitList(null, iinfs, null);
                return base;
            case 'd-form':
                return formSchema;
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

                    base.colHeaders.pop();
                    base.colHeaders.pop();
                    base.colWidths.pop();
                    base.colWidths.pop();
                    base.columns.pop();
                    base.columns.pop();
                } else {
                    base.columns[1].source = getCitList(null, null, null);
                }
                return base;
        }
        return null;
    },
    allTypes: [
        // {
        //     type: 'd-switch',
        //     name: '开关'
        // }, {
        //     type: 'd-lamp',
        //     name: '指示灯'
        // },
        // {
        //     type: 'd-text',
        //     name: '单行文本'
        // },
        // {
        //     type: 'd-textout',
        //     name: '多行文本'
        // },
        {
            type: 'd-value',
            name: '数值表盘'
        }, {
            type: 'd-line',
            name: '曲线图'
        }, {
            type: 'd-step',
            name: '阶梯图'
        }, {
            type: 'd-point',
            name: '散点图'
        }, 
        // {
        //     type: 'd-form',
        //     name: '输入表单'
        // }
    ],
}