# 📜 Available Scripts

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
