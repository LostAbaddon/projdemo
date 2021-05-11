const Thread = require('worker_threads');
const VisitPower = 55, VisitPowerDecay = 10;

const init = DB => {
	Thread.parentPort.on('getPromotionChain', request => {
		if (!(request.power >= 0)) request.power = 0;
		var db = DB.indexedContent.get('hash');
		var list = [], hash = request.hash;
		while (true) {
			let rec = db.get(hash);
			if (!rec) break;
			list.push(rec);
			hash = rec.parent;
			if (!hash) break;
		}

		var chainLength = list.length;
		var users = {};
		if (chainLength > 0) {
			let power = VisitPower, decay = VisitPowerDecay;
			list.some((item, i) => {
				var u = item.data.user, p = Math.round(power / VisitPower * request.power);
				if (!!u) users[u] = (users[u] || 0) + p;
				item.data.power = (item.data.power || 0) + p;
				power -= decay;
				decay --;
				if (decay <= 0) return true;
			});

			DB.send('jobdone', {tid: request.tid, result: {len: chainLength, users}});
			DB.requestSaveFile();
		}
		else {
			DB.send('jobdone', {tid: request.tid, result: {len: chainLength, users}});
		}
	});
};

module.exports = init;