//组件默认属性
const defaultFields = [{
    type: 'input',
    inputType: 'text',
    label: '标题',
    model: 'title',
}]

//组件默认数据源
const defaultSrc = {
    colHeaders:['名称','绑定对象','报警条件','报警方式'],
    colWidths: [100, 150,100],
    columns: [
        {
            data: 'title',
            type: 'text',
        },
        {
            data: "target",
            type: 'autocomplete',
            strict: true,
            allowInvalid: false,
            source: ['protocol_1.name', 'protocol_2.name', 'protocol_2.ch']
        },
        {
            data: "conditions",
            type: 'autocomplete',
            strict: true,
            allowInvalid: false,
            source: ['大于0', '小于100', '[20,50]']
        },
        {
            data: "notifications",
            type: 'autocomplete',
            strict: true,
            allowInvalid: false,
            source: ['颜色报警', '闪烁报警', '其他']
        }
    ]
}

//多行文本属性
const textOutFields = [{
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

//数值表盘属性
const valueFields = [{
    type: 'input',
    inputType: 'number',
    label: '最小刻度值',
    model: 'min',
    default:'0',
}, {
    type: 'input',
    inputType: 'number',
    label: '最大刻度值',
    model: 'max',
    default:'100',
}, {
    type: 'input',
    inputType: 'number',
    label: '过小报警值(黄色)',
    model: 'min_warnning',
    default:'0',
}, {
    type: 'input',
    inputType: 'number',
    label: '过大报警值(红色)',
    model: 'max_warnning',
    default:'100',
}]

//form 表单数据源
const formSrc = {
    colHeaders:['名称', '输入类型', '绑定对象', '当前值'],
    colWidths: [100, 90, 160, 80],
    columns: [{
        data: 'title'
    }, {
        data: 'type',
        type: 'autocomplete',
        strict: true,
        allowInvalid: false,
        source: ['text', 'number', 'boolean','array'] // 'select'
    },
    {
        data: "target",
        type: 'autocomplete',
        source: ['protocol-1', 'protocol-2', 'protocol-3','protocol-4']
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
            type: 'switch',
            label: '时序曲线',
            model: 'istime',
            default:false
        }, {
            type: 'input',
            inputType: 'number',
            label: '采样周期',
            hint: 'ms',
            model: 'step',
            visible: function (m) {
                return (m && m.istime);
            },
        }],
        source:defaultSrc,
    },
    'd-step': {
        fields: [{
            type: 'input',
            inputType: 'number',
            label: '采样周期',
            hint: 'ms',
            model: 'step'
        }],
        source:defaultSrc,
    },
    'd-point': {
        fields: [{
            type: 'switch',
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
        }],
        source: defaultSrc,
    },
    'n-lable': {
        fields: [{
            type: 'input',
            label: '显示文本',
            model: 'title',
            }, 
        ],
    },
    'n-btn': {
        fields: [
            {
                type: 'input',
                label: '显示文本',
                model: 'title',
            }, 
            {
                type: 'combobox',
                label: '绑定事件',
                model: 'function',
                source: ['通道事件XXX','协议事件XXX'],
            }, 
        ],
    },
    'n-img':{
        fields: [
            {
                type: 'text',
                label: '上传图片',
                model: 'upload',
            }, 
        ],
    },
    'v-text-field': {
        fields: defaultFields,
        source: formSrc,
    },
    'd-lamp': getDefalutSchema(),
    'v-switch': getDefalutSchema(),
    'n-table': getDefalutSchema(),
    'v-select': {
        fields:[{
            type: 'input',
            inputType: 'text',
            label: '标题',
            model: 'title',
        },
        {
            type: 'combobox',
            label: '列表项',
            model: 'items',
            multiple:true,
            clearable:true,
            default :[],
        },
        {
            type: 'switch',
            label: '多选',
            model: 'multiple',
            default: false,
        },
        ],
        source:defaultSrc
    },
    'v-slider': {
        fields:[{
            type: 'input',
            inputType: 'number',
            label: '最小值',
            model: 'min',
            default:'0',
        }, {
            type: 'input',
            inputType: 'number',
            label: '最大值',
            model: 'max',
            default:'100',
        },],
        source:defaultSrc,
    },
    'v-file-input': getDefalutSchema(),
}

export default{
    getSchema: function (type) {
        return _schema[type];
    },
}