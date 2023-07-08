# :heart: Eslint 指导书 > 8.0

![Eslint](https://img.shields.io/badge/-Eslint-purple?logo=eslint&logoColor=white)

✅:此规则默认在 "eslint:recommended"kaiqi;
🔧:此规则报告的一些问题可以通过—— fix 命令行选项自动修复;
💡:此规则报告的一些问题可通过编辑器建议手动修复;

## 🔧 Possible Problems

这些规则与代码中可能的逻辑错误有关。

- **array-callback-return**
用于在数组方法的回调中强制执行 return 语句。如果我们忘记在这些回调中写 return 语句,那可能是一个错误。如果您不想使用 return 或不需要返回的结果,请考虑使用 .forEach 代替。

> "allowImplicit": 默认为`false`。当设置为 `true` 时,允许需要返回值的方法的回调隐式返回未定义的返回语句，该返回语句不包含任何表达式;

```ts
/*eslint array-callback-return: ["error", { allowImplicit: false }]*/
var undefAllTheThings = myArray.map(function(item) {
    return; // Array.prototype.map() expects a return value from arrow function. eslint (array-callback-return)
});
```

> "checkForEach":默认为`false`。当设置为 `true` 时, .forEach 显示返回任何表达式报告一个错误;

```ts
/*eslint array-callback-return: ["error", { checkForEach: true }]*/
var undefAllTheThings = myArray.forEach(function(item) {
    return item; // Array.prototype.forEach() expects no useless return value from arrow function. eslint (array-callback-return)
});
```

- **constructor-super** ✅
派生类的构造函数必须调用 super ()。非派生类的构造函数不能调用 super ()。如果没有观察到这一点,JavaScript 引擎将引发一个运行时错误。该规则检查是否存在有效的 super ()调用。

```ts
/*eslint constructor-super: "error"*/
class B {
    constructor() {
       super() //Parsing error: super() call outside constructor of a subclasseslint
    }
}

class B {
    constructor() {
    }
}

class A extends B {
    constructor() {} // Expected to call 'super()'. eslint (constructor-super)
}
```

- **for-direction**  ✅
具有永远不可能达到的停止条件的 for 循环,例如:强制执行 "for" 循环更新子句,以正确的方向移动计数器。

```ts
/*eslint for-direction: "error"*/
for (var i = 0; i < 10; i--) {
} // The update clause in this loop moves the variable in the wrong direction. eslint (for-direction)
```

- **getter-return**  ✅

- **no-async-promise-executor**  `[boolean]`

- **no-await-in-loop**  `[boolean]`

- **no-class-assign**  `[boolean]`

- **no-compare-neg-zero**  `[boolean]`

- **no-cond-assign**  `[boolean]`

- **no-const-assign**  `[boolean]`

- **no-constant-binary-expression**  `[boolean]`

- **no-constant-condition**  `[boolean]`

- **no-constructor-return**  `[boolean]`

- **no-control-regex**  `[boolean]`

- **no-debugger**  `[boolean]`

- **no-dupe-args**  `[boolean]`

- **no-dupe-class-members**  `[boolean]`

- **no-dupe-else-if**  `[boolean]`

- **no-dupe-keys**  `[boolean]`

- **no-duplicate-case**  `[boolean]`

- **no-duplicate-imports**  `[boolean]`

- **no-empty-character-class**  `[boolean]`

- **no-empty-pattern**  `[boolean]`

- **no-ex-assign**  `[boolean]`

- **no-fallthrough**  `[boolean]`

- **no-func-assign**  `[boolean]`

- **no-import-assign**  `[boolean]`

- **no-inner-declarations**  `[boolean]`

- **no-invalid-regexp**  `[boolean]`

- **no-irregular-whitespace**  `[boolean]`

- **no-loss-of-precision**  `[boolean]`

- **no-misleading-character-class**  `[boolean]`

- **no-new-native-nonconstructor**  `[boolean]`

- **no-new-symbol**  `[boolean]`

- **no-obj-calls**  `[boolean]`

- **no-promise-executor-return**  `[boolean]`

- **no-prototype-builtins**  `[boolean]`

- **no-self-assign**  `[boolean]`

- **no-self-compare**  `[boolean]`

- **no-setter-return**  `[boolean]`

- **no-sparse-arrays**  `[boolean]`

- **no-template-curly-in-string**  `[boolean]`

- **no-this-before-super**  `[boolean]`

- **no-undef**  `[boolean]`

- **no-unexpected-multiline**  `[boolean]`

- **no-unmodified-loop-condition**  `[boolean]`

- **no-unreachable**  `[boolean]`

- **no-unreachable-loop**  `[boolean]`

- **no-unsafe-finally**  `[boolean]`

- **no-unsafe-negation**  `[boolean]`

- **no-unsafe-optional-chaining**  `[boolean]`

- **no-unused-private-class-members**  `[boolean]`

- **no-unused-vars**  `[boolean]`

- **no-use-before-define**  `[boolean]`

- **no-useless-backreference**  `[boolean]`

- **require-atomic-updates**  `[boolean]`

- **use-isnan**  `[boolean]`

- **valid-typeof**  `[boolean]`

## 🔧 Suggestions

- **accessor-pairs**  `[boolean]`
- **arrow-body-style**  `[boolean]`
- **block-scoped-var**  `[boolean]`
- **camelcase**  `[boolean]`
- **capitalized-comments**  `[boolean]`
- **class-methods-use-this**  `[boolean]`
- **complexity**  `[boolean]`
- **consistent-return**  `[boolean]`
- **consistent-this**  `[boolean]`
- **curly**  `[boolean]`
- **default-case**  `[boolean]`
- **default-case-last**  `[boolean]`
- **default-param-last**  `[boolean]`
- **dot-notation**  `[boolean]`
- **eqeqeq**  `[boolean]`
- **func-name-matching**  `[boolean]`
- **func-names**  `[boolean]`
- **func-style**  `[boolean]`
- **grouped-accessor-pairs**  `[boolean]`
- **guard-for-in**  `[boolean]`
- **id-denylist**  `[boolean]`
- **id-length**  `[boolean]`
- **id-match**  `[boolean]`
- **init-declarations**  `[boolean]`
- **logical-assignment-operators**  `[boolean]`
- **max-classes-per-file**  `[boolean]`
- **max-depth**  `[boolean]`
- **max-lines**  `[boolean]`
- **max-lines-per-function**  `[boolean]`
- **max-nested-callbacks**  `[boolean]`
- **max-params**  `[boolean]`
- **max-statements**  `[boolean]`
- **multiline-comment-style**  `[boolean]`
- **new-cap**  `[boolean]`
- **no-alert**  `[boolean]`
- **no-array-constructor**  `[boolean]`
- **no-bitwise**  `[boolean]`
- **no-caller**  `[boolean]`
- **no-case-declarations**  `[boolean]`
- **no-confusing-arrow**  `[boolean]`
- **no-console**  `[boolean]`
- **no-continue**  `[boolean]`
- **no-delete-var**  `[boolean]`
- **no-div-regex**  `[boolean]`
- **no-else-return**  `[boolean]`
- **no-empty**  `[boolean]`
- **no-empty-function**  `[boolean]`
- **no-empty-static-block**  `[boolean]`
- **no-eq-null**  `[boolean]`
- **no-eval**  `[boolean]`
- **no-extend-native**  `[boolean]`
- **no-extra-bind**  `[boolean]`
- **no-extra-boolean-cast**  `[boolean]`
- **no-extra-label**  `[boolean]`
- **no-extra-semi**  `[boolean]`
- **no-floating-decimal**  `[boolean]`
- **no-global-assign**  `[boolean]`
- **no-implicit-coercion**  `[boolean]`
- **no-implicit-globals**  `[boolean]`
- **no-implied-eval**  `[boolean]`
- **no-inline-comments**  `[boolean]`
- **no-invalid-this**  `[boolean]`
- **no-iterator**  `[boolean]`
- **no-label-var**  `[boolean]`
- **no-labels**  `[boolean]`
- **no-lone-blocks**  `[boolean]`
- **no-lonely-if**  `[boolean]`
- **no-loop-func**  `[boolean]`
- **no-magic-numbers**  `[boolean]`
- **no-mixed-operators**  `[boolean]`
- **no-multi-assign**  `[boolean]`
- **no-multi-str**  `[boolean]`
- **no-negated-condition**  `[boolean]`
- **no-nested-ternary**  `[boolean]`
- **no-new**  `[boolean]`
- **no-new-func**  `[boolean]`
- **no-new-object**  `[boolean]`
- **no-new-wrappers**  `[boolean]`
- **no-nonoctal-decimal-escape**  `[boolean]`
- **no-octal**  `[boolean]`
- **no-octal-escape**  `[boolean]`
- **no-param-reassign**  `[boolean]`
- **no-plusplus**  `[boolean]`
- **no-proto**  `[boolean]`
- **no-redeclare**  `[boolean]`
- **no-regex-spaces**  `[boolean]`
- **no-restricted-exports**  `[boolean]`
- **no-restricted-globals**  `[boolean]`
- **no-restricted-imports**  `[boolean]`
- **no-restricted-properties**  `[boolean]`
- **no-restricted-syntax**  `[boolean]`
- **no-return-assign**  `[boolean]`
- **no-return-await**  `[boolean]`
- **no-script-url**  `[boolean]`
- **no-sequences**  `[boolean]`
- **no-shadow**  `[boolean]`
- **no-shadow-restricted-names**  `[boolean]`
- **no-ternary**  `[boolean]`
- **no-throw-literal**  `[boolean]`
- **no-undef-init**  `[boolean]`
- **no-undefined**  `[boolean]`
- **no-underscore-dangle**  `[boolean]`
- **no-unneeded-ternary**  `[boolean]`
- **no-unused-expressions**  `[boolean]`
- **no-unused-labels**  `[boolean]`
- **no-useless-call**  `[boolean]`
- **no-useless-catch**  `[boolean]`
- **no-useless-computed-key**  `[boolean]`
- **no-useless-concat**  `[boolean]`
- **no-useless-constructor**  `[boolean]`
- **no-useless-escape**  `[boolean]`
- **no-useless-rename**  `[boolean]`
- **no-useless-return**  `[boolean]`
- **no-var**  `[boolean]`
- **no-void**  `[boolean]`
- **no-warning-comments**  `[boolean]`
- **no-with**  `[boolean]`
- **object-shorthand**  `[boolean]`
- **one-var**  `[boolean]`
- **one-var-declaration-per-line**  `[boolean]`
- **operator-assignment**  `[boolean]`
- **prefer-arrow-callback**  `[boolean]`
- **prefer-const**  `[boolean]`
- **prefer-destructuring**  `[boolean]`
- **prefer-exponentiation-operator**  `[boolean]`
- **prefer-named-capture-group**  `[boolean]`
- **prefer-numeric-literals**  `[boolean]`
- **prefer-object-has-own**  `[boolean]`
- **prefer-object-spread**  `[boolean]`
- **prefer-promise-reject-errors**  `[boolean]`
- **prefer-regex-literals**  `[boolean]`
- **prefer-rest-params**  `[boolean]`
- **prefer-spread**  `[boolean]`
- **prefer-template**  `[boolean]`
- **quote-props**  `[boolean]`
- **radix**  `[boolean]`
- **require-await**  `[boolean]`
- **require-unicode-regexp**  `[boolean]`
- **require-yield**  `[boolean]`
- **sort-imports**  `[boolean]`
- **sort-keys**  `[boolean]`
- **sort-vars**  `[boolean]`
- **spaced-comment**  `[boolean]`
- **strict**  `[boolean]`
- **symbol-description**  `[boolean]`
- **vars-on-top**  `[boolean]`
- **yoda**  `[boolean]`

## 🔧 Layout & Formatting  

这些规则关心的是代码的外观而不是它的执行方式。

- **array-bracket-newline**  `[boolean]`
- **array-bracket-spacing**  `[boolean]`
- **array-element-newline**  `[boolean]`
- **arrow-parens**  `[boolean]`
- **arrow-spacing**  `[boolean]`
- **block-spacing**  `[boolean]`
- **brace-style**  `[boolean]`
- **comma-dangle**  `[boolean]`
- **comma-spacing**  `[boolean]`
- **comma-style**  `[boolean]`
- **computed-property-spacing**  `[boolean]`
- **dot-location**  `[boolean]`
- **eol-last**  `[boolean]`
- **func-call-spacing**  `[boolean]`
- **function-call-argument-newline**  `[boolean]`
- **function-paren-newline**  `[boolean]`
- **generator-star-spacing**  `[boolean]`
- **implicit-arrow-linebreak**  `[boolean]`
- **indent**  `[boolean]`
- **jsx-quotes**  `[boolean]`
- **key-spacing**  `[boolean]`
- **keyword-spacing**  `[boolean]`
- **line-comment-position**  `[boolean]`
- **linebreak-style**  `[boolean]`
- **lines-around-comment**  `[boolean]`
- **lines-between-class-members**  `[boolean]`
- **max-len**  `[boolean]`
- **max-statements-per-line**  `[boolean]`
- **multiline-ternary**  `[boolean]`
- **new-parens**  `[boolean]`
- **newline-per-chained-call**  `[boolean]`
- **no-extra-parens**  `[boolean]`
- **no-mixed-spaces-and-tabs**  `[boolean]`
- **no-multi-spaces**  `[boolean]`
- **no-multiple-empty-lines**  `[boolean]`
- **no-tabs**  `[boolean]`
- **no-trailing-spaces**  `[boolean]`
- **no-whitespace-before-property**  `[boolean]`
- **nonblock-statement-body-position**  `[boolean]`
- **object-curly-newline**  `[boolean]`
- **object-curly-spacing**  `[boolean]`
- **object-property-newline**  `[boolean]`
- **operator-linebreak**  `[boolean]`
- **padded-blocks**  `[boolean]`
- **padding-line-between-statements**  `[boolean]`
- **quotes**  `[boolean]`
- **rest-spread-spacing**  `[boolean]`
- **semi**  `[boolean]`
- **semi-spacing**  `[boolean]`
- **semi-style**  `[boolean]`
- **space-before-blocks**  `[boolean]`
- **space-before-function-paren**  `[boolean]`
- **space-in-parens**  `[boolean]`
- **space-infix-ops**  `[boolean]`
- **space-unary-ops**  `[boolean]`
- **switch-colon-spacing**  `[boolean]`
- **template-curly-spacing**  `[boolean]`
- **template-tag-spacing**  `[boolean]`
- **unicode-bom**  `[boolean]`
- **wrap-iife**  `[boolean]`
- **wrap-regex**  `[boolean]`
- **yield-star-spacing**  `[boolean]`
