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
