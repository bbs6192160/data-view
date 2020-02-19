<template>
    <div :id="id" v-bind:style="{margin: '15px', width:size.width||300, height:size.height||100}">
    </div>
</template>

<script>
    import c3 from 'c3';
    export default {
        props: ["config", "source", "size", "id", "isDesign", "redraw"],
        watch: {
            size: function (v) {
                if (!this.chart) {
                    return;
                }
                this.chart.resize({
                    width: v.width - 30,
                    height: v.height - 30
                });
            },
        },
        methods: {
            reDraw: function() {
                this.chart = this.createChart();
            },
            createColumns: function (v1, v2, v3) {
                let res = [];
                let i = 0;
                if (this.source) {
                    for (let s of this.source) {
                        if (s.target) {
                            let ii = i++ % 3;
                            let v = v1;
                            if (ii === 1) {
                                v = v2;
                            } else if (ii == 2) {
                                v = v3;
                            }
                            res.push([s.title || s.target, v])
                        }
                    }
                }
                if (res.length === 0) {
                    res.push(['<名称>', v1])
                }
                return res;
            },
            createChart: function () {
                let min = this.config.min || 0;
                let max = this.config.max || 100;
                let wmin = this.config.min_warnning || min;
                let wmax = this.config.max_warnning || max;
                let v = (Number(max) + Number(min)) / 2;
                let res = c3.generate({
                    bindto: '#' + this.id,
                    data: {
                        columns: this.createColumns(v, wmin-0.1, wmax),
                        type: 'gauge',
                    },
                    gauge: {
                        label: {
                            format: function (value) {
                                return value;
                            },
                        },
                        expand: true,
                        min: min,
                        max: max,
                    },
                    color: {
                        pattern: ['#FFFF00', '#60B044', '#FF0000'],
                        threshold: {
                            values: [wmin, wmax]
                        }
                    }
                });
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