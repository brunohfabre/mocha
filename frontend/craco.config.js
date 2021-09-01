const path = require('path');

const CracoEsbuildPlugin = require('craco-esbuild');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@helpers': path.resolve(__dirname, 'src/helpers/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@contexts': path.resolve(__dirname, 'src/contexts/'),
    }
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        includePaths: ['/external/dir/with/components'],
        enableSvgr: true,
        esbuildLoaderOptions: {
          loader: 'tsx',
          target: 'es2015',
        },
        skipEsbuildJest: false,
        esbuildJestOptions: {
          loaders: {
            '.ts': 'ts',
            '.tsx': 'tsx',
          },
        },
      },
    },
  ],
}
