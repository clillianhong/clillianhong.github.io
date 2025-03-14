// craco.config.js
module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    webpack: {
        configure: (webpackConfig) => {
        // Add custom module rules
        webpackConfig.module.rules.push({
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        });
        webpackConfig.module.rules.push({
            test: /\.esm\.js$/,
            use: 'esm-loader',
        });
        return webpackConfig;
        },
    },
    babel: {
        presets: [
        // ... other presets ...
        '@babel/preset-react',
        ],
    },

}
