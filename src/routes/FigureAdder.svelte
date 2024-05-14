<!-- FriendAdder.svelte -->
<script>
    import { db } from "./db";

    export let projectName="dvc9900", chartName, chartScripts, selectedChart, charts
    let figureName
    let status = "";
  
  
    async function setupDB(projectName, figureName, chartName, chartScripts) {
      try {
  
        const id = await db.Projects.add({
            projectName: projectName,
            figures: []
        });

        status = `${projectName} successfully created in DB`;
        
        // Reset form:
        projectName="";
        figureName="";
        chartName = "";
        chartScripts = "";
      } catch (error) {
        status = `Failed to add ${figureName}: ${error}`;
      }
      console.log("setupDB",status)
    }

    async function addFigureToProject(projectName, figureName, chartName, chartScripts) {
      try {
          const id = await db.Projects.where('projectName').equals(projectName).modify(x =>
         x.figures.push({figureName:figureName, chartName:chartName, chartScripts:chartScripts}) );
          status = `${chartName} successfully added to ${projectName} as ${figureName}`;
        // Reset form:
        projectName="";
        figureName="";
        chartName = "";
        chartScripts = "";
      } catch (error) {
        status = `Failed to add ${figureName}: ${error}`;
      }
      console.log("addFigureToProject",status)
    }
  </script>

<tr>
  <td>
    <input type="text" placeholder="Figure name" bind:value={figureName}/>
  </td>
<slot></slot>
  <td>
    <button on:click={()=>{setupDB(projectName, figureName, chartName, chartScripts);addFigureToProject(projectName, figureName, chartName, chartScripts)}}>Save</button>
  </td>
</tr>

<style>
  td{padding:0px 5px 0px 10px}
</style>