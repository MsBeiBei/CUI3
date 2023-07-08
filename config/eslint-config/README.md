# :heart: Eslint 指导书 > 8.0

![Eslint](https://img.shields.io/badge/-Eslint-purple?logo=eslint&logoColor=white)

✅:此规则默认在 "eslint:recommended"；  
🔧:此规则报告的一些问题可以通过—— fix 命令行选项自动修复；  
💡:此规则报告的一些问题可通过编辑器建议手动修复；

## 🔧 Possible Problems

这些规则与代码中可能的逻辑错误有关。

- **array-callback-return**
用于在数组方法的回调中强制执行 return 语句。如果我们忘记在这些回调中写 return 语句，那可能是一个错误。如果您不想使用 return 或不需要返回的结果，请考虑使用 .forEach 代替。

> "allowImplicit": 默认为`false`。当设置为 `true` 时，允许需要返回值的方法的回调隐式返回未定义的返回语句，该返回语句不包含任何表达式；

```ts
/*eslint array-callback-return: ["error", { allowImplicit: false }]*/
var undefAllTheThings = myArray.map(function(item) {
    return; // Array.prototype.map() expects a return value from arrow function. eslint (array-callback-return)
});
```

> "checkForEach":默认为`false`。当设置为 `true` 时， .forEach 显示返回任何表达式报告一个错误；

```ts
/*eslint array-callback-return: ["error", { checkForEach: true }]*/
var undefAllTheThings = myArray.forEach(function(item) {
    return item; // Array.prototype.forEach() expects no useless return value from arrow function. eslint (array-callback-return)
});
```

- **constructor-super** ✅
派生类的构造函数必须调用 super ()。非派生类的构造函数不能调用 super ()。如果没有观察到这一点，JavaScript 引擎将引发一个运行时错误。该规则检查是否存在有效的 super ()调用。

```ts
/*eslint constructor-super: "error"*/
class B {
    constructor() {
       super() //Parsing error: super() call outside constructor of a subclasseslint
    }
};

class B {
    constructor() {
    }
};

class A extends B {
    constructor() {} // Expected to call 'super()'. eslint (constructor-super)
};
```

- **for-direction**  ✅
具有永远不可能达到的停止条件的 for 循环,例如:强制执行 "for" 循环更新子句,以正确的方向移动计数器。

```ts
/*eslint for-direction: "error"*/
for (var i = 0; i < 10; i--) {
}; // The update clause in this loop moves the variable in the wrong direction. eslint (for-direction)
```

- **getter-return**  ✅
强制在getter属性中出现一个return语句。每个getter都期望有返回值。

```ts
/*eslint getter-return: "error"*/
p = {
    get name(){
        // Expected to return a value in getter 'name'. eslint (getter-return)
    }
};

Object.defineProperty(p, "age", {
    get: function (){
       // Expected to return a value in getter 'name'. eslint (getter-return)
    }
});

class P{
    get name(){
        // Expected to return a value in getter 'name'. eslint (getter-return)
    }
}
```

> "allowImplicit":默认为`false`。当设置为 `true` 时，允许 return 语句隐式返回未定义的内容。

```ts
/*eslint getter-return: ["error", { allowImplicit: true }]*/
p = {
    get name(){
        return; // return undefined implicitly.
    }
};
```

- **no-async-promise-executor**  ✅
此规则不允许将 async 函数传递给 new Promise 构造函数。如果异步函数抛出错误，错误将会丢失而不会被新构造的 Promise 拒绝。如果 await 在构造函数内部使用，包装 Promise 是不必要的，可以将其删除。

```ts
/*eslint no-async-promise-executor: "error"*/
new Promise(async (resolve, reject) => {
    // Promise executor functions should not be async. eslint (no-async-promise-executor)
});
```

- **no-await-in-loop**
禁止将 await 写在循环里，因为这样就无法同时发送多个异步请求了。

```ts
/*eslint no-await-in-loop: "error"*/
async function foo(things) {
    const results = [];
    for (const thing of things) {
        // Unexpected `await` inside a loop. eslint (no-await-in-loop)
      results.push(await bar(thing));
    }
    return baz(results);
  }
```

- **no-class-assign**  ✅
禁止对定义过的 class 重新赋值。

```ts
/*eslint no-class-assign: "error"*/
/*eslint-env es6*/

class A { }
A = 0; // 'A' is a class. eslint (no-class-assign)
```

- **no-compare-neg-zero**  ✅
禁止与负零进行比较。

```ts
/*eslint no-compare-neg-zero: "error"*/
if (x === -0) { // Do not use the '===' operator to compare against -0. eslint (no-compare-neg-zero)
    // doSomething()...
}
```

- **no-cond-assign** ✅
不允许在条件表达式中使用赋值运算符。

> "except-parens":默认值，
> "always":

- **no-const-assign** ✅
禁止对使用 const 定义的常量重新赋值。

```ts
/*eslint no-const-assign: "error"*/
const a = 0;
a = 1; // 'a' is constant. eslint (no-const-assign)
```

- **no-constant-binary-expression**

- **no-constant-condition** ✅
禁止将常量作为分支条件判断中的测试表达式，但允许作为循环条件判断中的测试表达式。

- **no-constructor-return**  `[boolean]`

- **no-control-regex**  `[boolean]`

- **no-debugger**  `[boolean]`

- **no-dupe-args**  ✅  
这条规则不允许在函数声明或表达式中出现重复的参数名。它不适用于箭头函数或类方法，因为解析器会报告这个错误。如果 ESLint 以严格模式解析代码，解析器（而不是本规则）会报告错误。

> 使用此规则的错误示例：

```ts
/*eslint no-dupe-args: "error"*/

function foo(a, b, a) { // Parsing error: Argument name clasheslint
    console.log("value of the second a:", a);
}

var bar = function (a, b, a) {
    console.log("value of the second a:", a);
};
```

> 使用此规则的正确示例：

```ts
/*eslint no-dupe-args: "error"*/

function foo(a, b, c) {
    console.log(a, b, c);
}

var bar = function (a, b, c) {
    console.log(a, b, c);
};
```

- **no-dupe-class-members**  `[boolean]`

- **no-dupe-else-if**  ✅
这条规则不允许在同一个 if-else-if 链中出现重复的条件。

- **no-dupe-keys**  `[boolean]`

- **no-duplicate-case**  `[boolean]`

- **no-duplicate-imports**  `[boolean]`

- **no-empty-character-class**  `[boolean]`

- **no-empty-pattern**  `[boolean]`

- **no-ex-assign**  ✅  
这条规则不允许在 catch 子句中重新分配异常。

> 使用此规则的错误示例：

```ts
/*eslint no-ex-assign: "error"*/

try {
    // code
} catch (e) {
    e = 10;
}
```

> 使用此规则的正确示例：

```ts
/*eslint no-ex-assign: "error"*/

try {
    // code
} catch (e) {
    var foo = 10;
}
```

- **no-fallthrough**  `[boolean]`

- **no-func-assign**  `[boolean]`

- **no-import-assign**  `[boolean]`

- **no-inner-declarations**  `[boolean]`

- **no-invalid-regexp** ✅  
这条规则不允许在 RegExp 构造函数中使用无效的正则表达式字符串。

- **no-irregular-whitespace**  `[boolean]`

- **no-loss-of-precision**  `[boolean]`

- **no-misleading-character-class**  `[boolean]`

- **no-new-native-nonconstructor**  `[boolean]`

- **no-new-symbol**  ✅
这条规则的目的是防止用 new 运算符意外地调用 Symbol。

> 使用此规则的错误示例：

```ts
/*eslint no-new-symbol: "error"*/
/*eslint-env es6*/

var foo = new Symbol('foo');
```

> 使用此规则的正确示例：

```ts
/*eslint no-new-symbol: "error"*/
/*eslint-env es6*/

var foo = Symbol('foo');

// Ignores shadowed Symbol.
function bar(Symbol) {
    const baz = new Symbol("baz");
};
```

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
- **no-delete-var** ✅  
不允许对变量使用 delete 运算符。如果 ESLint 在严格模式下解析代码，解析器（而不是本规则）会报告错误。  

>使用此规则的错误示例：

```ts
/*eslint no-delete-var: "error"*/

var x;
delete x;
```

- **no-div-regex**  `[boolean]`
- **no-else-return**  `[boolean]`
- **no-empty**  `[boolean]`

- **no-empty-function**  
这条规则的目的是消除空函数。 如果一个函数包含一个注释，则不会被认为是一个问题。

> 使用 { "allow": ["functions"] } 选项的正确示例：

```ts
/*eslint no-empty-function: ["error", { "allow": ["functions"] }]*/

function foo() {}
var foo = function() {};
var obj = {
    foo: function() {}
};
```

> 使用 { "allow": ["arrowFunctions"] } 选项的正确示例：

```ts
/*eslint no-empty-function: ["error", { "allow": ["arrowFunctions"] }]*/
/*eslint-env es6*/

var foo = () => {};
```

> 使用 { "allow": ["generatorFunctions"] } 选项的正确示例：

```ts
/*eslint no-empty-function: ["error", { "allow": ["generatorFunctions"] }]*/
/*eslint-env es6*/

function* foo() {}
var foo = function*() {};
var obj = {
    foo: function*() {}
};
```

> 使用 { "allow": ["methods"] } 选项的正确示例：

```ts
/*eslint no-empty-function: ["error", { "allow": ["methods"] }]*/
/*eslint-env es6*/

var obj = {
    foo() {}
};
class A {
    foo() {}
    static foo() {}
};
```

> 使用 { "allow": ["generatorMethods"] } 选项的正确示例：

```ts
/*eslint no-empty-function: ["error", { "allow": ["generatorMethods"] }]*/
/*eslint-env es6*/

var obj = {
    *foo() {}
};
class A {
    *foo() {}
    static *foo() {}
};
```

> 使用 { "allow": ["getters"] } 选项的正确示例：

```ts
/*eslint no-empty-function: ["error", { "allow": ["getters"] }]*/
/*eslint-env es6*/

var obj = {
    get foo() {}
};

class A {
    get foo() {}
    static get foo() {}
};
```

> 使用 { "allow": ["setters"] } 选项的正确示例：

```ts
/*eslint no-empty-function: ["error", { "allow": ["setters"] }]*/
/*eslint-env es6*/

var obj = {
    set foo(value) {}
};

class A {
    set foo(value) {}
    static set foo(value) {}
};
```

> 使用 { "allow": ["constructors"] } 选项的正确示例：

```ts
/*eslint no-empty-function: ["error", { "allow": ["constructors"] }]*/
/*eslint-env es6*/

class A {
    constructor() {}
}
```

> 使用 { "allow": ["asyncFunctions"] } 选项的正确示例：

```ts
/*eslint no-empty-function: ["error", { "allow": ["asyncFunctions"] }]*/
/*eslint-env es2017*/

async function a(){}
```

> 使用 { "allow": ["asyncMethods"] } 选项的正确示例：

```ts
/*eslint no-empty-function: ["error", { "allow": ["asyncMethods"] }]*/
/*eslint-env es2017*/

var obj = {
    async foo() {}
};

class A {
    async foo() {}
    static async foo() {}
};
```

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

- **no-lonely-if**  🔧  
使用此规则禁用 if 语句。作为 else 块的唯一语句。

> 使用此规则的错误示例：

```ts
/*eslint no-lonely-if: "error"*/

if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    }
}

if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    } else {
        // ...
    }
}
```

> 使用此规则的正确示例：

```ts
/*eslint no-lonely-if: "error"*/

if (condition) {
    // ...
} else if (anotherCondition) {
    // ...
}

if (condition) {
    // ...
} else if (anotherCondition) {
    // ...
} else {
    // ...
}

if (condition) {
    // ...
} else {
    if (anotherCondition) {
        // ...
    }
    doSomething();
}
```

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

- **no-octal**  ✅
这条规则不允许八进制字头。

> 使用此规则的错误示例：

```ts
/*eslint no-octal: "error"*/

var num = 071;
var result = 5 + 07;
```

> 使用此规则的正确示例：

```ts
/*eslint no-octal: "error"*/

var num  = "071";
```

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

- **no-undef-init** 🔧
该规则旨在消除初始化为 undefined 的 var 和 let 变量声明。

> 使用此规则的错误示例：

```ts
/*eslint no-undef-init: "error"*/

var foo = undefined;
let bar = undefined;
```

> 使用此规则的正确示例：

```ts
/*eslint no-undef-init: "error"*/

var foo;
let bar;
```

请注意，这条规则不检查 const 声明、解构模式、函数参数和类字段。  
使用此规则的额外正确示例：

```ts
/*eslint no-undef-init: "error"*/

const foo = undefined;

let { bar = undefined } = baz;

[quux = undefined] = quuux;

(foo = undefined) => {};

class Foo {
    bar = undefined;
}
```

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

- **no-void**

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

- **radix**  💡
这条规则的目的是防止意外地将一个字符串转换为与预期不同的基数，或者如果只针对现代环境，则防止多余的 10 小数。

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

- **array-bracket-newline**  🔧
这条规则在数组括号的开头和结尾之前都会执行换行。

- **array-bracket-spacing**  `[boolean]`
- **array-element-newline**  `[boolean]`
- **arrow-parens**  `[boolean]`
- **arrow-spacing**  `[boolean]`
- **block-spacing**  `[boolean]`
- **brace-style**  `[boolean]`
- **comma-dangle**  `[boolean]`

- **comma-spacing**  🔧  
这条规则使变量声明、数组字面、对象字面、函数参数和序列中逗号前后的间距一致。  
此规则不适用于以下情况：
  - 在两个逗号之间；
  - 开头括号和逗号的 [ 之间，以避免与 array-bracket-spacing规则冲突；
  - 逗号和结尾括号的 ] 之间，以避免与 array-bracket-spacing 规则相冲突；
  - 在逗号和结尾大括号的 } 之间，以避免与 object-curly-spacing 规则相冲突；
  - 逗号和括号的 ) 之间，以避免与 space-in-parens 规则相冲突；  

    "before": false（默认值）不允许在逗号前有空格；  
    "before": true 要求在逗号前有一个或多个空格；  
    "after": true（默认值）要求在逗号后有一个或多个空格；
    "after": false不允许在逗号后有空格；  

