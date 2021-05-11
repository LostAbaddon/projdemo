const Path = require('path');
const URL = require('url');
const FS = require('fs/promises');
const Mime = require('mime-types');
const KOA = require('koa');

const PlainTextTypes = ['html', 'js', 'json', 'css', 'txt', 'xml'];

const init = (pathList) => {
	const VueIndexPages = new Map();

	var pathMap = [];
	for (let domain in pathList) {
		let prefix = '/' + domain.split(/[\\\/]+/).filter(p => p.length > 0).join('/') + '/';
		pathMap.push([prefix, Path.join(__dirname, pathList[domain]), prefix.length]);
	}
	pathMap.sort((a, b) => b[2] - a[2]);

	var app = new KOA();
	app.use(async (ctx, next) => {
		var url = ctx.request.url;
		console.log('[REQUEST]: ' + url);
		url = URL.parse(url).pathname;
		var index = -1;
		pathMap.some((item, i) => {
			var pos = url.indexOf(item[0]);
			if (pos !== 0) return;
			index = i;
			return true;
		});
		console.log('    [MATCH]: ' + index);
		if (index < 0) return await next();

		var type = url.match(/\.(\w+)$/);
		if (!type) type = 'vueindex';
		else type = type[1].toLowerCase();
		console.log('    [TYPE]: ' + type);

		var siteFolder = pathMap[index];
		if (type === 'vueindex') {
			let content = VueIndexPages.get(siteFolder[0]);
			if (!content) {
				try {
					content = await FS.readFile(Path.join(siteFolder[1], 'index.html'));
					content = content.toString();
					VueIndexPages.set(siteFolder[0], content);
				}
				catch (err) {
					console.error(url);
					console.error(err);
					content = '文件损坏……';
				}
			}
			ctx.body = content;
			ctx.type = Mime.types.html || 'text/plain';
		}
		else {
			let path = url.replace(siteFolder[0], '');
			path = Path.join(siteFolder[1], path);
			let content;
			try {
				content = await FS.readFile(path);
				if (PlainTextTypes.includes(type)) content = content.toString();
			}
			catch (err) {
				console.error(url);
				console.error(err);
				content = '';
			}
			ctx.body = content;
			ctx.type = Mime.types[type] || 'text/plain';
		}

		await next();
	});
	let server = require('http').createServer(app.callback());
	console.log('Vue-Server Ready');
	return server;
};

module.exports = init;