# 🛠️ Webpack Configuration

This document explains the [Webpack](https://webpack.js.org/) setup used in this project.  
Webpack is configured with three separate files to organize common, development, and production settings efficiently using [`webpack-merge`](https://www.npmjs.com/package/webpack-merge).

---

## 1. `webpack.common.js`

Contains shared configuration for both development and production environments.
In this file we can find configuration of:

- Entry point
- Aliases
- TypeScript and CSS loaders
- Asset copying
- HTML template.

---

## 2. `webpack.dev.js`

Development-specific configuration that enables source maps, hot module replacement, and a local dev server.
In this file we can find configuration of:

- Source maps
- Dev server on port 8000 with hot reload
- Development environment variable.

---

## 3. `webpack.prod.js`

Production configuration optimized for performance with hashed filenames, chunk splitting, and no source maps by default.
In this file we can find configuration of:

- Optimized output with content hashes
- Chunk splitting
- Production environment variable
- No source maps by default

---

This modular approach keeps configuration clean and maintainable, allowing you to easily extend or tweak each environment separately.
