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
    }
  },
  data() {
    return {
      range: Object.create(null),
      sizes: new Map(),
      offset: 0,
      estimatedSize: 0
    };
  },

  created() {
    this.init();
  },
  mounted() {},

  methods: {
    init() {
      this.checkRange(0, this.keeps);
    },

    checkRange(start, end) {
      const total = this.dataSource.length;

      if (total <= this.keeps) {
        start = 0;
        end = total;
      } else if (end - start < this.keeps - 1) {
        start = end - this.keeps + 1;
      }

      if (this.range.start !== start) {
        this.updateRange(start, end);
      }
    },

    updateRange(start, end) {
      this.range.start = start;
      this.range.end = end;
    },

    onResized(key, size) {
      this.sizes.set(key, size);
      const rangeTotalSize = [...this.sizes.values()].reduce(
        (acc, val) => acc + val,
        0
      );
      this.estimatedSize = Math.round(rangeTotalSize / this.sizes.size);
    },

    onScroll() {
      const offset = this.getOffset();

      const overs = this.getScrollOvers();
    },
    getLastIndex() {
      return this.dataSource.length - 1;
    },
    getEndByStart(start) {
      const theoryEnd = start + this.param.keeps - 1;
      const truelyEnd = Math.min(theoryEnd, this.getLastIndex());
      return truelyEnd;
    },
    getOffset() {
      const el = this.$refs.root;
      return el ? Math.ceil(el.scrollTop) : 0;
    },

    getScrollOvers() {
      const offset = this.offset;

      let low = 0;
      let middle = 0;
      let high = this.dataSource.length;

      while (low <= high) {}

      return low > 0 ? --low : 0;
    },
    getIndexOffset(givenIndex) {
      if (!givenIndex) {
        return 0;
      }

      const total = this.dataSource.length;

      let offset = [...this.sizes.values()].reduce((acc, val) => acc + val, 0);

      return offset;
    }
  },
  render() {
    const {
      rootTag: RootTag,
      bodyTag: BodyTag,
      dataKey,
      onResized,
      onScroll
    } = this;

    const { start, end } = this.range;

    const dataSource = this.dataSource.slice(start, end);

    return (
      <RootTag class="z-list" ref="root" onScroll={onScroll}>
        <div class="z-list__scroll" ref="scroll"></div>

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
  position: relative;
  overflow: auto;
  &__body {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: translate3d(0, 0, 0);
  }
}
</style>