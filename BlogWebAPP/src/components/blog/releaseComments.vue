<!--
    vue模板
    @author: hjj
    @date: 2018/11/16
    @desc: 发表评论
-->
<template>
    <div class="release-comment-container">
        <quill-editor
            v-focus="this.$store.state.ModulePopup.commentPopup"
            ref="commentsEditor"
            v-model="content"
            :options="editorOption"
            @change="editorChangeEvent"
            @input="inputEditorEvent">
        </quill-editor>
        <div id="toolbar">
            <b style="float: left">发表评论</b>
            &nbsp;&nbsp;&nbsp;
            <button>
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
        name: 'release-comment',
        mixins: [loadData],
        components: {
            quillEditor},
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
                let url = process.env.ROOT_API + "comments/releaseComment.do",
                    param = {articleID: this.$route.query.id, content: this.comment},
                    success = resp => {
                        this.$toast("发表成功")
                        this.$store.commit("togglePopup", {commentPopup: false})
                        this.$store.commit("reloadComments")
                        this.$store.commit("releaseComments")
                        this.content = ""
                    };
                this.sendPost({url, param, success})
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
<style type="text/css">
    .release-comment-container {
        height: 100%;
        width: 100%;
        padding: 15px;
        box-sizing: border-box;
    }
    .ql-container.ql-snow {
        border: none;
        background-color: #eee;
    }
    .ql-snow.ql-toolbar button {
        padding: 0;
        height: auto;
        font-size: 1.8rem;
    }
    #toolbar {
        border: none;
        border-bottom: 1px solid #eee;
        font-size: 1.7rem;
    }
    .emoji-fade-enter-active, .emoji-fade-leave-active {
        transition: max-height .2s ease-out;
        max-height: 300px;
    }
    .emoji-fade-enter, .emoji-fade-leave-to {
        max-height: 0;
    }
</style>
