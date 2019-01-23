const ENV = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    TEST: 'test'
};

module.exports = function (api) {
    api.cache.forever();
    
    var env = process.env.NODE_ENV;
    var presets = [];
    var plugins = [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-optional-chaining',
        ['babel-plugin-module-resolver', {
            alias: {
                '^config/(.+)': './src/_config/\\1',
                '^constants/(.+)': './src/_constants/\\1',
                '^utils/(.+)': './src/_utils/\\1'
            }
        }]
    ];

    switch(env) {
        case ENV.DEVELOPMENT:
        case ENV.PRODUCTION:        
            presets.push([        
                ['@babel/preset-env', {
                    'targets': [
                        'last 2 version',
                        'ie >= 9'
                    ],
                    modules: false // transform esm to cjs, false to keep esm.
                }]
            ]);
            plugins.push('@babel/plugin-external-helpers');
            break;
        case ENV.TEST:
            presets.push('@babel/preset-env');
            plugins.push('@babel/plugin-proposal-export-namespace-from');
            break;
    }

    return {
        presets,
        plugins
    };
};