> 使用此规则与默认的 { "before": false, "after": true } 选项的错误示例：

```ts
/*eslint comma-spacing: ["error", { "before": false, "after": true }]*/

var foo = 1 ,bar = 2;
var arr = [1 , 2];
var obj = {"foo": "bar" ,"baz": "qur"};
foo(a ,b);
new Foo(a ,b);
function foo(a ,b){}
a ,b
```

> 使用此规则与默认的 { "before": false, "after": true } 选项的正确示例：

```ts
/*eslint comma-spacing: ["error", { "before": false, "after": true }]*/

var foo = 1, bar = 2
    , baz = 3;
var arr = [1, 2];
var arr = [1,, 3]
var obj = {"foo": "bar", "baz": "qur"};
foo(a, b);
new Foo(a, b);
function foo(a, b){}
a, b
```

> Additional 使用此规则与默认的 { "before": false, "after": true } 选项的正确示例：

```ts
/*eslint comma-spacing: ["error", { "before": false, "after": true }]*/

// this rule does not enforce spacing between two commas
var arr = [
    ,,
    , ,
];

// this rule does not enforce spacing after `[` and before `]`
var arr = [,];
var arr = [ , ];
var arr = [a, b,];
[,] = arr;
[ , ] = arr;
[a, b,] = arr;

// this rule does not enforce spacing before `}`
var obj = {x, y,};
var {z, q,} = obj;
import {foo, bar,} from "mod";

// this rule does not enforce spacing before `)`
foo(a, b,)
```

