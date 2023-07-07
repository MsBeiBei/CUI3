# :heart: TypeScript 指导书 > 5.0

![TypeScript](https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white)

## 🔧 Files

可以配置一个数组列表，里面包含指定文件的相对或绝对路径，编译器在编译的时候只会编译包含在files中列出的文件，如果不指定，则取决于有没有设置include选项，如果没有include选项，则默认会编译根目录以及所有子目录中的文件。这里列出的路径必须是指定文件，而不是某个文件夹，而且不能使用* ? **/ 等通配符。

## 🔧 Extends

可以通过指定一个其他的tsconfig.json文件路径，来继承这个配置文件里的配置，继承来的文件的配置会覆盖当前文件定义的配置。TS在3.2版本开始，支持继承一个来自Node.js包的tsconfig.json配置文件

## 🔧 Include

可以指定要编译的路径列表，但是和files的区别在于，这里的路径可以是文件夹，也可以是文件，可以使用相对和绝对路径，而且可以使用通配符，比如"./src"即表示要编译src文件夹下的所有文件以及子文件夹的文件。

## 🔧 Exclude

表示要排除的、不编译的文件，它也可以指定一个列表，规则和include一样，可以是文件或文件夹，可以是相对路径或绝对路径，可以使用通配符

## 🔧 References

一个对象数组，指定要引用的项目

## 🔧 CompilerOptions

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

### Modules

- **allowArbitraryExtensions** `[boolean]`
  
- **allowImportingTsExtensions** `[boolean]`
  
- **allowUmdGlobalAccess** `[boolean]`
  
- **baseUrl** `[boolean]`

- **paths**
- **baseUrl**
- **customConditions**

- **module** `[node|commonjs|amd|amd|umd|system|es6/es2015|es2020|es2022/esnext|node16|nodenext]`
用来指定要使用的模块标准

- **moduleResolution** `[classic|node10/node|node16|nodenext|bunder]`
用于选择模块解析策略

- **moduleSuffixes**
- **noResolve**
- **paths**

- **resolveJsonModule** `[boolean]`

- **resolvePackageJsonExports** `[boolean]`
  > 启用配置后，`import`来自`node_modules`中的模块时，TypeScript 会去解析模块对应的`package.json`中的`exports`字段；当 `moduleResolution` 是 `node16`, `nodenext`, or `bundler`，默认为`true`;

- **resolvePackageJsonImports** `[boolean]`
  > 启用配置后，`import`来自`node_modules`中的模块时，TypeScript 会去解析模块对应的`package.json`中的`imports`字段；当 `moduleResolution` 是 `node16`, `nodenext`, or `bundler`，默认为`true`;

- **rootDir** `[string]`
  > 指定输出目录的根目录，默认值为 `tsconfig.json` 所在目录
  比如下面的例子：

  ```ts
  ├── src
  │   ├── index.ts
  ```

  在配置 `outDir` 为 `lib` 的情况下进行编译，生成的目录结构如下：

  ```ts
  └── lib
   ├── src
   |  ├── index.js
  ```

  查看编译结果会发现 lib 下多了一层 src，这或许不符合我们的预期，为此可将 rootDir 设置为 src 后再次进行编译：

  ```ts
  └── lib
   ├── index.js
  ```

  此时，生成的目录结构符合了我们的预期（即不包含 src 这一层）。

- **rootDirs** `[array]`
  > 指定多个目录作为根目录。这将允许编译器在这些虚拟目录中解析相对应的模块导入，就像它们被合并到同一目录中一样

  ```ts
  src
  └── utils.ts
  └── view.ts
  views
  └── render.ts
  ```

  ```ts
  {
    "compilerOptions": {
      "rootDirs": ["src", "views"]
    }
  }
  ```

  上例中，我们可以：
  在 src/view.ts 中以 import Render from "./render" 的形式加载 views/render.ts 中的内容；
  在 views/render.ts 中以 import Utils from "./utils" 的形式加载 views/utils.ts 中的内容。

- **typeRoots** `[array]`

- **type** `[array]`
  > 默认情况下，所有在“./node_modules/@types”下的可见包都包含在编译中；如果指定了类型，则只有列出的包将包含在全局范围中

  ```ts
  {
    "compilerOptions": {
      "types": ["node", "jest", "express"]
    }
  }
  ```

### Emit

- **declaration** `[boolean]`
- **declarationDir** `[boolean]`
- **declarationMap** `[boolean]`
- **emitBOM** `[boolean]`
- **emitDeclarationOnly** `[boolean]`
- **importHelpers** `[boolean]`
- **importsNotUsedAsValues** `[boolean]`
- **inlineSourceMap** `[boolean]`
- **inlineSources** `[boolean]`
- **mapRoot** `[boolean]`
- **newLine** `[boolean]`
- **noEmit** `[boolean]`
- **noEmitHelpers** `[boolean]`
- **noEmitOnError** `[boolean]`
- **outDir** `[boolean]`
- **outFile** `[boolean]`
- **preserveConstEnums** `[boolean]`
- **preserveValueImports** `[boolean]`
- **removeComments** `[boolean]`
- **sourceMap** `[boolean]`
- **sourceRoot** `[boolean]`
- **stripInternal** `[boolean]`

