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
    dataKey: {
      type: [String, Function],
      default: "key"
    },
    keeps: {
      type: Number,
      default: 30
    },
    buffer: Number
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
    _buffer() {
      return this.buffer || Math.round(this.keeps / 3);
    },
    _data() {
      const { start, end } = this.range;
      return this.data.slice(start, end);
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
      const clientSize = this.getClientSize();
      const scrollSize = this.getScrollSize();

      if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
        return;
      }

      const direction =
        offset < this.offset || offset === 0 ? "FRONT" : "BEHIND";
      this.offset = offset;

      if (direction === "FRONT") {
        this.scrollToFront();
      } else if (direction === "BEHIND") {
        this.scrollToBehind();
      }

      this.$forceUpdate();
    },
    scrollToFront() {
      const overs = this.getScrollOvers();
      if (overs > this.range.start) {
        return;
      }
      const start = Math.max(overs - this._buffer, 0);
      this.checkRange(start, this.getEndByStart(start));
    },
    scrollToBehind() {
      const overs = this.getScrollOvers();
      if (overs < this.range.start + this._buffer) {
        return;
      }

      this.checkRange(overs, this.getEndByStart(overs));
    },
    getLastIndex() {
      return this.dataSource.length - 1;
    },
    getEndByStart(start) {
      const theoryEnd = start + this.keeps;
      const truelyEnd = Math.min(theoryEnd, this.getLastIndex());
      return truelyEnd;
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
    },
    getScrollOvers() {
      const offset = this.offset;

      let low = 0;
      let middle = 0;
      let middleOffset = 0;
      let high = this.dataSource.length;

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
      const { getUniqueKey, dataSource, estimatedSize, sizes } = this;

      let offset = 0;
      let indexSize = 0;

      for (let index = 0; index < givenIndex; index++) {
        const key = getUniqueKey(dataSource[index]);

        indexSize = sizes.get(key);
        offset =
          offset + (typeof indexSize === "number" ? indexSize : estimatedSize);
      }

      return offset;
    },
    getUniqueKey(item) {
      return typeof this.dataKey === "function"
        ? this.dataKey(item)
        : item[this.dataKey];
    }
  },
  render() {
    const {
      rootTag: RootTag,
      bodyTag: BodyTag,
      onResized,
      onScroll,
      getUniqueKey
    } = this;

    const { start, end } = this.range;

    const dataSource = this.dataSource.slice(start, end);

    return (
      <RootTag class="z-list" ref="root" onScroll={onScroll}>
        <div class="z-list__scroll" ref="scroll"></div>

        <BodyTag class="z-list__body" ref="body">
          {dataSource.map((item, index) => {
            const key = getUniqueKey(item);

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