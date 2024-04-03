# React + TypeScript + Vite

## Backend repository

- [Link](https://github.com/Juancapp/shopping-cart-server-v2)

## Installation

Before you can run this project, you need to install the dependencies. Make sure you have Node.js and npm installed on your machine, then run the following command in the root directory of the project:

```bash
npm install
```

This will install all the necessary dependencies as defined in the `package.json` file.

## Running the Server

To start the development server, run the following command:

```bash
npm start
```

This will start the development server on `localhost:5173` (or the port you've configured) and automatically open it in your default web browser.

## Building the Project

To build the project for production, run the following command:

```bash
npm run build
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
