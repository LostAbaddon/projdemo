const FileDB = require('FileDB');
const {FileDBPromotion} = require('./filedb');
const VueServer = require('./vueserver');
const Socket = require("socket.io");
const SocketConfig = {};

const newID = (len=32) => {
	var result = [];
	for (let i = 0; i < len; i ++) {
		result.push(Math.floor(Math.random() * 36).toString(36));
	}
	return result.join('');
};

// 测试数据
const initHomePage = async db => {
	await Promise.all([
		db.append({
			type: "slidedelay",
			value: 3000
		}),
		db.append({
			type: 'slidepic',
			pic: '/pic/1.jpg',
		}),
		db.append({
			type: 'slidepic',
			pic: '/pic/1.webp',
			desc: '文字说明1'
		}),
		db.append({
			type: 'slidepic',
			pic: '/pic/2.jpg',
		}),
		db.append({
			type: 'slidepic',
			pic: '/pic/2.webp',
			desc: '文字说明2'
		}),
		db.append({
			type: 'slidepic',
			pic: '/pic/3.jpg',
		}),
		db.append({
			type: 'slidepic',
			pic: '/pic/3.webp',
			desc: '文字说明3'
		}),
		db.append({
			type: 'company',
			desc: '<div class="title">关于我们</div><div>海德财税平台（以下简称“海德”）下设上海海德会计师事务所有限公司、上海海德税务师事务所(普通合伙)，分别于2006年和2005年设立，提供会计审计、涉税鉴证税方面的服务。</div><div class="title">专业人员</div><div>目前海德有中国注册会计师16人、中国注册税务师12人、注册内部审计师2人、注册咨询专家2人、会计师8人、其他辅助人员6人。此外，海德有一支专业的海外团队为外商投资企业提供全面、具体、专业的财税服务。</div><div class="title">核心竞争力</div><div>海德致力于中小微企业财税方面的服务，在会计报表审计、涉税鉴证、代理记账、税收咨询和筹划、财务外包等方面具有深厚的理论基础和丰富的实践经验；熟悉境内企业重组、并购等特殊业务的财税政策；凭借对财税法规多年的深入研究、丰富的实际运作经验以及与各级税务机关的良好协调关系，海德对出具的各种财税方案的有效性和可操作性有可控性，能为企业带来实际、稳妥的经济效益。</div><div class="title">海德目前拥有的资质</div><div>上海市高新技术企业认定审计的指定单位；</div><div>上海市浦东新区政府委托审计的指定单位；</div><div>上海市社保审计的多年入围审计单位；</div><div>上海市浦东新区税务局指定的纳税代理申报点；</div><div>入围上海市财政局为小微企业购买代理记账服务的代理记账单位；</div><div>上海市浦东新区税务局指定的涉税鉴证单位。   </div><div class="title">上海海德会计师事务所业务范围</div><div class="subtitle">审计业务：</div><div>企业年度会计报表；贷款专项审计；高新企业认定专项审计；企业股份制改造审；企业破产、清算审计；工程项目预算、决算审计；其它各种特定目的审计。</div><div class="subtitle">会计和管理咨询：</div><div>财务外包、高新企业认定专项辅导；设计或评估企业内部控制制度；工商注册代理和工商咨询；为企业管理、重组、投资、清算等经济活动提供专业咨询意见；提供专业顾问服务、培训财会人员。 </div>'
		}),
		db.append({
			type: 'communication',
			location: [121.527513, 31.220409],
			name: "上海海德税务师事务所",
			position: "上海市浦东新区峨山路613号上海双创产业园C楼103室",
			email: "lostabaddon@foxmail.com",
			phone: "50398689"
		}),
		db.append({
			type: 'worker',
			id: "worker1",
			pic: '/pic/person1.jpg',
			title: '一号税务师',
			name: '吕正人',
		}),
		db.append({
			type: 'worker',
			id: "worker2",
			pic: '/pic/person2.jpg',
			title: '二号税务师',
			name: '吕臻仁',
		}),
		db.append({
			type: 'worker',
			id: "worker3",
			pic: '/pic/person3.jpg',
			title: '三号税务师',
			name: '吕政壬',
		}),
		db.append({
			type: 'worker',
			id: "worker4",
			pic: '/pic/person4.jpg',
			title: '四号税务师',
			name: '吕甄荏',
		}),
	]);
	await db.flush(true);
};
const initFirmNews = async db => {
	await Promise.all([
		db.append({
			id: '0001',
			title: '事务所动态-1',
			desc: '事务所动态消息，第一条',
			content: '<p>事务所动态信息</p><p>第一条</p>',
			stamp: 1619672400000
		}),
		db.append({
			id: '0002',
			title: '事务所动态-2',
			desc: '事务所动态消息，第二条',
			content: '<p>事务所动态信息</p><p>第二条</p>',
			stamp: 1619679600000
		}),
		db.append({
			id: '0003',
			title: '事务所动态-3',
			desc: '事务所动态消息，第三条',
			content: '<p>事务所动态信息</p><p>第三条</p>',
			stamp: 1619686800000
		}),
		db.append({
			id: '0004',
			title: '事务所动态-4',
			desc: '事务所动态消息，第四条',
			content: '<p>事务所动态信息</p><p>第四条</p>',
			stamp: 1619694000000
		}),
		db.append({
			id: '0005',
			title: '事务所动态-5',
			desc: '事务所动态消息，第五条',
			content: '<p>事务所动态信息</p><p>第五条</p>',
			stamp: 1619701200000
		}),
	]);
	await db.flush(true);
};
const initLawsNews = async db => {
	await Promise.all([
		db.append({
			id: '0001',
			title: '法务动态-1',
			desc: '法务动态消息，第一条',
			content: '<p>法务动态信息</p><p>第一条</p>',
			stamp: 1619672400001
		}),
		db.append({
			id: '0002',
			title: '法务动态-2',
			desc: '法务动态消息，第二条',
			content: '<p>法务动态信息</p><p>第二条</p>',
			stamp: 1619679600001
		}),
		db.append({
			id: '0003',
			title: '法务动态-3',
			desc: '法务动态消息，第三条',
			content: '<p>法务动态信息</p><p>第三条</p>',
			stamp: 1619686800001
		}),
		db.append({
			id: '0004',
			title: '法务动态-4',
			desc: '法务动态消息，第四条',
			content: '<p>法务动态信息</p><p>第四条</p>',
			stamp: 1619694000001
		}),
		db.append({
			id: '0005',
			title: '法务动态-5',
			desc: '法务动态消息，第五条',
			content: '<p>法务动态信息</p><p>第五条</p>',
			stamp: 1619701200001
		}),
	]);
	await db.flush(true);
};
const initPromotionInfo = async db => {
	await Promise.all([
		db.append({
			item: 'pics',
			data: ['/pic/1.jpg', '/pic/2.jpg', '/pic/3.jpg', '/pic/1.webg', '/pic/2.webg', '/pic/3.webg']
		}),
		db.append({
			item: 'desc',
			data: "<p>上海海德财税集团（以下简称“海德”）下设上海海德会计师事务所有限公司、上海海德税务师事务所，分别于2006年和2005年经中国国家财政部、税务总局和上海市财政局、上海市注册会计师协会、上海市注册税务师协会批准设立，上海市工商行政管理机关登记注册成立，能为您提供财务、税务等方面全方位、多角度的服务。</p><p>海德拥有一批在财务会计、审计、税收实务、法律顾问、管理咨询等领域的业内资深的中国注册会计师（16人）、中国注册税务师（12人）、注册内部审计师（2人）、注册咨询专家（6人）、律师（2人）。此外，海德有一支专业的海外团队为外商投资企业提供全面、具体、专业的财务与税务服务。我们的团队人员精通英语、法语、西班牙语、日语等各国语言，能满足外商的各项财税需求。 如：外资公司的登记设立、外资设立验资、税务筹划（合理避税筹划、节税筹划、税收转嫁筹划、实现涉税零风险等）、审计、财税咨询等服务。</p><p>海德在涉外审计、验资、代理记账、税收筹划、税务咨询、转让定价、税务代理等方面具有深厚的理论基础和丰富的实践经验；熟悉境内外企业重组、并购等特殊业务的税收政策，有成熟的税收筹划方案。海德已聘请了多位在上海市财税领导岗位上德高望重的老同志，他（她）们都具有三十年以上的财税工作经验，凭借对财税法规多年的深入研究、丰富的实际运作经验以及与各级税务机关的良好协调关系，海德能够确保出具的各种财税方案的有效性和可操作性，为企业带来实际、稳妥的经济效益。</p><p>上海市高新技术企业认定审计的指定单位；上海市浦东新区政府委托审计的指定单位；上海市社保审计的多年入围审计单位；上海市浦东新区税务局指定的纳税代理申报点；上海市财政局指定的代理记账单位；上海市浦东新区税务局指定的涉税鉴证单位。</p>"
		}),
	]);
	await db.flush(true);
};
const initServicePage = async db => {
	await Promise.all([
		db.append({
			id: 'qysdshsqjjzbg',
			type: "鉴证业务",
			name: '企业所得税汇算清缴鉴证报告',
		}),
		db.append({
			id: 'qyksjccssshjzbg',
			type: "鉴证业务",
			name: '企业亏损及财产损失审核鉴证报告',
		}),
		db.append({
			id: 'qyxyzxsssxsjjzbg',
			type: "鉴证业务",
			name: '企业歇业、注销涉税事项审计鉴证报告',
		}),
		db.append({
			id: 'qqsdssqmbksdshsxjzbg',
			type: "鉴证业务",
			name: '企业所得税税前弥补亏损的审核事项鉴证报告',
		}),
		db.append({
			id: 'sdzjnxhjszjtgggfkcblsxdshcjjzbg',
			type: "鉴证业务",
			name: '缩短折旧年限或加速折旧，提高广告费扣除比例事项的审核出具鉴证报告',
		}),
		db.append({
			id: 'qtsssxjzbg',
			type: "鉴证业务",
			name: '其他涉税事项鉴证报告',
		}),
		db.append({
			id: 'dlkybgxyzxswdjsx',
			type: "代理业务",
			name: '办理开业、变更、歇业注销税务登记手续',
		}),
		db.append({
			id: 'blzzsybnsrsx',
			type: "代理业务",
			name: '办理增值税一般纳税人手续',
		}),
		db.append({
			id: 'bljckssywsqckts',
			type: "代理业务",
			name: '代理进出口涉税业务，申请出口退税',
		}),
		db.append({
			id: 'cwwbdljznssbdkfpdsx',
			type: "代理业务",
			name: '财务外包：代理记帐、纳税申报、代开发票等事项',
		}),
		db.append({
			id: 'sqjmsjxsssyhzc',
			type: "代理业务",
			name: '申请减、免税及享受税收优惠政策',
		}),
		db.append({
			id: 'jlcsnkzdhxgljdgn',
			type: "代理业务",
			name: '建立财税内控制度，后续管理监督功能',
		}),
		db.append({
			id: 'tgqtsssxfw',
			type: "代理业务",
			name: '提供其他涉税事项服务',
		}),
		db.append({
			id: 'tgcszxspcncsgwxgcsztpx',
			type: "代理业务",
			name: '提供财税咨询、受聘常年财税顾问，相关财税专题培训',
		}),
	]);
	await db.flush(true);
};
const initServiceInfo = async db => {
	await Promise.all([
		db.append({
			id: 'qysdshsqjjzbg',
			name: '企业所得税汇算清缴鉴证报告',
			detail: '暂时没有内容，请稍后！',
		}),
		db.append({
			id: 'qyksjccssshjzbg',
			name: '企业亏损及财产损失审核鉴证报告',
			detail: '暂时没有内容，请稍后！',
		}),
		db.append({
			id: 'qyxyzxsssxsjjzbg',
			name: '企业歇业、注销涉税事项审计鉴证报告',
			detail: '暂时没有内容，请稍后！',
		}),
		db.append({
			id: 'qqsdssqmbksdshsxjzbg',
			name: '企业所得税税前弥补亏损的审核事项鉴证报告',
			detail: '暂时没有内容，请稍后！',
		}),
		db.append({
			id: 'sdzjnxhjszjtgggfkcblsxdshcjjzbg',
			name: '缩短折旧年限或加速折旧，提高广告费扣除比例事项的审核出具鉴证报告',
			detail: '暂时没有内容，请稍后！',
		}),
		db.append({
			id: 'qtsssxjzbg',
			name: '其他涉税事项鉴证报告',
			detail: '暂时没有内容，请稍后！',
		}),
		db.append({
			id: 'dlkybgxyzxswdjsx',
			name: '办理开业、变更、歇业注销税务登记手续',
			detail: '暂时没有内容，请稍后！',
		}),
		db.append({
			id: 'blzzsybnsrsx',
			name: '办理增值税一般纳税人手续',
			detail: '暂时没有内容，请稍后！',
		}),
		db.append({
			id: 'bljckssywsqckts',
			name: '代理进出口涉税业务，申请出口退税',
			detail: '暂时没有内容，请稍后！',
		}),
		db.append({
			id: 'cwwbdljznssbdkfpdsx',
			name: '财务外包：代理记帐、纳税申报、代开发票等事项',
			detail: '暂时没有内容，请稍后！',
		}),
		db.append({
			id: 'sqjmsjxsssyhzc',
			name: '申请减、免税及享受税收优惠政策',
			detail: '暂时没有内容，请稍后！',
		}),
		db.append({
			id: 'jlcsnkzdhxgljdgn',
			name: '建立财税内控制度，后续管理监督功能',
			detail: '暂时没有内容，请稍后！',
		}),
		db.append({
			id: 'tgqtsssxfw',
			name: '提供其他涉税事项服务',
			detail: '暂时没有内容，请稍后！',
		}),
		db.append({
			id: 'tgcszxspcncsgwxgcsztpx',
			name: '提供财税咨询、受聘常年财税顾问，相关财税专题培训',
			detail: '暂时没有内容，请稍后！',
		}),
	]);
	await db.flush(true);
};

