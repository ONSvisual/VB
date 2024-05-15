import { c as create_ssr_component, a as subscribe, b as add_attribute, v as validate_component } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { n as now } from "../../chunks/currentChoices.js";
const css$1 = {
  code: "header.svelte-1l9me5u.svelte-1l9me5u{display:flex;justify-content:space-between}.corner.svelte-1l9me5u.svelte-1l9me5u{width:3em;height:3em}nav.svelte-1l9me5u.svelte-1l9me5u{display:flex;justify-content:center;--background:rgba(255, 255, 255, 0.7)}svg.svelte-1l9me5u.svelte-1l9me5u{width:2em;height:3em;display:block}path.svelte-1l9me5u.svelte-1l9me5u{fill:var(--background)}ul.svelte-1l9me5u.svelte-1l9me5u{position:relative;padding:0;margin:0;height:3em;display:flex;justify-content:center;align-items:center;list-style:none;background:var(--background);background-size:contain}li.svelte-1l9me5u.svelte-1l9me5u{position:relative;height:100%}li[aria-current='page'].svelte-1l9me5u.svelte-1l9me5u::before{--size:6px;content:'';width:0;height:0;position:absolute;top:0;left:calc(50% - var(--size));border:var(--size) solid transparent;border-top:var(--size) solid var(--color-theme-1)}nav.svelte-1l9me5u a.svelte-1l9me5u{display:flex;height:100%;align-items:center;padding:0 0.5rem;color:var(--color-text);font-weight:700;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;transition:color 0.2s linear}a.svelte-1l9me5u.svelte-1l9me5u:hover{color:var(--color-theme-1)}.greyed.svelte-1l9me5u.svelte-1l9me5u{color:lightgrey;pointer-events:none}",
  map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script>\\n\\timport { page } from '$app/stores';\\n\\timport { now } from \\"./currentChoices\\"\\n\\n\\t$: visibility = $now.currentProject?false:true\\n\\n<\/script>\\n\\n<header>\\n\\t<div class=\\"corner\\">\\n\\t</div>\\n\\n\\t<nav>\\n\\t\\t<svg viewBox=\\"0 0 2 3\\" aria-hidden=\\"true\\">\\n\\t\\t\\t<path d=\\"M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z\\" />\\n\\t\\t</svg>\\n\\t\\t<ul>\\n\\t\\t\\t<li aria-current={$page.url.pathname === '/project' ? 'page' : undefined}>\\n\\t\\t\\t\\t<a href=\\"/project\\" >0. Projects</a>\\n\\t\\t\\t</li>\\n\\t\\t\\t<li aria-current={$page.url.pathname === '/chart' ? 'page' : undefined} class:greyed={visibility}>\\n\\t\\t\\t\\t<a href=\\"/chart\\" class:greyed={visibility}>1. Chart choices</a>\\n\\t\\t\\t</li>\\n\\t\\t\\t<li aria-current={$page.url.pathname === '/data' ? 'page' : undefined} class:greyed={visibility}>\\n\\t\\t\\t\\t<a href=\\"/data\\" class:greyed={visibility}>2. Replace datasets</a>\\n\\t\\t\\t</li>\\n\\t\\t\\t<li aria-current={$page.url.pathname.startsWith('/tweak') ? 'page' : undefined} class:greyed={visibility}>\\n\\t\\t\\t\\t<a href=\\"/tweak\\" class:greyed={visibility}>3. Tweak charts</a>\\n\\t\\t\\t</li>\\n\\t\\t\\t<li aria-current={$page.url.pathname.startsWith('/features') ? 'page' : undefined} class:greyed={visibility}>\\n\\t\\t\\t\\t<a href=\\"/features\\" class:greyed={visibility}>4. Add features</a>\\n\\t\\t\\t</li>\\n\\t\\t\\t<li aria-current={$page.url.pathname.startsWith('/download') ? 'page' : undefined} class:greyed={visibility}>\\n\\t\\t\\t\\t<a href=\\"/download\\" class:greyed={visibility}>5. Download</a>\\n\\t\\t\\t</li>\\n\\t\\t\\t<!-- <li aria-current={$page.url.pathname.startsWith('/help') ? 'page' : undefined}>\\n\\t\\t\\t\\t<a href=\\"/help\\">help</a>\\n\\t\\t\\t</li> -->\\n\\t\\t</ul>\\n\\t\\t<svg viewBox=\\"0 0 2 3\\" aria-hidden=\\"true\\">\\n\\t\\t\\t<path d=\\"M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z\\" />\\n\\t\\t</svg>\\n\\t</nav>\\n\\n\\t<div class=\\"corner\\">\\n\\t</div>\\n</header>\\n\\n<style>\\n\\theader {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-between;\\n\\t}\\n\\n\\t.corner {\\n\\t\\twidth: 3em;\\n\\t\\theight: 3em;\\n\\t}\\n\\n\\t.corner a {\\n\\t\\tdisplay: flex;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t}\\n\\n\\t.corner img {\\n\\t\\twidth: 2em;\\n\\t\\theight: 2em;\\n\\t\\tobject-fit: contain;\\n\\t}\\n\\n\\tnav {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\t--background: rgba(255, 255, 255, 0.7);\\n\\t}\\n\\n\\tsvg {\\n\\t\\twidth: 2em;\\n\\t\\theight: 3em;\\n\\t\\tdisplay: block;\\n\\t}\\n\\n\\tpath {\\n\\t\\tfill: var(--background);\\n\\t}\\n\\n\\tul {\\n\\t\\tposition: relative;\\n\\t\\tpadding: 0;\\n\\t\\tmargin: 0;\\n\\t\\theight: 3em;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t\\tlist-style: none;\\n\\t\\tbackground: var(--background);\\n\\t\\tbackground-size: contain;\\n\\t}\\n\\n\\tli {\\n\\t\\tposition: relative;\\n\\t\\theight: 100%;\\n\\t}\\n\\n\\tli[aria-current='page']::before {\\n\\t\\t--size: 6px;\\n\\t\\tcontent: '';\\n\\t\\twidth: 0;\\n\\t\\theight: 0;\\n\\t\\tposition: absolute;\\n\\t\\ttop: 0;\\n\\t\\tleft: calc(50% - var(--size));\\n\\t\\tborder: var(--size) solid transparent;\\n\\t\\tborder-top: var(--size) solid var(--color-theme-1);\\n\\t}\\n\\n\\tnav a {\\n\\t\\tdisplay: flex;\\n\\t\\theight: 100%;\\n\\t\\talign-items: center;\\n\\t\\tpadding: 0 0.5rem;\\n\\t\\tcolor: var(--color-text);\\n\\t\\tfont-weight: 700;\\n\\t\\tfont-size: 0.8rem;\\n\\t\\ttext-transform: uppercase;\\n\\t\\tletter-spacing: 0.1em;\\n\\t\\ttext-decoration: none;\\n\\t\\ttransition: color 0.2s linear;\\n\\t}\\n\\n\\ta:hover {\\n\\t\\tcolor: var(--color-theme-1);\\n\\t}\\n\\n\\t.greyed{\\n\\t\\tcolor:lightgrey;\\n\\t\\tpointer-events: none;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAiDC,oCAAO,CACN,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAClB,CAEA,qCAAQ,CACP,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GACT,CAgBA,iCAAI,CACH,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,YAAY,CAAE,wBACf,CAEA,iCAAI,CACH,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,KACV,CAEA,kCAAK,CACJ,IAAI,CAAE,IAAI,YAAY,CACvB,CAEA,gCAAG,CACF,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,IAAI,YAAY,CAAC,CAC7B,eAAe,CAAE,OAClB,CAEA,gCAAG,CACF,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IACT,CAEA,EAAE,CAAC,YAAY,CAAC,MAAM,+BAAC,QAAS,CAC/B,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,MAAM,CAAC,CAAC,CAC7B,MAAM,CAAE,IAAI,MAAM,CAAC,CAAC,KAAK,CAAC,WAAW,CACrC,UAAU,CAAE,IAAI,MAAM,CAAC,CAAC,KAAK,CAAC,IAAI,eAAe,CAClD,CAEA,kBAAG,CAAC,gBAAE,CACL,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CACZ,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,CAAC,CAAC,MAAM,CACjB,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,MAAM,CACjB,cAAc,CAAE,SAAS,CACzB,cAAc,CAAE,KAAK,CACrB,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,MACxB,CAEA,+BAAC,MAAO,CACP,KAAK,CAAE,IAAI,eAAe,CAC3B,CAEA,qCAAO,CACN,MAAM,SAAS,CACf,cAAc,CAAE,IACjB"}`
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let visibility;
  let $now, $$unsubscribe_now;
  let $page, $$unsubscribe_page;
  $$unsubscribe_now = subscribe(now, (value) => $now = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css$1);
  visibility = $now.currentProject ? false : true;
  $$unsubscribe_now();
  $$unsubscribe_page();
  return `<header class="svelte-1l9me5u"><div class="corner svelte-1l9me5u" data-svelte-h="svelte-nlrnbf"></div> <nav class="svelte-1l9me5u"><svg viewBox="0 0 2 3" aria-hidden="true" class="svelte-1l9me5u"><path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" class="svelte-1l9me5u"></path></svg> <ul class="svelte-1l9me5u"><li${add_attribute("aria-current", $page.url.pathname === "/project" ? "page" : void 0, 0)} class="svelte-1l9me5u"><a href="/project" class="svelte-1l9me5u" data-svelte-h="svelte-1n0qxoy">0. Projects</a></li> <li${add_attribute("aria-current", $page.url.pathname === "/chart" ? "page" : void 0, 0)} class="${["svelte-1l9me5u", visibility ? "greyed" : ""].join(" ").trim()}"><a href="/chart" class="${["svelte-1l9me5u", visibility ? "greyed" : ""].join(" ").trim()}" data-svelte-h="svelte-1wyzz1n">1. Chart choices</a></li> <li${add_attribute("aria-current", $page.url.pathname === "/data" ? "page" : void 0, 0)} class="${["svelte-1l9me5u", visibility ? "greyed" : ""].join(" ").trim()}"><a href="/data" class="${["svelte-1l9me5u", visibility ? "greyed" : ""].join(" ").trim()}" data-svelte-h="svelte-16rvs6f">2. Replace datasets</a></li> <li${add_attribute(
    "aria-current",
    $page.url.pathname.startsWith("/tweak") ? "page" : void 0,
    0
  )} class="${["svelte-1l9me5u", visibility ? "greyed" : ""].join(" ").trim()}"><a href="/tweak" class="${["svelte-1l9me5u", visibility ? "greyed" : ""].join(" ").trim()}" data-svelte-h="svelte-10psale">3. Tweak charts</a></li> <li${add_attribute(
    "aria-current",
    $page.url.pathname.startsWith("/features") ? "page" : void 0,
    0
  )} class="${["svelte-1l9me5u", visibility ? "greyed" : ""].join(" ").trim()}"><a href="/features" class="${["svelte-1l9me5u", visibility ? "greyed" : ""].join(" ").trim()}" data-svelte-h="svelte-1tc7rh7">4. Add features</a></li> <li${add_attribute(
    "aria-current",
    $page.url.pathname.startsWith("/download") ? "page" : void 0,
    0
  )} class="${["svelte-1l9me5u", visibility ? "greyed" : ""].join(" ").trim()}"><a href="/download" class="${["svelte-1l9me5u", visibility ? "greyed" : ""].join(" ").trim()}" data-svelte-h="svelte-n6y1v3">5. Download</a></li> </ul> <svg viewBox="0 0 2 3" aria-hidden="true" class="svelte-1l9me5u"><path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" class="svelte-1l9me5u"></path></svg></nav> <div class="corner svelte-1l9me5u" data-svelte-h="svelte-nlrnbf"></div> </header>`;
});
const css = {
  code: ".app.svelte-8o1gnw{display:flex;flex-direction:column;min-height:100vh}main.svelte-8o1gnw{flex:1;display:flex;flex-direction:column;padding:1rem;width:100%;max-width:64rem;margin:0 auto;box-sizing:border-box}footer.svelte-8o1gnw{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:12px}@media(min-width: 480px){footer.svelte-8o1gnw{padding:12px 0}}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script>\\r\\n\\r\\n\\timport Header from './Header.svelte';\\r\\n\\timport './styles.css';\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"app\\">\\r\\n\\t<Header />\\r\\n\\r\\n\\t<main>\\r\\n\\t\\t<slot />\\r\\n\\t</main>\\r\\n\\r\\n\\t<footer>\\r\\n\\t\\t\\r\\n\\t</footer>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t.app {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: column;\\r\\n\\t\\tmin-height: 100vh;\\r\\n\\t}\\r\\n\\r\\n\\tmain {\\r\\n\\t\\tflex: 1;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: column;\\r\\n\\t\\tpadding: 1rem;\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\tmax-width: 64rem;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tbox-sizing: border-box;\\r\\n\\t}\\r\\n\\r\\n\\tfooter {\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-direction: column;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t\\talign-items: center;\\r\\n\\t\\tpadding: 12px;\\r\\n\\t}\\r\\n\\r\\n\\tfooter a {\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t}\\r\\n\\r\\n\\t@media (min-width: 480px) {\\r\\n\\t\\tfooter {\\r\\n\\t\\t\\tpadding: 12px 0;\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAmBC,kBAAK,CACJ,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,UAAU,CAAE,KACb,CAEA,kBAAK,CACJ,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,UACb,CAEA,oBAAO,CACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,OAAO,CAAE,IACV,CAMA,MAAO,YAAY,KAAK,CAAE,CACzB,oBAAO,CACN,OAAO,CAAE,IAAI,CAAC,CACf,CACD"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="app svelte-8o1gnw">${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main class="svelte-8o1gnw">${slots.default ? slots.default({}) : ``}</main> <footer class="svelte-8o1gnw" data-svelte-h="svelte-owhq1p"></footer> </div>`;
});
export {
  Layout as default
};