### JavaScript Support

- **allowJs** `[boolean]`
  > allowJs设置的值为true或false，用来指定是否允许编译js文件，默认是false，即不编译js文件

- **checkJs** `[boolean]`
  > checkJs的值为true或false，用来指定是否检查和报告js文件中的错误，默认是false
  
- **maxNodeModuleJsDepth** `[number]`

### Editor Support

- **disableSizeLimit** `[boolean]`
  > 为了避免在处理非常大的 JavaScript 项目时可能出现的内存膨胀问题，TypeScript 将分配的内存量有一个上限。默认值为 `false`，如果设置为 `true`，则取消限制

- **plugins** `[boolean]`

### Interop Constraints

- **allowSyntheticDefaultImports** `[boolean]`
  
- **esModuleInterop** `[boolean]`

### Backwards Compatibility

- **charset** `[boolean]`
- **keyofStringsOnly** `[boolean]`
- **noImplicitUseStrict** `[boolean]`
- **noStrictGenericChecks** `[boolean]`
- **out** `[boolean]`
- **suppressExcessPropertyErrors** `[boolean]`
- **suppressImplicitAnyIndexErrors** `[boolean]`

### Language and Environment

- **emitDecoratorMetadata** `[boolean]`
- **experimentalDecorators** `[boolean]`
- **jsx** `[boolean]`
- **jsxFactory** `[boolean]`
- **jsxFragmentFactory** `[boolean]`
- **jsxImportSource** `[boolean]`
- **lib** `[boolean]`
- **moduleDetection** `[boolean]`
- **noLib** `[boolean]`
- **reactNamespace** `[boolean]`
- **target** `[boolean]`
- **useDefineForClassFields** `[boolean]`

### Compiler Diagnostics

- **diagnostics** `[boolean]`
- **explainFiles** `[boolean]`
- **extendedDiagnostics** `[boolean]`
- **generateCpuProfile** `[boolean]`
- **listEmittedFiles** `[boolean]`
- **listFiles** `[boolean]`
- **traceResolution** `[boolean]`

### Projects

- **composite** `[boolean]`
- **disableReferencedProjectLoad** `[boolean]`
- **disableSolutionSearching** `[boolean]`
- **disableSourceOfProjectReferenceRedirect** `[boolean]`
- **incremental** `[boolean]`
- **tsBuildInfoFile** `[boolean]`

### Output Formatting

- **noErrorTruncation** `[boolean]`
- **preserveWatchOutput** `[boolean]`
- **pretty** `[boolean]`

### Completeness

- **skipDefaultLibCheck** `[boolean]`
- **skipLibCheck** `[boolean]`

### Command Line

### Watch Options

- **assumeChangesOnlyAffectDirectDependencies** `[boolean]`

## 🔧 WatchOptions

- **watchFile** `[boolean]`
  
- **watchDirectory** `[boolean]`
  
- **fallbackPolling** `[boolean]`
  
- **synchronousWatchDirectory** `[boolean]`
  
- **excludeDirectories** `[boolean]`
  
- **excludeFiles** `[boolean]`

## 🔧 TypeAcquisitio

此配置在`tsconfig.json`没有生效，亲测只在`jsconfig.json` 中起作用。当你的编辑器中有一个 JavaScript 项目时，TypeScript 会使用@types 定义的 DefinitelyTyped 集合自动为你的节点模块提供类型。这称为自动类型获取，您可以使用配置中的 typeAcquisition 对象对其进行自定义。换句话来说就是设置自动引入库类型定义文件 .d.ts 相关；

- **enable** `[boolean]`
  > 如果您想禁用或自定义此特性，请创建 `jsconfig.json` 在项目的根目录中。
  - 当设置为`true`时，如果js文件中导入的如 `jquery`的包，则会自动从DefinitelyTyped 下载 JQuery 的类型；
  - 设置为`false`，则反之；

- **include** `[array]`
  > 如果你有一个特定的模块，应该包括(但不在 `node_modules` 中)。

- **exclude** `[array]`
  > 如果不应该自动获取某个模块，例如，如果该库在您的 `node_modules` 中可用，但您的团队已经同意不使用它。

- **disableFilenameBasedTypeAcquisition** `[boolean]`
  > 此属性，没有测出具体作用。是否禁用基于文件名的类型获取，TypeScript 的类型获取可以根据项目中的文件名推断应该添加哪些类型，默认：`false`。