> 使用此规则与 { "before": true, "after": false } 选项的错误示例：

```ts
/*eslint comma-spacing: ["error", { "before": true, "after": false }]*/

var foo = 1, bar = 2;
var arr = [1 , 2];
var obj = {"foo": "bar", "baz": "qur"};
new Foo(a,b);
function foo(a,b){}
a, b
```

> 使用此规则与 { "before": true, "after": false } 选项的正确示例：

```ts
/*eslint comma-spacing: ["error", { "before": true, "after": false }]*/

var foo = 1 ,bar = 2 ,
    baz = true;
var arr = [1 ,2];
var arr = [1 ,,3]
var obj = {"foo": "bar" ,"baz": "qur"};
foo(a ,b);
new Foo(a ,b);
function foo(a ,b){}
a ,b
```

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

- **semi** 🔧
这条规则执行了分号的一致使用。

- **semi-spacing**  `[boolean]`
- **semi-style**  `[boolean]`
- **space-before-blocks**  `[boolean]`

- **space-before-function-paren**  🔧
这条规则的目的是在函数括号前执行一致的间距，因此，只要空白处不符合指定的偏好，就会发出警告。

- **space-in-parens**  `[boolean]`
- **space-infix-ops**  `[boolean]`
- **space-unary-ops**  `[boolean]`
- **switch-colon-spacing**  `[boolean]`
- **template-curly-spacing**  `[boolean]`

