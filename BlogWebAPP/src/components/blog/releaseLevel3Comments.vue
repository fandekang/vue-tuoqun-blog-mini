<template>
    <div class="release-comment-container">
        <quill-editor
            v-focus="this.$store.state.ModulePopup.commentLevel3Popup"
            ref="commentsEditor"
            v-model="content"
            :options="editorOption"
            @change="editorChangeEvent"
            @input="inputEditorEvent">
        </quill-editor>
        <div id="toolbar">
            <b style="float: left">发表评论</b>
            &nbsp;&nbsp;&nbsp;
            <button class="emoji-btn">
                <i class="fa fa-smile-o" @click="showEmoji = !showEmoji"></i>
            </button>
        </div>
        <br/>
        <mt-button :disabled="sendEnable" size="small" type="primary" @click="releaseEvent">发送</mt-button>
        <br/>
        <transition name="emoji-fade">
            <angus-vue-emoji v-if="showEmoji"
                @select="selectEmoji">
            </angus-vue-emoji>
        </transition>
    </div>
</template>
<script type="text/javascript">
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import { quillEditor } from 'vue-quill-editor';
    import loadData from '../../assets/js/loadData';

    export default {
        name: 'releaseLevel3Comment',
        mixins: [loadData],
        components: {
            quillEditor
        },
        data() {
            return {
                content: '',
                range: 0,
                isInsertEmoji: false,
                showEmoji: false,
                sendEnable: true,
                comment: '',
                editorOption: {
                    placeholder: "优质评论将会被优先展示",
                    modules: {
                        toolbar: '#toolbar'
                    }
                }
            }
        },
        mounted() {
            this.$nextTick(function() {
                let editor = this.$refs.commentsEditor.$refs.editor.querySelector(".ql-editor");
                editor.addEventListener('focus', this.focusEditorEvent, false);
            });
        },
        methods: {
            editorChangeEvent(p) {
                if (!this.isInsertEmoji) {
                    let _this = this
                    setTimeout(function() {
                        _this.range = p.quill.getSelection().index;
                    }, 200)
                    this.comment = this.content;
                }
                else {
                    this.isInsertEmoji = false;
                }
                // console.log(this.comment)
            },
            selectEmoji(code) {
                // 插入表情
                // let reg = /^<p>|<\/p>$/;
                let reg = /<p(([\s\S])*?)>|<\/p>/g;
                this.content = this.content.replace(reg, '') + this.$AngusVueEmoji(code);
                this.comment = this.comment.replace(reg, '') + code;

                this.isInsertEmoji = true;
                let quill = this.$refs.commentsEditor.quill, _this = this;
                setTimeout(function() {
                    quill.setSelection(++_this.range);
                }, 200)
            },
            inputEditorEvent(val) {
                val ? this.sendEnable = false : this.sendEnable = true;
            },
            focusEditorEvent() {
                this.showEmoji = false;
                document.body.scrollTop = document.body.scrollHeight;
            },
            releaseEvent() {
                let url = process.env.ROOT_API + 'comments/receiveSubComments.do',
                    commentsID = this.$store.state.ModuleLevel3Comment.fatherCommentId,
                    subCommentsID = this.$store.state.ModuleLevel3Comment.commentId,
                    param = {articleID: this.$route.query.id, content: this.comment, commentsID, subCommentsID},
                    success = resp => {
                        this.$toast("发表成功");
                        this.$store.commit("togglePopup", {commentLevel3Popup: false});
                        this.$store.commit('reloadSubComments')
                        this.content = "";
                    },
                    error = () => {
                        this.$toast('发表失败！')
                    };
                this.sendPost({url, param, success, error});
            }
        },
        directives: {
            focus: {
                update(el, binding, vm) {
                    if (binding.value && !vm.context.showEmoji) {
                        el.querySelector(".ql-editor").focus();
                    }
                    if (!binding.value) {
                        vm.context.showEmoji = false;
                    }
                }
            }
        }
    }
</script>
<style scoped>
.emoji-btn {
    width: 28px;
    padding: 0;
    height: auto;
    font-size: 1.8rem;
    background: none;
    border: none;
    cursor: pointer;
    display: inline-block;
}
</style>
