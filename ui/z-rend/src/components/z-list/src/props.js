export const listProps = {
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
    type: [Function, String],
    required: true
  },
  keeps: {
    type: Number,
    default: 30
  },
  start: {
    type: Number,
    default: 0
  },
  estimatedSize: {
    type: Number,
    default: 50
  }
}