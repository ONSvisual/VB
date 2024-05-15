

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/download/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.CH4-8dMD.js","_app/immutable/chunks/scheduler.Bp-_oBLJ.js","_app/immutable/chunks/index.BwxOoqqp.js","_app/immutable/chunks/globals.D0QH3NT1.js","_app/immutable/chunks/currentChoices.Bb1xbpOK.js","_app/immutable/chunks/index.Cht2rJgA.js"];
export const stylesheets = ["_app/immutable/assets/5.BfaxhDJp.css"];
export const fonts = [];
