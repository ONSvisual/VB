import { c as create_ssr_component } from "../../chunks/ssr.js";
const css = {
  code: "section{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:0.6}ol{font-size:1.5em}h1.svelte-sizmq0{width:100%}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n\\n\\t\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>\\"vis builder</title>\\n\\t<meta name=\\"description\\" content=\\"ONS vis builder\\" />\\n</svelte:head>\\n\\n<section>\\n\\t<h1>Chart choices</h1>\\n\\t<ol>\\n\\t\\t<li>Name your “project” or open an existing one</li>\\n\\t\\t<li>Select charts from the menu for each of the required figures</li>\\n\\t\\t<li>Move to Step 2 to manipulate the data for each chart</li>\\n\\t</ol>\\n</section>\\n\\n<style>\\n:global(section) {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t\\tflex: 0.6;\\n\\t}\\n:global(ol){\\n\\tfont-size: 1.5em;\\n}\\n\\th1 {\\n\\t\\twidth: 100%;\\n\\t}\\n\\n\\t.welcome {\\n\\t\\tdisplay: block;\\n\\t\\tposition: relative;\\n\\t\\twidth: 100%;\\n\\t\\theight: 0;\\n\\t\\tpadding: 0 0 calc(100% * 495 / 2048) 0;\\n\\t}\\n\\n\\t.welcome img {\\n\\t\\tposition: absolute;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t\\ttop: 0;\\n\\t\\tdisplay: block;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAoBQ,OAAS,CACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,IAAI,CAAE,GACP,CACO,EAAG,CACV,SAAS,CAAE,KACZ,CACC,gBAAG,CACF,KAAK,CAAE,IACR"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-yjvqqd_START -->${$$result.title = `<title>&quot;vis builder</title>`, ""}<meta name="description" content="ONS vis builder"><!-- HEAD_svelte-yjvqqd_END -->`, ""} <section data-svelte-h="svelte-lw1s7y"><h1 class="svelte-sizmq0">Chart choices</h1> <ol><li>Name your “project” or open an existing one</li> <li>Select charts from the menu for each of the required figures</li> <li>Move to Step 2 to manipulate the data for each chart</li></ol> </section>`;
});
export {
  Page as default
};
