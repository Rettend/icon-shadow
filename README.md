# icon-shadow

A transform function to add a shadow to icons from UnoCSS Icons Preset

- You can use this with [custom](https://unocss.dev/presets/icons#customization) icon collections, so only for icons that you've saved locally.
- The color is not customizable, it always matches the icon color, but works with gradients.

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

Load icons from a folder.

Access them with `<div class="i-shadow:svg-name" />`, if the icon is named `svgName.svg`.

```ts
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

Or apply to all custom loaded icons:
> **Note:** you will need to install `@iconify/utils` as a dependency

```ts
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
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

I only created the `insertShadow` function which can be used to transform the svg string. 👍

## License

MIT
