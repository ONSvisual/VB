<!-- FriendAdder.svelte -->
<script>
    import { db } from "./db";
    import VB from "./VB";
    export let projectName="dvc9900", figureName, chartName, chartScripts, selectedChart, charts

    let status = "";
  
  
    async function setupDB(projectName, figureName, chartName, chartScripts) {
      try {
  
        // Add the new friend!
        const id = await db.Projects.add({
            projectName: projectName,
            figures: []
        });

        // const newChart = await db.Projects.where('projectName').equals(projectName).modify(x =>
        //  x.figures.push({figureName:figureName, chartName:chartName, chartScripts:chartScripts}) );
  
        // const fig = await db.Projects[projectName].add({
        //     figureName: figureName,
        //     chartName: chartName,
        //     chartScripts: chartScripts
        // });
        status = `${projectName} successfully created in DB`;
        
        // Reset form:
        projectName="";
        figureName="";
        chartName = "";
        chartScripts = "";
      } catch (error) {
        status = `Failed to add ${figureName}: ${error}`;
      }
      
    }

    async function addFigureToProject(projectName, figureName, chartName, chartScripts) {
      try {
  
        const id = await db.Projects.where('projectName').equals(projectName).modify(x =>
         x.figures.push({figureName:figureName, chartName:chartName, chartScripts:chartScripts}) );
  
        // const fig = await db.Projects[projectName].add({
        //     figureName: figureName,
        //     chartName: chartName,
        //     chartScripts: chartScripts
        // });
        status = `${chartName} successfully added to ${projectName} as ${figureName}`;
        
        // Reset form:
        projectName="";
        figureName="";
        chartName = "";
        chartScripts = "";
      } catch (error) {
        status = `Failed to add ${figureName}: ${error}`;
      }
      
    }
   // VB.Projects.setupDB(projectName, figureName, chartName, chartScripts)
console.log(status)
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

  <!-- <div>
    
    <fieldset>
      <legend>Add new friend</legend>
      <label>
        Name:
        <input
            type="text"
            bind:value={friendName} />
      </label>
      <br/>
      <label>
        Age:
        <input
          type="number"
          bind:value={friendAge} />
      </label>
      <br />
      <button on:click={addFriend}>Add Friend</button>
    </fieldset>
  </div> -->
  

<style>
  td{padding:0px 5px 0px 10px}
  table{border:1px solid grey}
</style>