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
            // source: {
            //     handler: function () {
            //         this.chart = this.createChart();
            //     },
            //     deep: true,
            // }
        },
        methods: {
            reDraw: function() {
                this.chart = this.createChart();
            },
            createData(min, max) {
                let step = 1;
                let dd = Math.random() * (max-min);
                dd = Math.floor(dd)
                let res = [];
                for(let i=0; i<50; i++) {
                    let rr = Math.random() * 10;
                    if(Math.floor(rr)%2===0) {
                        res.push(dd);
                        continue;
                    }
                    if(dd + 1>max) {
                        step = -1;
                    }
                    if(step<0 && dd-1<min) {
                        step = 1;
                    }
                    dd = dd + step;
                    
                    rr = Math.random() * 10;
                    if(Math.floor(rr)%2===0) {
                        res.push(dd+1);
                    } else {
                        res.push(dd-1);
                    }
                }
                return res;
            },

            createColumns() {
                let res = [];
                if(this.source) {
                    for(let s of this.source) {
                        if(s.target && s.title) {
                            let d = [s.title].concat(this.createData(0, 5));
                            res.push(d);
                        }
                    }
                }
                if(res.length===0) {
                    let d = ['<名称>'].concat(this.createData(0, 3));
                    res.push(d);
                }
                return res;
            },
            createChart: function(){
                let cols = this.createColumns()
                let col = ['__time__'];
                for(let i=0; i<1000; i=i+20) {
                    col.push(i);
                }
                cols.push(col)
                let op = {
                    bindto: '#' + this.id,
                    data: {
                        x: '__time__',
                        columns: cols,
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            localtime: true,
                        }
                    }
                };

                let types = {};
                for(let col of op.data.columns) {
                    types[col[0]] = 'step'
                }
                op.data.types = types;

                let res = c3.generate(op);
                if(this.size) {
                    res.resize({width:this.size.width-30, height:this.size.height-30});
                }
                return res;
            }
        },
        mounted: function () {
            this.chart = this.createChart();
        }
    };
</script>