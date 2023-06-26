# TypeScript 指导书 > 5.0

### Type Checking

- **allowUnreachableCode**  `[boolean]`
  > 控制是否报告未被执行的代码
  - 当设置为 `true` 时，编译器会忽略未被执行的代码;
  - 当设置为 `false` 时，编译器会将未被执行的代码视为错误并报告;
    ```ts
    function fn(n: number) {
        if (n > 5) {
            return true;
        } else {
            return false;
        }
        return true // Error! 检测到无法访问的代码。ts(7027);
    }
    ```
  - 如果仅仅是编译器提出警告，设置为 `undefined`(默认);

- **allowUnusedLabels** `[boolean]`
  > 控制是否报告未被使用的标签
  - 当设置为 `true` 时，编译器会忽略未被使用的标签;
  - 当设置为 `false` 时，编译器会将未被使用的标签视为错误并报告;
    ```ts
    function verifyAge(age: number) {
        if (age > 18) {
           verified: true // Error! 未使用的标签。ts(7028);
        }
    }
    ```
  - 如果仅仅是编译器提出警告，设置为 `undefined`(默认);
  

- **alwaysStrict** `[boolean]`
  > 当设置为 `true` 时，指定始终以严格模式检查每个模块，为每个编译后的js文件发出 `use strict`，用来告诉浏览器该js为严格模式
  ```js
  "use strict";
  console.log(123);
  ```
 
- **exactOptionalPropertyTypes** `[boolean]`
  > 精确的可选属性类型，启用此行为，必须启用 `strictNullChecks`
  - 当设置为 `true` 时，可选属性不能赋值为 `undefined`；
  ```ts
  interface UserDefaults {
    colorThemeOverride?: "dark" | "light";
  }

  const settings: UserDefaults = {
      colorThemeOverride:undefined; // Error! 不能将类型“undefined”分配给类型“"dark" | "light"”;
  }
  ```
  - 当设置为 `false` 时，可选属性被允许显式用 `undefined` 代替
  
- **noFallthroughCasesInSwitch** `[boolean]`
  > 禁止 `switch` 语句中的穿透的情况；开启后，如果 `switch` 语句的流程分支中没有 `break` 或 `return`，则会抛出警告，从而避免了意外的 `swtich` 判断穿透导致的问题
  ```ts
  const a: number = 6;
 
  switch (a) {
    case 0: // Warning! switch 语句中的 Fallthrough 情况;
      console.log("even");
    case 1:
      console.log("odd");
      break;
  }
  ```
  
- **noImplicitAny** `[boolean]`
  - If you want to

- **noImplicitOverride** `[boolean]`
  - If you want to
  
- **noImplicitReturns** `[boolean]`
  - If you want to
  
- **noImplicitThis** `[boolean]`
  - If you want to
  
- **noPropertyAccessFromIndexSignature** `[boolean]`
  - If you want to 
  
- **noUncheckedIndexedAccess** `[boolean]`
  - If you want to 
  
- **noUnusedLocals** `[boolean]`
  - If you want to 
  
- **noUnusedParameters** `[boolean]`
  - If you want to
   
- **strict** `[boolean]`
> 是否开启严格模式，开启严格模式后，TypeScript 将进行更为严格的类型检测

  
- **strictBindCallApply** `[boolean]`
  - If you want to 
  
- **strictFunctionTypes** `[boolean]`
  - If you want to 
  
- **strictNullChecks** `[boolean]`
  - If you want to 
  
- **strictPropertyInitialization** `[boolean]`
  - When set to `true`, TypeScript will raise an error when a class property was declared but not set in the constructor. 
  
- **useUnknownInCatchVariables** `[boolean]`
  - If you want to specify the error type as `unknown` in the catch error statemenet, you can use `true`. In `strict` mode, it will automatically be enabled.
  ```js
  try {
    // Who knows what this might throw...
    executeSomeThirdPartyCode();
  }catch (err) { // err: unknown

    // Error! Property 'message' does not exist on type 'unknown'.
    console.error(err.message);

    // Works! We can narrow 'err' from 'unknown' to 'Error'.
    if (err instanceof Error) {
        console.error(err.message);
    }
  }
  ```



### TypeAcquisitio

当你的编辑器中有一个 JavaScript 项目时, TypeScript 会使用@types 定义的 DefinitelyTyped 集合自动为你的节点模块提供类型。这称为自动类型获取, 您可以使用配置中的 typeAcquisition 对象对其进行自定义。换句话来说就是设置自动引入库类型定义文件 .d.ts 相关

- **disableFilenameBasedTypeAcquisition** `[boolean]`
  > 是否禁用基于文件名的类型获取，TypeScript 的类型获取可以根据项目中的文件名推断应该添加哪些类型，默认：false