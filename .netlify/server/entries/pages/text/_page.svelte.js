import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1f3ctw2_START -->${$$result.title = `<title>Text</title>`, ""}<meta name="description" content="Add text"><!-- HEAD_svelte-1f3ctw2_END -->`, ""} <section data-svelte-h="svelte-41888p"><h1>Personalise text</h1> <ol><li>See a preview with desktop and mobile views</li> <li>Define source label</li> <li>Define file name (eg. “fig1”)</li> <li>Add captions</li></ol></section> <div class="text-column" data-svelte-h="svelte-dc8h5x"></div>`;
});
export {
  Page as default
};
