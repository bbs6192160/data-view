<template>
    <div>
        <v-textarea class="mx-6 my-7" :placeholder="srcList" dense outlined :label="config.title||'<标题>'" height="100%"
            no-resize filled :rows="rows">
        </v-textarea>
    </div>
</template>

<script>
    export default {
        props: ["config", "source"],
        mounted: function () {
            
            if (this.config && !this.config.max_rows) {
                this.config.max_rows = 100;
            }
        },
        computed: {
            srcList: function () {
                if (!this.source) {
                    return '<请设置数据源>';
                }
                let res = [];
                for (let sr of this.source) {
                    if(!sr.title && !sr.target){
                        continue;
                    }
                    res.push((sr.title || '名称') + '> ' + (sr.target || '监控对象'));
                }
                return res.join('\n');
            },
            rows: function() {
                if (this.config && this.config.rows) {
                    return this.config.rows;
                }
                return 3;
            }
        }
    };
</script>