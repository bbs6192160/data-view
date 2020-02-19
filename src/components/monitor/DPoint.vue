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
            // config: {
            //     handler: function () {
            //         this.chart = this.createChart();
            //     },
            //     deep: true,
            // },
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

            createColumns(xs) {
                let res = [];
                if(this.source) {
                    let idx = 0;
                    for(let s of this.source) {
                        if(s.target) {
                            let t = s.title || s.target;
                            let dy = [t].concat(this.createData(0, 50, 1));
                            res.push(dy);
                            let dx = ['dx'+idx++];
                            for(let i=0; i<50; i++) {
                                dx.push(i);
                            }
                            res.push(dx);
                            xs[t] = dx[0];
                        }
                    }
                }
                if(res.length===0) {
                    let t = '<名称>';
                    let dy = [t].concat(this.createData(0, 50, 1));
                    res.push(dy);
                    let dx = ['dx'];
                    for(let i=0; i<50; i++) {
                        dx.push(i);
                    }
                    res.push(dx);
                    xs[t] = dx[0];
                }
                return res;
            },

            createChart: function(){
                let xs = {};
                let cols = this.createColumns(xs);
                let op = {
                    bindto: '#' + this.id,
                    data: {
                        xs: xs,
                        columns: cols,
                        type: 'scatter'
                    },
                    axis: {
                        x: {
                            tick: {
                                format: function(v) {
                                    return Math.floor(v);
                                }
                            }
                        }
                    }
                };
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