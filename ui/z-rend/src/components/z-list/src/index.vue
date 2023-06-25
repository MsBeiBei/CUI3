<script>
import { listProps } from "./props";
import Item from "./item.vue";

const FRONT = "front";
const BEHIND = "behind";

export default {
  name: "ZList",
  props: listProps,
  data() {
    return {
      range: Object.create(null),
      sizes: new Map(),
      offset: 0,
      firstRangeAverageSize: 0
    };
  },
  computed: {
    buffer() {
      return Math.round(this.keeps / 3);
    },
    rowKeys() {
      const { rowKey } = this;
      return this.data.map(item =>
        typeof rowKey === "function" ? rowKey(item) : item[rowKey]
      );
    },
    scrollStyle() {
      const total = this.data.length;
      const height = this.getIndexOffset(total);
      return {
        minHeight: `${height}px`
      };
    },
    bodyStyle() {
      const { start } = this.range;

      const offset = this.getIndexOffset(start);
      return {
        transform: `translate3d(0,${offset}px,0)`
      };
    }
  },
  created() {
    this.init();

    this.$on("resized", this.onResized);
  },
  mounted() {
    if (this.start) {
    }
  },

  methods: {
    init() {
      this.checkRange(0, this.keeps);
    },
    onScroll(evt) {
      const offset = Math.ceil(evt.target.scrollTop) || 0;
      const clientSize = Math.ceil(evt.target.clientHeight) || 0;
      const scrollSize = Math.ceil(evt.target.scrollHeight) || 0;

      if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
        return;
      }

      this.direction = offset < this.offset || offset === 0 ? FRONT : BEHIND;
      this.offset = offset;
      if (this.direction === FRONT) {
        this.handleFront();
      } else if (this.direction === BEHIND) {
        this.handleBehind();
      }
    },
    handleFront() {
      const overs = this.getScrollOvers();
      if (overs > this.range.start) {
        return;
      }

      const start = Math.max(overs - this.buffer, 0);
      this.checkRange(start, this.getEndByStart(start));
    },
    handleBehind() {
      const overs = this.getScrollOvers();

      if (overs < this.range.start + this.buffer) {
        return;
      }

      this.checkRange(overs, this.getEndByStart(overs));
    },
    getEndByStart(start) {
      const lastIndex = this.data.length;
      const theoryEnd = start + this.keeps;
      const truelyEnd = Math.min(theoryEnd, lastIndex);
      return truelyEnd;
    },

    onResized(key, size) {
      this.sizes.set(key, size);

      if (this.sizes.size < Math.min(this.keeps, this.rowKeys.length)) {
        const firstRangeTotalSize = [...this.sizes.values()].reduce(
          (acc, val) => (acc += val),
          0
        );
        this.firstRangeAverageSize = Math.round(
          firstRangeTotalSize / this.sizes.size
        );
      }
    },
    checkRange(start, end) {
      const total = this.data.length;
      if (total <= this.keeps) {
        start = 0;
        end = total;
      } else if (end - start < this.keeps) {
        start = end - this.keeps;
      }

      if (this.range.start !== start) {
        this.updateRange(start, end);
      }
    },
    updateRange(start, end) {
      this.$set(this.range, "start", start);
      this.$set(this.range, "end", end);
    },
    getScrollOvers() {
      const offset = this.offset;

      if (offset <= 0) {
        return 0;
      }

      let low = 0;
      let middle = 0;
      let middleOffset = 0;
      let high = this.rowKeys.length;

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
      let offset = 0;

      for (let index = 0; index < givenIndex; index++) {
        const indexSize = this.sizes.get(this.rowKeys[index]);
        offset +=
          typeof indexSize === "number" ? indexSize : this.getEstimatedSize();
      }

      return offset;
    },
    getEstimatedSize() {
      return this.firstRangeAverageSize || this.estimatedSize;
    }
  },
  render() {
    const {
      rootTag: RootTag,
      bodyTag: BodyTag,
      rowKey,
      onScroll,
      scrollStyle,
      bodyStyle
    } = this;

    const { start, end } = this.range;
    const data = this.data.slice(start, end);

    return (
      <RootTag class="z-list" ref="root" onScroll={onScroll}>
        <div class="z-list__scroll" ref="scroll" style={scrollStyle}></div>

        <BodyTag class="z-list__body" ref="body" style={bodyStyle}>
          {data.map((item, index) => {
            const key =
              typeof rowKey === "function" ? rowKey(item) : item[rowKey];

            return (
              <Item key={key} rowKey={String(key)} data-key={key}>
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
  position: relative;
  overflow-y: auto;

  &__body {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  * {
    box-sizing: border-box;
  }
}
</style>