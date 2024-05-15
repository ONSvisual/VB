import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1f3ctw2_START -->${$$result.title = `<title>Text</title>`, ""}<meta name="description" content="Add text"><!-- HEAD_svelte-1f3ctw2_END -->`, ""} <section data-svelte-h="svelte-1x3hl6i"><h1>Concept</h1> <ol><li>Similar to DataWrapper with tabs</li> <li>For use by datavis newbies</li> <li>Potential for incorporation into future CMS</li> <li>Ability to make multiple charts and download together in one “project” folder</li> <li>Ability to upload a project to manipulate it</li> <li>Modular – not all features need to be developed at once</li></ol></section> <div class="text-column" data-svelte-h="svelte-dc8h5x"></div>`;
});
export {
  Page as default
};
