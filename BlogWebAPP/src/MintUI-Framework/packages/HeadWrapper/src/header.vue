<!--
    vue模板
    @author: hjj
    @date: 2018/5/24
    @desc:
-->
<template>
    <table class="sy-app-header" :style="{
        width: width,
        height: height,
        'background-color': backgroundColor,
        color: color,
        'border-bottom': bordered ? '1px solid #ddd' : 'none'
    }">
        <tr>
            <td style="width: 25%">
                <slot name="left"></slot>
            </td>
            <td style="width: 45%">
                <slot></slot>
            </td>
            <td style="width: 30%">
                <slot name="right"></slot>
            </td>
        </tr>
    </table>
</template>
<script type="text/javascript">
    export default {
        name: 'header-wrapper',
        props: {
            width: {
                type: String,
                default: "100%"
            },
            height: {
                type: String,
                default: "40px"
            },
            backgroundColor: {
                type: String,
                default: "#fff"
            },
            color: {
                type: String,
                default: "not specified"
            },
            bordered: {
                type: Boolean,
                default: true
            }
        }
    }
</script>
<style type="text/css">
    .sy-app-head {
        border-collapse: collapse;
        margin: 0 0;
        padding: 0;
    }
    .sy-app-head tr td {
        border: none;
        text-align: center;
        vertical-align: middle;
    }
</style>