- **template-tag-spacing**  🔧
这条规则的目的是保持模板标签函数和其模板字面之间的间距的一致性。

- **unicode-bom** 🔧

- **wrap-iife** 🔧  
要求所有立即调用的函数表达式都要用圆括号包裹起来。

> "outside": 强制执行总是包裹 call 表达式。默认是 "outside"。  

```ts
使用默认的 "outside" 选项的错误示例：

/*eslint wrap-iife: ["error", "outside"]*/

var x = function () { return { y: 1 };}(); // unwrapped
var x = (function () { return { y: 1 };})(); // wrapped function expression

使用默认的 "outside" 选项的正确示例：

/*eslint wrap-iife: ["error", "outside"]*/

var x = (function () { return { y: 1 };}()); // wrapped call expression
```

> "inside": 强制执行总是包裹 function 表达式。

```ts
使用 "inside" 选项的错误示例：

/*eslint wrap-iife: ["error", "inside"]*/

var x = function () { return { y: 1 };}(); // unwrapped
var x = (function () { return { y: 1 };}()); // wrapped call expression

使用 "inside" 选项的正确示例：

/*eslint wrap-iife: ["error", "inside"]*/

var x = (function () { return { y: 1 };})(); // wrapped function expression
```

- **wrap-regex** 🔧  
用于消除斜线运算符的歧义，并有利于提高代码的可读性。

