<!--
    vue模板
    @author: hjj
    @date: 2018/11/23
    @desc: 上传文件组件
-->
<template>
    <div class="sy-uploader" :style="{'background-image': 'url(' + value + ')'}">
        <input type="file" class="sy-uploader-input" @change="changeEvent($event)">
    </div>
</template>
<script type="text/javascript">
    import noHeader from '../../../lib/images/noHeader.jpeg';
    export default {
        name: 'uploader',
        props: {
            value: {
                default: noHeader
            }
        },
        methods: {
            changeEvent($event) {
                let el = $event.target, files = el.files, file = files[0], _this = this;
                const reader = new FileReader();
                _this.$emit("change", file);
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    _this.$emit("input", e.target.result);
                };
            }
        }
    }
</script>
<style type="text/css">
    .uploader-head-img {
        position: relative;
        height: 150px;
        width: 150px;
        border-radius: 100px;
        overflow: hidden;
        color: #000;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
    }

    .sy-uploader-input {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        outline: none;
        background-color: transparent;
        filter: alpha(opacity=0);
        -moz-opacity: 0;
        -khtml-opacity: 0;
        opacity: 0;
    }
</style>
