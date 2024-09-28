<svelte:head>
	<link
		rel="preload"
		href="/assets/fonts/infini-bold-latin.woff2"
		as="font"
		type="font/woff2"
		crossorigin=""
	/>
	<link
		rel="preload"
		href="/assets/fonts/menoe_grotesque_pro-latin.woff2"
		as="font"
		type="font/woff2"
		crossorigin=""
	/>
</svelte:head>

<slot />

<style global>
	@font-face {
		font-family: Infini;
		font-weight: 500 900;
		src: url('/assets/fonts/infini-bold-latin.woff2') format('woff2');
	}

	@font-face {
		font-family: 'Menoe Grotesque Pro';
		font-weight: 100 900;
		src: url('/assets/fonts/menoe_grotesque_pro-latin.woff2') format('woff2');
	}

	/* RESET */
	*,
	::before,
	::after {
		box-sizing: border-box;
		border-width: 0;
		border-style: solid;
		border-color: currentColor;
	}
	html {
		line-height: 1.5;
		-webkit-text-size-adjust: 100%;
		-moz-tab-size: 4;
		tab-size: 4;
		font-family:
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			Arial,
			'Noto Sans',
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji',
			'Segoe UI Symbol',
			'Noto Color Emoji';
		font-feature-settings: normal;
		font-variation-settings: normal;
	}
	body {
		margin: 0;
		line-height: inherit;
	}
	hr {
		height: 0;
		color: inherit;
		border-top-width: 1px;
	}
	abbr:where([title]) {
		text-decoration: underline dotted;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: inherit;
		font-weight: inherit;
	}
	a {
		color: inherit;
		text-decoration: inherit;
	}
	b,
	strong {
		font-weight: bolder;
	}
	code,
	kbd,
	samp,
	pre {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
			'Courier New', monospace;
	}
	small {
		font-size: 80%;
	}
	sub,
	sup {
		font-size: 75%;
		line-height: 0;
		position: relative;
		vertical-align: baseline;
	}
	sub {
		bottom: -0.25em;
	}
	sup {
		top: -0.5em;
	}
	table {
		text-indent: 0;
		border-color: inherit;
		border-collapse: collapse;
	}
	button,
	input,
	optgroup,
	select,
	textarea {
		font-family: inherit;
		font-feature-settings: inherit;
		font-variation-settings: inherit;
		font-size: 100%;
		font-weight: inherit;
		line-height: inherit;
		color: inherit;
		margin: 0;
		padding: 0;
	}
	button,
	select {
		text-transform: none;
	}
	button,
	[type='button'],
	[type='reset'],
	[type='submit'] {
		padding: 0;
		border-style: solid;
		border-width: 0;
		-webkit-appearance: button;
		appearance: button;
		background-color: transparent;
		background-image: none;
	}
	:-moz-focusring {
		outline: auto;
	}
	:-moz-ui-invalid {
		box-shadow: none;
	}
	progress {
		vertical-align: baseline;
	}
	::-webkit-inner-spin-button,
	::-webkit-outer-spin-button {
		height: auto;
	}
	[type='search'] {
		-webkit-appearance: textfield;
		appearance: textfield;
		outline-offset: -2px;
	}
	::-webkit-search-decoration {
		-webkit-appearance: none;
	}
	::-webkit-file-upload-button {
		-webkit-appearance: button;
		font: inherit;
	}
	summary {
		display: list-item;
	}
	blockquote,
	dl,
	dd,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	hr,
	figure,
	p,
	pre {
		margin: 0;
	}
	fieldset {
		margin: 0;
		padding: 0;
	}
	legend {
		padding: 0;
	}
	ol,
	ul,
	menu {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	dialog {
		padding: 0;
	}
	textarea {
		resize: vertical;
	}
	input::placeholder,
	textarea::placeholder {
		opacity: 1;
		color: theme('colors.gray.400', #9ca3af);
	}
	button,
	[role='button'] {
		cursor: pointer;
	}
	:disabled {
		cursor: default;
	}
	img,
	svg,
	video,
	canvas,
	audio,
	iframe,
	embed,
	object {
		display: block;
	}
	img,
	video {
		max-width: 100%;
		height: auto;
	}
	[hidden] {
		display: none;
	}
	/* !RESET */

	* {
		box-sizing: border-box;
		margin: 0;
		::before,
		::after {
			box-sizing: border-box;
		}
	}

	html {
		font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
		font-size: 62.5%;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	body {
		padding: 0;
		margin: 0;
		color: hsl(28, 51%, 93%);
		background: hsl(216, 5%, 18%);
	}

	a {
		color: hsl(28, 51%, 93%);
		text-decoration: underline;
	}

	#site-main::after {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 201;
		width: 100%;
		height: 100%;
		pointer-events: none;
		content: '';
		background: url('./images/noise.jpg');
		opacity: 0.02;
	}

	.noselect {
		user-select: none;
	}
</style>
