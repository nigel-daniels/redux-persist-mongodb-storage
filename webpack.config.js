module.exports = {
	context: 		__dirname,

	mode:			'development',

	entry:      	'./src/index.js',

	output:			{
					filename:	'index.js',
	                path:        __dirname + '/dist/'
	    			},

	devtool:		'source-map',

    resolve:		{
	        		extensions: ['.js', '.json'],
					modules: ['./', 'node_modules']
	    			},

    module: 		{
		        	rules:[
							{
							test: /\.js?$/,
							use: {
								loader: 'babel-loader',
								}
							},
							{
							enforce: 'pre',
							test: /\.js?$/,
							loader: 'source-map-loader'
							}
	        			]
    				},

	target: 		'node',

	node: 			{
					__dirname: false,
    				__filename: false
					}
};
