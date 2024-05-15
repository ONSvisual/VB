

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/text/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.e3ejqHnh.js","_app/immutable/chunks/scheduler.Bp-_oBLJ.js","_app/immutable/chunks/index.BwxOoqqp.js"];
export const stylesheets = [];
export const fonts = [];
