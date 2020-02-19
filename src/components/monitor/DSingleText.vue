<template>
<div>
    <div v-if=" source_.length>0" class="mx-6 my-7">
        <v-text-field  v-for="(item, index) in source_" v-bind:key="index"
            :label="item.title || '<名称>'" :placeholder="item.target || '<请设置监控对象>'"
             readonly outlined>
        </v-text-field> 
    </div>
    <div v-else  class="mx-6 my-7">
       <v-text-field :label="'<标题>'" :placeholder="'<请设置数据源>'"
             readonly outlined>
        </v-text-field>
    </div>
</div>
</template>

<script>
    export default {
        props: ["config", "source"],
        computed:{
            source_:function() {
                let res = [];
                if(!this.source) {
                    return res;
                }
                for(let s of this.source) {
                    if(s.title || s.target) {
                        res.push(s);
                    }
                }
                return res;
            },
        }
    };
</script>