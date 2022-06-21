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