// 数据库
const DBList = new Map();
const prepareDB = (path, opt, onInit) => new Promise(res => {
	var db = new FileDB(path, opt);
	db.onInit(async () => {
		if (db.count === 0 && !!onInit) {
			await onInit(db);
		}
		res(db);
	});
});
const prepareDBPromotion = () => new Promise(res => {
	var db = new FileDBPromotion('./db/promotion.json', {});
	db.onInit(async () => {
		res(db);
	});
});
const preparePromoteInfo = async () => {
	var db = DBList.get('promotionInfo');
	var all = await db.filter(() => true);
	if (!!all.err) {
		console.error(err);
		return;
	}
	all.result.forEach(item => {
		item = item[0];
		PromotionInfo[item.item] = item.data;
	});
};
const prepareCompanyInfo = async () => {
	var db = DBList.get('home');
	var info = await db.filter(item => item.type === 'communication');
	if (!info || !info.result || !(info.result.length > 0)) return;
	info = info.result[0][0];
	for (let key in info) {
		CompanyInfo[key] = info[key];
	}
};
const prepareData = async () => {
	var dbs = await Promise.all([
		prepareDB('./db/home.json', null, initHomePage),
		prepareDB('./db/firm.json', {keys: 'id'}, initFirmNews),
		prepareDB('./db/laws.json', {keys: 'id'}, initLawsNews),
		prepareDB('./db/user.json', {keys: ['username', 'id']}),
		prepareDBPromotion(),
		prepareDB('./db/promotionInfo.json', {keys: 'item'}, initPromotionInfo),
		prepareDB('./db/services.json', {keys: 'id'}, initServicePage),
		prepareDB('./db/servicesInfo.json', {keys: 'id'}, initServiceInfo),
		prepareDB('./db/requests.json', {keys: 'id'}),
	]);
	DBList.set('home', dbs[0]);
	DBList.set('firm', dbs[1]);
	DBList.set('laws', dbs[2]);
	DBList.set('user', dbs[3]);
	DBList.set('promotion', dbs[4]);
	DBList.set('promotionInfo', dbs[5]);
	DBList.set('serviceInfo', dbs[6]);
	DBList.set('serviceDetail', dbs[7]);
	DBList.set('businessRequest', dbs[8]);

	await Promise.all([
		prepareCompanyInfo(),
		preparePromoteInfo(),
	]);
};

