<script>
	import { liveQuery } from "dexie";
  	import { db } from "../db";
	import { goto } from '$app/navigation';
	import {now} from "../currentChoices"

	$: projects = liveQuery(async () => {
    const projects = await db.Projects.toArray();
    return projects;
  	});

	$: console.log("projects" , $projects)
function del(projName){
	db.Projects.delete(projName)
}
	async function setupDB(projectName) {
      try {
  
        const id = await db.Projects.add({
            projectName: projectName,
            figures: []
        });

        status = `${projectName} successfully created in DB`;
        
        // Reset form:
        projectName="";

      } catch (error) {
        status = `Failed to add ${figureName}: ${error}`;
      }
      
    }

let newProject
$: console.log("now",$now)
</script>


<svelte:head>
	<title>Text</title>
	<meta name="description" content="Add text" />
</svelte:head>


<section>
	<h1>Set up a project or continue work on an existing project</h1>
	<p style="text-align:center; width:100%">A project is typically a collection of Figures containing charts that will appear in a publication.</p>
</section>
<section>
{#if $projects}
You have {$projects.length} project{$projects.length>1?"s":""} set up:
<table>
	{#each $projects.sort(e=>e.projectName) as project}
	<tr>
		<td><b>{project.projectName}</b>:</td> 
		<td>{project.figures.length} figure{project.figures.length!==1?"s":""}</td> 
		<td><button on:click={()=>{$now.currentProject=project; goto("/chart", {"invalidateAll":true})}}>select</button></td>
		<td><button on:click={()=>del(project.projectName)}>delete</button></td>
	</tr>
	{/each}
</table>
{/if}

<br><br>

Create a new project:<br>
<input type="text" placeholder="e.g. dvc6789" bind:value={newProject}/>
<button on:click={()=>{setupDB(newProject)}}>Add project</button></section>