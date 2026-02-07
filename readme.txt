Astro + Fleek Starter Kit
=========================

A minimal static website template for getting started with Astro and deploying
to Fleek, a decentralized web hosting platform.

Technologies
------------
- Astro v2.3.0 (static site builder)
- TypeScript
- Manrope custom font
- Scoped CSS with dark theme

Project Structure
-----------------

  /
  ├── public/
  │   ├── favicon.svg
  │   └── fonts/
  ├── src/
  │   ├── components/
  │   │   └── Card.astro        # Reusable card link component
  │   ├── layouts/
  │   │   └── Layout.astro      # Base HTML layout template
  │   ├── pages/
  │   │   └── index.astro       # Homepage
  │   └── resources/            # SVG assets (logos, icons)
  ├── astro.config.mjs
  ├── tsconfig.json
  └── package.json

Astro looks for .astro or .md files in the src/pages/ directory. Each page is
exposed as a route based on its file name.

Static assets like images can be placed in the public/ directory.

Commands
--------
All commands are run from the root of the project, from a terminal:

  npm install          Install dependencies
  npm run dev          Start local dev server at localhost:3000
  npm run build        Build production site to ./dist/
  npm run preview      Preview build locally before deploying
  npm run astro ...    Run CLI commands like "astro add", "astro check"
  npm run astro --help Get help using the Astro CLI

Deploying to Fleek
------------------

1. Create a fleek.json config file:

   Run "fleek sites init" using the Fleek CLI. It will prompt you for:
   - name: How you want to name the site
   - dist: Output directory (use "dist" for this template)
   - build command: Command to build your site

2. Deploy the site:

   Run "fleek sites deploy" to publish. You will receive an IPFS CID and a
   gateway URL to view your site.

Extra features:
- Continuous Integration (CI): fleek sites ci
  https://docs.fleek.xyz/services/sites/#continuous-integration-ci
- Custom domains: fleek domains create
  https://docs.fleek.xyz/services/domains/

Configuration Note
------------------
This template is configured for static output:

  // astro.config.mjs
  import { defineConfig } from 'astro/config';
  export default defineConfig({
      output: 'static',
  });

More info on static builds:
https://docs.astro.build/en/guides/content-collections/#building-for-static-output-default

Learn More
----------
- Astro documentation: https://docs.astro.build
- Astro Discord server: https://astro.build/chat