// 会话管理
const SessionsByName = new Map();
const SessionsByHash = new Map();

// 其它信息
const PromotionInfo = {};
const CompanyInfo = {};

// 功能实现
const Tools = {};
Tools._updatePromotion = async (hash, power) => {
	var db = DBList.get('promotion');
	var result = {};
	for (let key in PromotionInfo) {
		result[key] = PromotionInfo[key];
	}
	var info = await db.get('hash', hash);
	if (!!info) {
		let user = await DBList.get('user').get('id', info.user);
		result.user = info.user;
		result.name = user.username;
		let chain = await db.getPromotionChain(hash, power);
		result.proDis = chain.len;
		if (power > 0) {
			let db = DBList.get('user');
			let ok = await db.forEach((item, i) => {
				var p = env[item.id] || 0;
				if (p <= 0) return;
				item.power = (item.power || 0) + p;
			}, chain.users);
			if (!ok.err) db.flush();
		}
	}
	else {
		result.proDis = 0;
	}
	return {
		ok: true,
		data: result
	}
};
Tools._getPromotionHash = async (user, last) => {
	var db = DBList.get('promotion');

	// 检查给定的parentID是否有效
	if (!!last) {
		let prev = await db.get('hash', last);
		if (!prev) last = '';
	}
	else {
		last = '';
	}

	if (!user) return last;

	// 检查当前用户是否已经有相应推广了
	var lasts = await db.filter(item => {
		return item.user === env.user && item.parent === env.parent;
	}, {user, parent: last});
	if (lasts.result.length > 0) {
		last = lasts.result[0][0];
		return last.hash;
	}

	// 生成新推广记录
	var hash;
	while (true) {
		hash = newID();
		let has = await db.get('hash', hash);
		if (!has) break;
	}

	var ok = await db.append({ user, hash, parent: last });
	if (!ok) return '';
	return hash;
};
Tools.getHomeInfo = async (hash, visited) => {
	if (!!hash && !visited) {
		Tools._updatePromotion(hash, 10);
	}

	var [infoH, infoF, infoL, infoS] = await Promise.all([
		DBList.get('home').filter(() => true),
		DBList.get('firm').filter(() => true),
		DBList.get('laws').filter(() => true),
		DBList.get('serviceInfo').filter(() => true),
	]);

	if (!!infoH.err) {
		return {
			ok: false,
			err: info.err
		};
	}

	try {
		infoH = infoH.result.map(item => item[0]);
	}
	catch (err) {
		return {
			ok: false,
			err: err.message
		};
	}

	try {
		infoF = infoF.result.map(item => item[0]);
	}
	catch {
		infoF = [];
	}
	infoF.reverse();
	infoF.splice(5, infoF.length);
	infoF.forEach(item => item.type = 'firm');

	try {
		infoL = infoL.result.map(item => item[0]);
	}
	catch {
		infoL = [];
	}
	infoL.reverse();
	infoL.splice(5, infoL.length);
	infoL.forEach(item => item.type = 'laws');

	var news = [...infoF, ...infoL];
	news.sort((a, b) => b.stamp - a.stamp);
	news.splice(5, news.length);
	news.forEach(item => {
		delete item.content;
	});

	infoH.push({
		type: 'news',
		news
	});

	if (!!infoS) {
		infoS = infoS.result.map(item => item[0]);
	}
	else {
		infoS = [];
	}

	infoH.push({
		type: 'services',
		services: infoS
	});

	return {
		ok: true,
		data: infoH
	};
};
Tools.getNewsInfo = async (type, id) => {
	var db;
	if (type === 'firm') db = DBList.get('firm');
	else if (type === 'laws') db = DBList.get('laws');
	else {
		return {
			ok: false,
			err: 'No such news with given type.'
		};
	}

	var news = await db.get('id', id);
	return {
		ok: true,
		data: news
	}
};
Tools.signup = async (username, password, company) => {
	var db = DBList.get('user');
	var user = await db.get('username', username);
	if (!!user) {
		return {
			ok: false,
			err: '用户名重复',
		};
	}
	user = await db.append({username, password, company, time: Date.now(), id: newID()});
	if (!user) {
		return {
			ok: false,
			err: '创建用户失败'
		}
	}
	return {
		ok: true,
	};
};
Tools.signin = async (username, password) => {
	var db = DBList.get('user');
	var user = await db.get('username', username);
	if (!user) {
		return {
			ok: false,
			err: '用户名错误',
		};
	}
	if (user.password !== password) {
		return {
			ok: false,
			err: '登录失败'
		};
	}

	var sessionID = newID(64);
	var session = SessionsByName.get(username);
	if (!!session && !!session.hash) {
		SessionsByHash.delete(session.hash);
	}
	session = {
		user: user.id,
		name: username,
		hash: sessionID
	};
	SessionsByName.set(username, session);
	SessionsByHash.set(sessionID, session);

	return {
		ok: true,
		session: sessionID,
		name: user.username,
		company: user.company,
	};
};
Tools.newPromote = async (user, lastPromotion) => {
	var db = DBList.get('promotion');

	// 获得推广哈希
	var hash = await Tools._getPromotionHash(user.user, lastPromotion);
	if (!hash) {
		return {
			ok: false,
			err: '生成推广ID失败'
		}
	}

	return {
		ok: true,
		data: hash
	};
};
Tools.getPromotion = async (hash, visited=true, session) => {
	var user = null;
	if (!!session) {
		user = SessionsByHash.get(session);
		if (!!user) {
			user = user.id;
		}
	}

	var [result, hash] = await Promise.all([
		Tools._updatePromotion(hash, !!visited ? 0 : 5),
		Tools._getPromotionHash(user, hash)
	]);
	result.data.promotionHash = hash;
	return result;
};
Tools._getServiceList = async () => {
	var db = DBList.get('serviceInfo');
	var infos = await db.filter(() => true);
	if (!!infos) {
		infos = infos.result.map(item => item[0]);
	}
	else {
		infos = [];
	}
	return infos;
};
Tools._getMyServiceRequest = async (session) => {
	if (!session) return [];
	var user = SessionsByHash.get(session);
	if (!user) return [];

	var db = DBList.get('businessRequest');
	var list = await db.filter((item) => {
		return item.user === env.user;
	}, {user: user.id});
	list = list.result.map(item => item[0]);
	return list;
};
Tools.getServiceInfo = async (hash, visited=true, session) => {
	if (!!hash && !visited) {
		Tools._updatePromotion(hash, 20);
	}

	var [infoL, infoM] = await Promise.all([
		Tools._getServiceList(),
		Tools._getMyServiceRequest(session),
	]);

	return {
		ok: true,
		data: {
			company: CompanyInfo,
			service: infoL,
			mine: infoM
		}
	};
};
Tools.getServiceDetail = async (id) => {
	var db = DBList.get('serviceDetail');
	var info = await db.get('id', id);
	if (!info) return {
		ok: false,
		err: '查无指定业务内容'
	};
	return {
		ok: true,
		data: info,
	};
};
Tools.getUserInfo = async (session) => {
	var user = SessionsByHash.get(session);
	if (!user) {
		user = {};
	}
	else {
		let db = DBList.get('user');
		let info = await db.get('id', user.user);
		user.id = user.user;
		delete user.hash;
		user.company = info.company;
	}
	return {
		ok: true,
		data: user,
	}
};
Tools.sendBusinessRequest = async (user, service, content) => {
	var db = DBList.get('businessRequest');
	var id = newID(64);
	var ok = await db.append({
		id,
		user: user.user,
		category: service,
		content: content,
		reply: '',
		submitAt: Date.now(),
		replyAt: 0,
		done: false,
	});
	return {ok};
};

