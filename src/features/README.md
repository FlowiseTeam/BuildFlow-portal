## Overview

This folder contains components for specific features. Features shouldn't be dependent on other features. You can use components from _components_ folder here.

## Features Guidelines (same as to components folder)

- Components inside this folder should be generic enough to be reused in different parts of the application.
- Avoid hardcoding values and use props for customization.
- Use TypeScript for all components to ensure type safety.
- Use Tailwind for styling.
- Ensure that components are responsive.
- Using unit tests, Storybook is a great advantage.
- use named exports instead of default exports.

## Example structure

```
└───dashboard
    ├───chat //chat related files can be found here
    ├───summary //summary related files can be found here
    ├───...utils.ts, consts,ts, tests, etc... can also be found in these folders
```
