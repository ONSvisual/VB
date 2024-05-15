

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/tweak/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/10.CwFPbfME.js","_app/immutable/chunks/scheduler.Bp-_oBLJ.js","_app/immutable/chunks/index.BwxOoqqp.js","_app/immutable/chunks/globals.D0QH3NT1.js","_app/immutable/chunks/db.CGQORNKK.js","_app/immutable/chunks/currentChoices.Bb1xbpOK.js","_app/immutable/chunks/index.Cht2rJgA.js"];
export const stylesheets = ["_app/immutable/assets/10.BqgSNNzD.css","_app/immutable/assets/FigureAdder.CDXWFOs_.css"];
export const fonts = [];