```ts
使用此规则的错误示例：
/*eslint wrap-regex: "error"*/

function a() {
    return /foo/.test("bar"); // Wrap the regexp literal in parens to disambiguate the slash. eslint (wrap-regex)
};

使用此规则的正确示例：
/*eslint wrap-regex: "error"*/

function a() {
    return (/foo/).test("bar");
};
```

- **yield-star-spacing** 🔧  
强制要求在 `yield*`表达式中的`*` 周围有间距。

> 使用此规则与默认的 `after` 选项的正确示例：

```ts
/*eslint yield-star-spacing: ["error", "after"]*/
/*eslint-env es6*/

function* generator() {
  yield* other();
};
```

> 使用此规则与 `before` 选项的正确示例：

```ts
/*eslint yield-star-spacing: ["error", "before"]*/
/*eslint-env es6*/

function *generator() {
  yield *other();
};
```

> 使用此规则与 `both` 选项的正确示例：

```ts
/*eslint yield-star-spacing: ["error", "both"]*/
/*eslint-env es6*/

function * generator() {
  yield * other();
};
```

> 使用此规则与 `neither` 选项的正确示例：

```ts
/*eslint yield-star-spacing: ["error", "neither"]*/
/*eslint-env es6*/

function*generator() {
  yield*other();
};
```
