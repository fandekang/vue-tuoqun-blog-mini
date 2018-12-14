
<template>
    <!-- <h1>这是我的博文列表</h1> -->
  <load-more-cell
    :dataUrl="dataUrl"
    :auto-fill="false"
    :top-method="loadTop"
    :bottom-method="loadBottom"
    :bottom-all-loaded.sync="allLoaded"
    ref="loadMore"
  >
    <template slot-scope="scope">
      <div
        @click="cellClick(item, index)"
        v-for="(item, index) in scope.source"
        :key="item.articleid"
      >
        <mt-cell
          :to="{path: '/article',query: {id: item.articleid}}"
          isLink
          :title="item.title"
        >
          <img
            slot="icon"
            v-if="item.cover"
            :src="item.cover"
            height="60px"
            width="80px"
          >
          <img
            v-else
            slot="icon"
            src="../../assets/images/noImg.png"
            height="60px"
            width="80px"
          >
          <div class="mt-footer-center">
            {{item.author}}&nbsp;&nbsp;&nbsp;
            {{item.arttype}}&nbsp;&nbsp;&nbsp;
            <i class="fa fa-commenting-o">&nbsp;{{item.commentcount}}&nbsp;</i>
            <i class="fa fa-eye">&nbsp;{{item.readcount}}&nbsp;</i>
          </div>
        </mt-cell>
      </div>
    </template>
  </load-more-cell>
</template>
<script type="text/javascript">
import loadData from '../../assets/js/loadData';
export default {
  name: "type-list",
  mixins: [loadData],
  data() {
    return {
    //   dataUrl: this.$store.state.ModuleComment.typeListUrl,
      allLoaded: false,
      pager: {
        curPage: 1,
        pageSize: 5
      },
      currentIndex: -1
    };
  },
  watch: {
    comments(newVal) {
      if (this.currentIndex !== -1) {
        this.$refs.loadMore.source[this.currentIndex].commentcount = newVal;
      }
    }
    // ,
    // dataUrl() {
    //     if(this.$store.state.ModulePopup.typeListUrl) {
    //          this.$store.commit('reloadTypeListUrl')
    //          this.$store.commit()
    //     }
    // }
  },
  computed: {
    comments() {
      return this.$store.state.ModuleArticle.comments;
    },
    dataUrl: {
        get() {
            return this.$store.state.ModuleComment.typeListUrl
        }
        // ,
        // set(val) {
        //     this.$store.commit('reloadTypeListUrl')
        // }
    }
  },
  methods: {
    loadTop() {
      this.$refs.loadMore.onTopLoaded();
    },
    loadBottom() {
      this.$refs.loadMore.onBottomLoaded();
    },
    cellClick(cell, index) {
      this.currentIndex = index;
      this.$store.commit("togglePopup", {
        articlePopup: true,
        title: "阅读文章",
        commentFooter: true
      });
      this.$store.commit("optArticle", { comments: cell.commentcount });
      cell.readcount = cell.readcount + 1;
    }
  }
};
</script>
