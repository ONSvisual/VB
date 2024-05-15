import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape, f as each, n as noop } from "../../../chunks/ssr.js";
import { liveQuery } from "dexie";
import { d as db } from "../../../chunks/db.js";
import "../../../chunks/client.js";
import { n as now } from "../../../chunks/currentChoices.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let projects;
  let $now, $$unsubscribe_now;
  let $projects, $$unsubscribe_projects = noop, $$subscribe_projects = () => ($$unsubscribe_projects(), $$unsubscribe_projects = subscribe(projects, ($$value) => $projects = $$value), projects);
  $$unsubscribe_now = subscribe(now, (value) => $now = value);
  let newProject;
  $$subscribe_projects(projects = liveQuery(async () => {
    const projects2 = await db.Projects.toArray();
    return projects2;
  }));
  {
    console.log("projects", $projects);
  }
  {
    console.log("now", $now);
  }
  $$unsubscribe_now();
  $$unsubscribe_projects();
  return `${$$result.head += `<!-- HEAD_svelte-1f3ctw2_START -->${$$result.title = `<title>Text</title>`, ""}<meta name="description" content="Add text"><!-- HEAD_svelte-1f3ctw2_END -->`, ""} <section data-svelte-h="svelte-c96jt4"><h1>Set up a project or continue work on an existing project</h1> <p style="text-align:center; width:100%">A project is typically a collection of Figures containing charts that will appear in a publication.</p></section> <section>${$projects ? `You have ${escape($projects.length)} project${escape($projects.length > 1 ? "s" : "")} set up:
<table>${each($projects.sort((e) => e.projectName), (project) => {
    return `<tr><td><b>${escape(project.projectName)}</b>:</td> <td>${escape(project.figures.length)} figure${escape(project.figures.length !== 1 ? "s" : "")}</td> <td><button data-svelte-h="svelte-1ghd1ce">select</button></td> <td><button data-svelte-h="svelte-tfpxh1">delete</button></td> </tr>`;
  })}</table>` : ``} <br><br>

Create a new project:<br> <input type="text" placeholder="e.g. dvc6789"${add_attribute("value", newProject, 0)}> <button data-svelte-h="svelte-uvbtwv">Add project</button></section>`;
});
export {
  Page as default
};
