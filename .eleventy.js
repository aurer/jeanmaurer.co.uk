module.exports = function (eleventyConfig) {
	eleventyConfig.addWatchTarget('./site/style.css');
	eleventyConfig.setTemplateFormats(['md', 'pug', 'jpg', 'png']);
	return {
		dir: {
			input: 'site',
			output: 'dist',
		},
	};
};
