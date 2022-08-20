import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import cssImport from 'postcss-import';
import nested from 'postcss-nested';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    postcss: {
      plugins: [autoprefixer, cssnano({ preset: 'default' }), cssImport, nested]
    },
    typescript: true
  }),

  kit: {
    adapter: adapter(),
    methodOverride: {
      allowed: ['PATCH', 'DELETE']
    }
  }
};

export default config;
