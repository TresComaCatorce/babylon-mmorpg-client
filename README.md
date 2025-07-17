# Babylon MMORPG Client

An MMORPG client built with [BabylonJS](https://www.babylonjs.com/) and TypeScript, using Webpack for bundling and ESLint + Prettier for code quality.

---

## Available Scripts

These scripts are defined in the `package.json` file and help with development, building, and maintaining the project.

| Command                   | Description                                                                                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm start`               | Runs the development server with Webpack (`webpack-dev-server`) in development mode. Automatically opens the browser and enables hot reload.            |
| `npm run build`           | Cleans the `dist` folder and creates an optimized production build.                                                                                     |
| `npm run build:dev`       | Cleans the `dist` folder and creates a development build for faster testing without optimizations.                                                      |
| `npm run lint`            | Runs ESLint on the TypeScript and JSON files and automatically fixes detected issues.                                                                   |
| `npm run lint:check`      | Runs ESLint to check for code issues without applying fixes.                                                                                            |
| `npm run format`          | Formats all TypeScript and JSON files using Prettier to maintain consistent code style.                                                                 |
| `npm run clean`           | Removes the `dist` folder to clean up previous build files.                                                                                             |
| `npm run deploy-gh-pages` | Build the project in `production` mode and deploy it in the branch `gh-pages` to expose using [GitHub Pages](https://docs.github.com/en/pages) feature. |

---

## Additional Details

- **Environment variables:** Uses [`cross-env`](https://www.npmjs.com/package/cross-env) for cross-platform compatibility of the `NODE_ENV` environment variable in scripts.
- **ESLint & Prettier:** The project uses ESLint for code validation and Prettier for automatic formatting to ensure clean and consistent code.
- **Webpack:** Configured with separate files for development (`webpack.dev.js`) and production (`webpack.prod.js`), using `webpack-merge` to share common configuration.
- **TypeScript:** Used for static typing and modern development benefits.

---

## Getting Started

1. Clone the repository.
2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. Create an optimized production build:

    ```bash
    npm run build
    ```

---

### Author

Cristian Ferrero

---

If you have questions or suggestions, feel free to contact me at cristian.ferrero1992@gmail.com
