import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import cleanup from "rollup-plugin-cleanup";

const plugins = [
  nodeResolve({
    extensions: [".js", ".ts"]
  }),
  babel({
    extensions: [".js", ".ts"],
    exclude: "node_modules/**",
    babelrc: false,
    presets: ["@babel/preset-typescript"],
    plugins: [[
      "babel-plugin-transform-rename-import",
      {
        original: "rxcore",
        replacement: "../../../packages/solid/src/dom/core"
      }
    ]]
  }),
  cleanup({
    extensions: [".js", ".ts"]
  })
];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "lib/index.js",
        format: "cjs"
      },
      {
        file: "dist/index.js",
        format: "es"
      }
    ],
    plugins
  },
  {
    input: "src/dom/index.ts",
    output: [
      {
        file: "lib/dom/index.js",
        format: "cjs"
      },
      {
        file: "dist/dom/index.js",
        format: "es"
      }
    ],
    external: ["../index.js"],
    plugins: plugins
  },
  {
    input: "src/dom/html.ts",
    output: [
      {
        file: "lib/dom/html.js",
        format: "cjs"
      },
      {
        file: "dist/dom/html.js",
        format: "es"
      }
    ],
    external: ["./index.js", "lit-dom-expressions"],
    plugins
  },
  {
    input: "src/dom/h.ts",
    output: [
      {
        file: "lib/dom/h.js",
        format: "cjs"
      },
      {
        file: "dist/dom/h.js",
        format: "es"
      }
    ],
    external: ["./index.js", "hyper-dom-expressions"],
    plugins
  }
];