// 无须身份验证
const RegisterCommonService = (socket) => {
	var register = event => {
		socket.on(event, async (taskID, ...args) => {
			var result = Tools[event];
			if (!result) {
				socket.emit(event, taskID, {
					ok: false,
					err: "No Such Event"
				});
				return;
			}
			result = await result(...args, socket);
			socket.emit(event, taskID, result);
		});
	};
	register('getHomeInfo');
	register('getNewsInfo');
	register('signup');
	register('signin');
	register('getPromotion');
	register('getServiceInfo');
	register('getServiceDetail');
	register('getUserInfo');
};
// 须身份验证
const RegisterSessionService = (socket) => {
	var register = event => {
		socket.on(event, async (taskID, session, ...args) => {
			var user = SessionsByHash.get(session);
			if (!user) {
				socket.emit(event, taskID, {
					ok: false,
					needLogin: true,
					err: "No Such User"
				});
				return;
			}

			var result = Tools[event];
			if (!result) {
				socket.emit(event, taskID, {
					ok: false,
					err: "No Such Event"
				});
				return;
			}
			result = await result(user, ...args, socket);
			socket.emit(event, taskID, result);
		});
	};
	register('newPromote');
	register('sendBusinessRequest');
};

var io;
const init = async () => {
	await prepareData();

	var cfg = require('./config.json');
	cfg.port = cfg.port || 3000;
	cfg.site = cfg.site || {};

	SocketConfig.cors = {
		origin: '*',
		methods: ["GET", "POST"]
	};

	var server = VueServer(cfg.site);
	io = Socket(server, SocketConfig);

	io.on("connection", socket => {
		console.log('Node-SocketIO connected... (' + socket.id + ')');

		// 无须身份认证
		RegisterCommonService(socket);

		// 须身份认证
		RegisterSessionService(socket);
	});

	console.log('Node-SocketIO Ready');

	server.listen(cfg.port);
};
init();