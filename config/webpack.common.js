const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  // entry를 기준으로 연관된 모든 파일들을 번들링
  entry: '/src/index.tsx',
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
      template: `${path.resolve(__dirname, '../public')}/index.html`,
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
