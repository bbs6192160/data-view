<template>
    <div :id="id" v-bind:style="{margin: '15px', width:size.width||300, height:size.height||100}">
    </div>
</template>

<script>
    import c3 from 'c3';
    export default {
        props: ["config", "source", "size", "id", "isDesign"],
        watch: {
            size: function (v) {
                if(!this.chart) {
                    return;
                }
                this.chart.resize({width:v.width-30, height:v.height-30});
            },
        },
        methods: {
            reDraw: function() {
                this.chart = this.createChart();
            },
            createData(min, max, step) {
                let dd = Math.random() * (max-min);
                let res = [];
                for(let i=0; i<100; i++) {
                    if(dd + step>max) {
                        step = 0 - step;
                    }
                    if(step<0 && dd+step<min) {
                        step = 0 - step;
                    }
                    dd = dd + step;
                    let rr = Math.random() * 10 * step;
                    if(Math.floor(rr)%2===0) {
                        res.push(dd+rr);
                    } else {
                        res.push(dd-rr);
                    }
                }
                return res;
            },
            createColumns() {
                let res = [];
                if(this.source) {
                    for(let s of this.source) {
                        if(s.target) {
                            let d = [s.title || s.target].concat(this.createData(0, 50, 1));
                            res.push(d);
                        }
                    }
                }
                if(res.length===0) {
                    //let d = ['<名称>'].concat(this.createData(0, 50, 1));
                    this.sinData = this.createSinData(this.count,10);
                    let d = ['sin'].concat(this.sinData);
                    res.push(d);
                }
                return res;
            },
            createChart: function(){
                let op = {
                    bindto: '#' + this.id,
                    data: {
                        columns: this.createColumns(),
                    },
                    type: 'spline',
                };
                if(this.config && this.config.istime) {
                    let col = ['__time__'];
                    for(let i=0; i<1000; i=i+20) {
                        col.push(i);
                    }
                    op.data.x = '__time__';
                    op.data.columns.unshift(col);
                    op.axis = {
                        x: {
                            type: 'timeseries',
                            localtime: true,
                            // tick: {
                            //     format: function (x) { return x.getUTCSeconds() + '.' + x.setUTCMilliseconds(); }
                            // }
                        }
                    }
                }
                let res = c3.generate(op);
                if(this.size) {
                    res.resize({width:this.size.width-30, height:this.size.height-30});
                }
                return res;
            },
            createSinData:function(point, maxnum){
                let x =0.0
                let jiao = 0.0//角度 分度角
                let res = []
                jiao=360.000/point;
                for(let i=0;i<point;i++)
                {
                    x=jiao*i;    //得到角度值
                    x=x*0.01744; //角度转弧度  弧度=角度*（π/180）
                    let data =(maxnum/2) * Math.sin(x);
                    res.push(data);
                }
                return res;
            },
            flowSinData(){
                let flowData = ['sin']
                //for(let i =0;i<2;i++)
                    flowData.push(this.sinData[this.index++ % this.count])
                // let to = 0;
                // if(this.index > 100)
                //     to = this.index - 100;
                this.chart.flow({
                    columns:[
                        flowData
                    ],
                    //to:to
                });
            }
        },
        data(){
            return{
                sinData:[],
                index:0,
                count:100,
            }
        },
        mounted: function () {
            this.chart = this.createChart();
            // this.sinData = this.createSinData(this.count,10);
            // let d = ['sin'].concat(this.sinData);
            // this.chart.load({columns:[d] });
            // this.timer = setInterval(this.flowSinData,100);
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
    };
</script>