import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.OVoQMVCb.js","_app/immutable/chunks/scheduler.Bp-_oBLJ.js","_app/immutable/chunks/index.BwxOoqqp.js","_app/immutable/chunks/stores.IgCWpFPJ.js","_app/immutable/chunks/entry.CRIZV7wq.js","_app/immutable/chunks/index.Cht2rJgA.js","_app/immutable/chunks/currentChoices.Bb1xbpOK.js"];
export const stylesheets = ["_app/immutable/assets/0.RtVCJpXn.css"];
export const fonts = ["_app/immutable/assets/fira-mono-cyrillic-ext-400-normal.B04YIrm4.woff2","_app/immutable/assets/fira-mono-all-400-normal.B2mvLtSD.woff","_app/immutable/assets/fira-mono-cyrillic-400-normal.36-45Uyg.woff2","_app/immutable/assets/fira-mono-greek-ext-400-normal.CsqI23CO.woff2","_app/immutable/assets/fira-mono-greek-400-normal.C3zng6O6.woff2","_app/immutable/assets/fira-mono-latin-ext-400-normal.D6XfiR-_.woff2","_app/immutable/assets/fira-mono-latin-400-normal.DKjLVgQi.woff2"];
