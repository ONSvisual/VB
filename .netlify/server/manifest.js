export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["css/bootstrap.min.css","css/chosen.css","favicon.png","js/annotations.js","js/chosen.jquery.js","js/chroma.min.js","js/d3-array.js","js/jquery-3.0.0.slim.min.js","js/labelplacer.js","js/simple-statistics.min.js","robots.txt"]),
	mimeTypes: {".css":"text/css",".png":"image/png",".js":"text/javascript",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.mmJCp62g.js","app":"_app/immutable/entry/app.DHSI7m7t.js","imports":["_app/immutable/entry/start.mmJCp62g.js","_app/immutable/chunks/entry.CRIZV7wq.js","_app/immutable/chunks/scheduler.Bp-_oBLJ.js","_app/immutable/chunks/index.Cht2rJgA.js","_app/immutable/entry/app.DHSI7m7t.js","_app/immutable/chunks/scheduler.Bp-_oBLJ.js","_app/immutable/chunks/index.BwxOoqqp.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
