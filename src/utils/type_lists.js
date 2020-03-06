//组件默认属性
const defaultFields = [{
    type: 'input',
    inputType: 'text',
    label: '标题',
    model: 'title',
}]


//组件默认数据源
const defaultSrc = {
    colHeaders:['名称','绑定数据'],
    colWidths: [160, 180],
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
    colHeaders:['名称', '输入类型', '绑定对象', '参数'],
    colWidths: [100, 90, 160, 80],
    columns: [{
        data: 'title'
    }, {
        data: 'type',
        type: 'autocomplete',
        strict: true,
        allowInvalid: false,
        source: ['text', 'number', 'boolean','array'], // 'select'
        default:'text',
    },
    {
        data: "target",
        type: 'autocomplete',
        source: ['protocol-1', 'protocol-2', 'protocol-3','protocol-4'],
    }, {
        data: 'model'
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
        fields: [
            {
                type: 'input',
                label: '显示文本',
                model: 'title',
            },            
            {
                type: 'input',
                inputType: 'number',
                label: '字体大小',
                model: 'size',
            }, 
            {
                type: 'input',
                label: '字体颜色',
                model: 'color',
                clearable:true
            }, 
            {
                type: 'input',
                label: '链接',
                model: 'href',
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
                type: 'input',
                label: '字体颜色',
                model: 'color',
                clearable:true
            },
            {
                type: 'input',
                label: '背景颜色',
                model: 'backcolor',
                clearable:true
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
                type: 'input',
                label: '图片URL',
                model: 'imgSrc',
                default:'https://www.baidu.com/img/bd_logo1.png?qua=high&where=super'
            }, 
            {
                type: 'input',
                inputType:'file',
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
    //报警方式
    "n-color":{
        fields:[{
              type:'input',
              label:'颜色',
              model:'color',
              default:'#FF0000FF',
        }]
      },
      "n-dialog":{
        fields:[{
              type:'input',
              label:'弹出消息',
              model:'msg',
              default:'',
          },
          {
              type:'combobox',
              label:'严重程度',
              model:'error',
              source:['一般','警告','错误','严重'],
              default:'警告',
          },
        ]
      }
}

export default{
    getSchema: function (type) {
        return _schema[type];
    },
}