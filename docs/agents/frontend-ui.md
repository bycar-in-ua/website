# Frontend UI and Design

## Nuxt UI Usage

Nuxt UI is used for the app shell and UI primitives. The app shell uses UApp in app/app.vue and toasts are emitted via useToast.

### Global Configuration Preferred

Per Nuxt UI docs, global configuration should live in app/app.config.ts under the ui key (for colors and component theme overrides). We prefer global configuration over per-component ui props to keep a consistent design system.

Reference: https://ui.nuxt.com/getting-started/theme

Example pattern:

```ts
export default defineAppConfig({
	ui: {
		colors: {
			primary: "sky",
		},
	},
});
```

Only use per-component ui overrides when a unique one-off is unavoidable, and keep those overrides small and well justified.

## Design References

There is an external Figma design. If a UI change is unclear or ambiguous, ask for a Figma link or specific frame references before implementing.

## Comment Policy

Do not overuse comments. Avoid commenting obvious code. Only add comments where the logic is non-trivial or the intent is not clear from the code itself.

## Styling and Theme

- Global CSS is in app/assets/css/global.css.
- Theme tokens are imported from @bycar/theme.
- Tailwind content sources are configured via @source in global.css.
