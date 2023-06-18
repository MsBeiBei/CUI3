<script>
import Item from "./item.vue";

export default {
  name: "ZList",
  props: {
    rootTag: {
      type: String,
      default: "div"
    },
    bodyTag: {
      type: String,
      default: "div"
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    dataKey: {
      type: [String, Function],
      default: "key"
    },
    keeps: {
      type: Number,
      default: 30
    },
    estimatedSize: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      range: Object.create(null),
      sizes: new Map(),
      offset: 0
    };
  },
  watch: {
    offset(newVal, oldVal) {
      const direction = newVal < oldVal || newVal === 0 ? "FRONT" : "BEHIND";

      if (direction === "FRONT") {
      } else if (direction === "BEHIND") {
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.updateRange(0, this.keeps);
    },
    onScroll(event) {
      const offset = this.getOffset();
      const clientSize = this.getClientSize();
      const scrollSize = this.getScrollSize();

      if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
        return;
      }

      this.offset = offset;
    },
    getScrollOvers() {
      const offset = this.offset;

      if (offset <= 0) {
        return 0;
      }
    },
    onResized(key, size) {
      this.sizes.set(key, size);
    },
    updateRange(start, end) {
      this.range.start = start;
      this.range.end = end;
    },
    getOffset() {
      const el = this.$refs.root;
      return el ? Math.ceil(el.scrollTop) : 0;
    },
    getClientSize() {
      const el = this.$refs.root;
      return el ? Math.ceil(el.clientHeight) : 0;
    },
    getScrollSize() {
      const el = this.$refs.root;
      return el ? Math.ceil(el.scrollHeight) : 0;
    }
  },
  render() {
    const {
      rootTag: RootTag,
      bodyTag: BodyTag,
      dataKey,
      onScroll,
      onResized
    } = this;

    const { start, end } = this.range;

    const dataSource = this.dataSource.slice(start, end);

    return (
      <RootTag class="z-list" ref="root" onScroll={onScroll}>
        <BodyTag class="z-list__body" ref="body">
          {dataSource.map((item, index) => {
            const key =
              typeof dataKey === "function" ? dataKey(item) : item[dataKey];

            return (
              <Item key={key} onResized={onResized}>
                {this.$scopedSlots.default
                  ? this.$scopedSlots.default(item, index, key)
                  : null}
              </Item>
            );
          })}
        </BodyTag>
      </RootTag>
    );
  }
};
</script>

<style lang="scss" scoped>
.z-list {
  height: 100%;
  overflow: auto;
  position: relative;
}
</style>