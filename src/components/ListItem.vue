<template>
    <v-list-item :to="m_editing ? null :{ name: 'Viewer', params:{projId: id},query: { name: title }}"
        @mouseover="m_hoting=true" @mouseleave="m_hoting=false">
        <v-list-item-icon>
            <v-icon>view_list</v-icon>
        </v-list-item-icon>
        <v-text-field autofocus class="pt-0 mt-0" hide-details v-if="m_editing" v-model="m_title_editing" @mousedown.stop @click.stop
            @keydown="keydown">
        </v-text-field>
        <v-list-item-title v-else>{{m_title}}</v-list-item-title>
        <v-spacer></v-spacer>
        <v-btn icon small target="_blank" v-if="!m_editing && m_hoting" @click.prevent="onEditing" title="编辑">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-btn icon small target="_blank" v-if="!m_editing && m_hoting" @click.prevent="onDelItem" title="删除">
            <v-icon>delete</v-icon>
        </v-btn>
        <v-btn icon small target="_blank" v-if="m_editing" @click.prevent="onEndEdit" title="完成">
            <v-icon>done</v-icon>
        </v-btn>
        <v-btn icon small target="_blank" v-if="m_editing" @click.prevent="onCancelEdit" title="取消">
            <v-icon>close</v-icon>
        </v-btn>
    </v-list-item>
</template>

<script>
    export default {
        props: ["title", "id"],
        inject: ["delItem"],
        data: function () {
            return {
                m_title: this.title,
                m_title_editing: this.title,
                m_editing: false,
                m_hoting: false
            }
        },
        methods: {
            onDelItem: function () {
                this.delItem(this.id);
            },
            onEditing: function () {
                this.m_editing = true;
            },
            onCancelEdit: function () {
                this.m_editing = false;
                this.m_title_editing = this.title;
            },
            keydown: function (event) {
                if (event.key === "Enter") {
                    this.onEndEdit();
                } else if (event.key === "Escape") {
                    this.onCancelEdit();
                }
            },
            onEndEdit: function () {
                let self = this;
                this.m_title_editing = this.m_title_editing.trim();
                self.m_title = self.m_title_editing;
                self.m_editing = false;
                this.$emit('change',this.id,this.m_title);
                // this.$store.dispatch('renameProj', {
                //         projId: this.id,
                //         newName: this.m_title_editing
                //     })
                //     .then((data) => {
                //         if (data && data.id) {
                //             self.m_title = self.m_title_editing;
                //             self.m_editing = false;
                //         }
                //     });
            }
        }
    }
</script>