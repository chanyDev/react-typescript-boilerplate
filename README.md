# react-typescript-boilerplate

리액트 + 웹팩 + 바벨 + 타입스크립트로 구성된 개발 환경 보일러 플레이트입니다.

## 모듈 설치

### 1. 리액트 모듈 설치

리액트 필수 모듈을 설치합니다.

```
npm i react react-dom
```

### 2. 타입스크립트 모듈 설치

타입스크립트와 관련된 모듈을 설치합니다.

```
npm i -D @types/react @types/react-dom typescript
```

### 3. 웹팩 모듈 설치

웹팩과 관련된 모듈을 설치합니다.

```
npm i -D webpack webpack-cli webpack-dev-server webpack-merge webpack-bundle-analyzer
```

- webpack, webpack-cli : 웹팩 필수 모듈
- webpack-dev-server : 실시간 리로딩 기능을 제공하는 개발용 서버 모듈로 실제 번들링 파일을 생성하지 않고 번들링 결과를 메모리에 저장하기 때문에 빠른 빌드 속도를 보장
- webpack-merge : 여러개의 웹팩 설정 파일을 하나로 병합해주는 모듈로 개발(development)용 설정과 배포(production)용 설정으로 나누어 적용하기 위해 사용
- webpack-bundle-analyzer : 웹팩 출력 파일을 시각화 해주는 모듈로 최적화를 위해 사용

### 4. 바벨 모듈 설치

바벨과 관련된 모듈과 바벨 로더를 설치합니다.

```
npm i -D @babel/core @babel/cli  @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader
```

- @babel/core : 바벨 필수 모듈
- @babel/cli : 커맨드라인에서 바벨 컴파일러를 사용할 수 있게 해주는 모듈
- @babel/preset-env, @babel/preset-react, @babel/preset-typescript : 각각 JS, React, TS를 트랜스파일링 해주는 모듈
- babel-loader : 웹팩 또는 바벨이 사용하여 JS파일을 트랜스파일링 할 수 있게 해주는 로더

### 5. 추가 로더 및 플러그인 설치

추가로 필요한 로더 및 플러그인을 설치합니다.

```
npm i -D core-js css-loader css-minimizer-webpack-plugin html-webpack-plugin mini-css-extract-plugin style-loader terser-webpack-plugin
```

- core-js : 런타임 폴리필 모듈로 최신 문법을 사용 가능하도록 함
- css-loader : 웹팩이 css 파일을 읽도록 돕는 로더
- css-minimizer-webpack-plugin : css를 최적화 및 축소하는 플러그인
- html-webpack-plugin : html을 최적화 및 축소하는 플러그인
- mini-css-extract-plugin : css가 포함된 js파일 별로 별도의 css파일을 추출하는 플러그인
- style-loader : css를 `<style>` 태그에 주입하는 로더
- terser-webpack-plugin : js를 최적화 및 축소하는 플러그인

개발 환경에서는 style-loader, 배포 환경에서는 mini-css-extract-plugin 사용 권장 => 함께 사용하면 안된다.

sass를 사용한다면 아래 모듈 설치

```
npm i -D sass sass-loader
```

- sass-loader : 웹팩이 sass 파일을 읽도록 돕는 로더

<br>

## 프로젝트 구조

```
project
  ├─ config
  │   ├─webpack.common.js
  │   ├─webpack.dev.js
  │   └─webpack.prod.js
  ├─ node_modules
  ├─ public
  │   └─index.html
  ├─ src
  │   ├─App.tsx
  │   └─index.tsx
  ├─ .babelrc
  ├─ package.json
  └─ tsconfig.json
```

<br>

## 환경 설정

웹팩에 대한 설정 파일을 추가합니다.

```js
// config/webpack.common.js
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // entry를 기준으로 연관된 모든 파일들을 번들링
  entry: '../src/index.tsx',
  // 모듈에 적용할 로더와 옵션을 설정
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/, // 적용할 확장자명
        use: 'babel-loader', // 적용할 로더
        exclude: /node_modules/, // 로더를 제외할 대상
      },
    ],
  },
  // 적용할 플러그인을 설정
  plugins: [
    new HtmlWebpackPlugin({
      template: '../public/index.html',
    }),
    // 해당 플러그인 활성화 시 import React from 'react' 생략 가능
    // new webpack.ProvidePlugin({
    //   React: 'react',
    // }),
  ],
  // 모듈이 처리되는 방식을 설정
  resolve: {
    // 번들링 될 확장자 목록을 설정
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.json'],
    // 모듈의 별칭을 설정
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
};
```

```js
// config/webpack.dev.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  // 소스맵 생성 여부와 방법을 설정
  devtool: 'cheap-module-source-map',
  // dev-server 설정
  devServer: {
    open: true, // 서버가 시작된 후 브라우저를 열도록 설정
    hot: true, // Hot Module Replacement 기능을 설정 => 사용 시 모듈 전체를 다시 로드하지 않음
    compress: true, // 압축을 활성화
    port: 8080,
    historyApiFallback: true, // 404 응답시 index.html을 서빙하도록 설정
    liveReload: true, // 파일 변경 시 자동 리로드 설정
  },
  // 번들링 결과물에 대한 설정
  output: {
    filename: '[name].js', // 출력될 번들의 이름을 설정
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['stylel-loader', 'css-loader', 'sass-loader'], // 로더가 여러개일 경우 배열형태로 설정, 우측 -> 좌측 순서로 적용
      },
    ],
  },
});
```

```js
// config/webpack.prod.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true, // 이전 번들링 결과를 정리하도록 설정
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()], // 배포 시 css를 별도의 파일로 추출하도록 설정, style-loader와 중복 사용X
  // 웹팩 최적화 설정
  optimization: {
    useExports: true, // 사용하지 않는 export된 모듈을 생성하지 않도록 설정
    minimize: true, // 번들 최소화 옵션 설정
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin({
        parallel: true, // 병렬처리는 빌드 속도를 높일 수 있으므로 권장!
        // 사용자 지정 압축 옵션 설정
        terserOptions: {
          drop_console: true, // console 함수 호출을 무시
        },
      }),
    ],
  },
});
```

바벨에 대한 설정 파일을 추가합니다.

```json
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 폴리필을 core-js 사용하도록 설정
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```

타입스크립트에 대한 설정 파일을 추가합니다.

```json
// .tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist",
    "target": "es5",
    "module": "esnext",
    "jsx": "react-jsx",
    "noImplicitAny": true,
    "allowSyntheticDefaultImports": true,
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "include": ["src"]
}
```

웹팩을 실행하기 위해 package.json 설정을 추가합니다.

```json
// package.json
"scripts": {
  "dev": "webpack-dev-server --config config/webpack.dev.js",
  "prod": "webpack-dev-server --config config/webpack.prod.js",
  "build:dev": "webpack --config config/webpack.dev.js",
  "build:prod": "webpack --config config/webpack.prod.js"
},
```

<br>

## 참고 자료

https://webpack.js.org/concepts/ <br>
https://babeljs.io/docs/en/ <br>
https://joshua1988.github.io/webpack-guide/guide.html <br>
https://yamoo9.gitbook.io/webpack/
