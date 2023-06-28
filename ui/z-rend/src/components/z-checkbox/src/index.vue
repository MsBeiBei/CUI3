<template>
  <!-- <span
    :class="['z-checkbox',{
    'is-disabled':disabled,
    'is-checked':checked,
    'is-focus':focus,
    [`z-checkbox--${size}`]:size && size !== 'default'
  }]"
  >
  </span>-->
  <input :name="name" type="checkbox" value="222" style="box-sizing:border-box" class="z-checkbox-input" />
</template>

<script>
export default {
  name: "ZCheckbox",
  props: {
    value: [String, Number, Boolean],
    size: {
      //'large' | 'default' | 'small'
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number]
  },
  data() {
    return {
      focus: false
    };
  },
  methods: {
    onChange() {
      if (this.disabled) return;
      this.$emit("change");
    }
  }
};
</script>

<style lang="scss" scoped>
.z-checkbox-input{
  background: red;
}
// .z-checkbox {
//   --disabled-color: #f5f7fa;
//   --disabled-border-color: #dcdfe6;

//   display: inline-flex;
//   height: 15px;
//   width: 15px;
//   margin-right: 10px;
//   position: relative;
//   box-sizing: border-box;
//   cursor: pointer;

//   &-input {
//     position: absolute;
//     left: 0;
//     z-index: 2;
//     opacity: 0;
//     filter: alpha(opacity=0);
//     top: 0;
//     bottom: 0;
//     right: 0;
//     &:focus {
//       background-color: red;
//     }
//   }

//   &::after {
//     transition-duration: 0.2s;
//     border: 2px solid #888;
//     content: "";
//     display: inline-block;
//     height: 100%;
//     width: 100%;
//     box-sizing: border-box;
//   }

//   &.is-checked {
//     &::after {
//       transform: rotate(45deg) translate(1px, -4px);
//       border-color: #512da8;
//       border-left-color: rgba(0, 0, 0, 0);
//       border-top-color: rgba(0, 0, 0, 0);
//       width: 50%;
//     }
//   }

//   &.is-disabled {
//     cursor: not-allowed;
//     background-color: var(--disabled-color);

//     &::after {
//       border-color: var(--disabled-border-color);
//     }
//   }

//   &.is-focus {
//   }
// }
</style>