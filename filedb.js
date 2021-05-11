const Path = require('path');
const FileDB = require('FileDB');

class FileDBPromotion extends FileDB {
	constructor (...args) {
		var cfg = args[1];
		cfg.keys = 'hash';
		cfg.extension = Path.join(__dirname, 'extPromotion.js');
		super(...args);
	}
	getPromotionChain (hash, power) {
		return new Promise(res => {
			if (!this.alive) return res(false);

			var tid = FileDB.regCallback(this.worker, 'getPromotionChain', res);
			this.worker.postMessage({ event: 'getPromotionChain', data: {tid, hash, power} });
		});
	}
}

module.exports = {FileDBPromotion};