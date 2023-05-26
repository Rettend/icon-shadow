# icon-shadow

A transform function to add a shadow to icons from UnoCSS Icons Preset

## Pros and Cons

- ✅ Shows shadow behind transparent areas of the icon (modifies the svg path)
- ✅ The shadow matches the icon color, and even works with gradients

- ❌ You can use this with [custom](https://unocss.dev/presets/icons#customization) icon collections, so only for icons that you've saved locally
- ❌ The color is not customizable

## Install

```bash
npm i -D icon-shadow
```

```bash
yarn add -D icon-shadow
```

```bash
pnpm i -D icon-shadow
```

## Usage

`unocs.config.ts`

Apply to all custom loaded icons:

```ts
import { defineConfig, presetIcons } from 'unocss'
import { insertShadow } from 'icon-shadow'

export default defineConfig({
  presets: [
    presetIcons({
      customizations: {
        transform(svg) {
          return insertShadow(svg, {
            dx: 0,
            dy: 0,
            stdDeviation: 2,
            opacity: 0.3,
            viewBoxScale: 1.5,
          })
        },
      },
    }),
  ],
})
```

Or load icons from a folder:

```ts
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { defineConfig, presetIcons } from 'unocss'
import { insertShadow } from 'icon-shadow'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        shadow: FileSystemIconLoader(
          './public',
          svg => insertShadow(svg, {
            dx: 0,
            dy: 0,
            stdDeviation: 1,
            opacity: 0.5,
            viewBoxScale: 1,
          }),
        ),
      },
    }),
  ],
})
```

Access them with `<div class="i-shadow:svg-name" />`, if the icon is named `svgName.svg`.

> **Note**: you will need to install `@iconify/utils` as a dependency

I only created the `insertShadow` function which can be used to transform the svg string. 👍

## License

MIT
