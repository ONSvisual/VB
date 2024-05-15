

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/features/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.DrdSck5M.js","_app/immutable/chunks/scheduler.Bp-_oBLJ.js","_app/immutable/chunks/index.BwxOoqqp.js"];
export const stylesheets = [];
export const fonts = [];
