const CleanCSS = require('clean-css');
module.exports = function (eleventyConfig) {
	eleventyConfig.addFilter('cssmin', (code) => new CleanCSS({}).minify(code).styles);
	eleventyConfig.addWatchTarget('./site/style.css');
	eleventyConfig.setTemplateFormats(['md', 'pug', 'jpg', 'png']);
	return {
		dir: {
			input: 'site',
			output: 'dist',
		},
	};
};
