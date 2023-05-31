# TypeScript > 5.0

### Type Checking

- **allowUnreachableCode**  `[boolean]`
  - If you want to ignore unreachable code, you can use `true`.
  - If you don't want to keep unreachable code, you can use `false`, and the compiler will report an error.
  - Otherwise, if you just want a warning, you can use `undefined`.

- **allowUnusedLabels** `[boolean]`
  - If you want to ignore unused labels, you can use `ture`.
  - If you don't want ignore unused labels, you can use `false`, and the compiler will report an error.
  - Otherwise, if you just want a warning, you can use `undefined`.
  

- **alwaysStrict** `[boolean]`
  - If you want to 
 
- **exactOptionalPropertyTypes** `[boolean]`
  - If you want to 
  
- **noFallthroughCasesInSwitch** `[boolean]`
  - If you want to 
  
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
  - If you want to 
  
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