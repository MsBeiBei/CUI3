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
    data: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: [String, Function],
      required: true
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
  computed: {
    buffer() {
      return Math.round(this.keeps / 3);
    },
    length() {
      return this.data.length;
    },
    transform() {
      return {
        transform: `translate3d(0,${this.offset}px,0)`
      };
    },
    height() {
      const { getIndexOffset, length } = this;
      return {
        height: `${getIndexOffset(length - 1)}px`
      };
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.checkRange(0, this.keeps);
    },
    checkRange(start, end) {
      const { length, keeps } = this;
      if (length <= keeps) {
        start = 0;
        end = length;
      } else if (end - start < keeps) {
        start = end - keeps;
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
      const clientSize = this.getClientSize();
      const scrollSize = this.getScrollSize();

      if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
        return;
      }
      this.offset = offset
      const start = this.getScrollOvers();

      this.checkRange(start, this.getEndByStart(start));
    },

    getEndByStart(start) {
      const theoryEnd = start + this.keeps;
      const truelyEnd = Math.min(theoryEnd, this.length);
      return truelyEnd;
    },

    getScrollOvers() {
      const offset = this.offset;

      let low = 0;
      let middle = 0;
      let middleOffset = 0;
      let high = this.length;

      while (low <= high) {
        middle = low + Math.floor((high - low) / 2);

        middleOffset = this.getIndexOffset(middle);

        if (middleOffset === offset) {
          return middle;
        } else if (middleOffset < offset) {
          low = middle + 1;
        } else if (middleOffset > offset) {
          high = middle - 1;
        }
      }

      return low > 0 ? --low : 0;
    },
    getIndexOffset(givenIndex) {
      if (!givenIndex) {
        return 0;
      }

      const { rowKey } = this;

      let offset = 0;

      for (let index = 0; index < givenIndex; index++) {
        const item = this.data[index];
        const key = typeof rowKey === "function" ? rowKey(item) : item[rowKey];
        const indexSize = this.sizes.get(key);
        offset +=
          typeof indexSize === "number" ? indexSize : this.estimatedSize;
      }

      return offset;
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
      onResized,
      onScroll,
      transform,
      height,
      rowKey
    } = this;

    const { start, end } = this.range;

    const data = this.data.slice(start, end);

    return (
      <RootTag class="z-list" ref="root" onScroll={onScroll}>
        <div class="z-list__scroll" ref="scroll" style={height}></div>

        <BodyTag class="z-list__body" ref="body" style={transform}>
          {data.map((item, index) => {
            const key =
              typeof rowKey === "function" ? rowKey(item) : item[rowKey];

            return (
              <Item key={key} onResized={size => onResized(key, size)}>
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
  }
}
</style>