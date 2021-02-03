export default {
  data() {
    return {
      tableMaxHeight: 1000
    };
  },

  mounted() {
    window.addEventListener("resize", this.relayoutTable);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.relayoutTable);
  },

  methods: {
    relayoutTable() {
      this.$nextTick(() => {
        try {
          const el = document.querySelector(".el-table__body-wrapper");
          const rect = el.getBoundingClientRect();
          const height = window.innerHeight;
          this.tableMaxHeight = +height - rect.top;
          this.$refs.table.doLayout();
        } catch (e) {
          console.log(e);
        }
      });
    }
  }
};
