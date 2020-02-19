//组件默认属性
const defaultFields = [{
    type: 'v-text-field',
    inputType: 'text',
    label: '标题',
    model: 'title',
}]

//组件默认数据源
const defaultSrc = {
    colHeaders:['名称','绑定对象'],
    colWidths: [160, 180],
    columns: [
        {
            data: 'title',
            type: 'text',
        },
        {
            data: "target",
            type: 'autocomplete',
        }
    ]
}

//多行文本属性
const textOutFields = [{
    type: 'v-text-field',
    inputType: 'text',
    label: '标题',
    model: 'title',
}, {
    type: 'v-text-field',
    inputType: 'number',
    label: '显示行数',
    model: 'rows',
}, {
    type: 'v-text-field',
    inputType: 'number',
    label: '最大保留行数',
    model: 'max_rows'
}]

//数值表盘属性
const valueFields = [{
    type: 'v-text-field',
    inputType: 'number',
    label: '最小刻度值',
    model: 'min',
    default:'0',
}, {
    type: 'v-text-field',
    inputType: 'number',
    label: '最大刻度值',
    model: 'max',
    default:'100',
}, {
    type: 'v-text-field',
    inputType: 'number',
    label: '过小报警值(黄色)',
    model: 'min_warnning',
    default:'0',
}, {
    type: 'v-text-field',
    inputType: 'number',
    label: '过大报警值(红色)',
    model: 'max_warnning',
    default:'100',
}]

//form 表单数据源
const formSrc = {
    colHeaders:['名称', '输入类型', '绑定对象', '参数'],
    colWidths: [100, 90, 160, 80],
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
    }, {
        data: 'config'
    }
    ]
}

function getDefalutSchema (){
    let res ={
        fields: defaultFields,
        source: defaultSrc,
    }
    return res;
}

const _schema = {
    'd-switch': getDefalutSchema(),
    'd-lamp': getDefalutSchema(),
    'd-textout': {
        fields: textOutFields,
        source: defaultSrc,
    },
    'd-form': {
        fields: defaultFields,
        source: formSrc,
    },
    'd-value': {
        fields: valueFields,
        source: defaultSrc,
    },
    'd-line': {
        fields: [{
            type: 'v-switch',
            label: '时序曲线',
            model: 'istime',
            default:false
        }, {
            type: 'v-text-field',
            inputType: 'number',
            label: '采样周期(ms)',
            //hint: 'ms',
            model: 'step',
            visible: function (m) {
                return (m && m.istime);
            },
        }],
        source:defaultSrc,
    },
    'd-step': {
        fields: [{
            type: 'v-text-field',
            inputType: 'number',
            label: '采样周期(ms)',
            //hint: 'ms',
            model: 'step'
        }],
        source:defaultSrc,
    },
    'd-point': {
        fields: [{
            type: 'v-switch',
            label: '时序散点',
            model: 'istime',
        }, {
            type: 'v-text-field',
            inputType: 'number',
            label: '采样周期(ms)',
            //hint: 'ms',
            model: 'step',
            visible: function (m) {
                return (m && m.istime);
            },
        }],
        source: defaultSrc,
    },
    'd-lable': {
        fields: [{
            type: 'v-text-field',
            label: '显示文本',
            model: 'title',
            }, 
        ],
    },
    'd-btn': {
        fields: [{
            type: 'v-text-field',
            label: '显示文本',
            model: 'title',
            }, 
        ],
    },
    'd-table': getDefalutSchema(),
    'd-text-input': getDefalutSchema(),
    'd-select': getDefalutSchema(),
    'd-tags': getDefalutSchema(),
    'd-slider': getDefalutSchema(),
    'd-file-input': getDefalutSchema(),
}

export default{
    getSchema: function (type) {
        return _schema[type];
    },
}