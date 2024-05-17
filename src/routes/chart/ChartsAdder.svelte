<script>
    import { db } from "../db";
    import VB from "./VB";
  
    let status = "";
    
    async function addData(chartName, chartScripts) {
      try {
  
        // Add the new friend!
        const id = await db.Templates.add({
            chartName: chartName,
            chartScripts: chartScripts
        });
  
        status = `Friend ${chartName} successfully added. Got id ${id}`;
        
        // Reset form:
        chartName = "";
        chartScripts = "";
      } catch (error) {
        status = "Chart Library is up to date"//`Failed to add ${chartScripts}: ${error}`;
      }
      
    }



    Object.keys(VB.Templates).forEach(e=>addData(e, VB.Templates[e]))
console.log(status)
  </script>
  <!-- <p>{status}</p> -->
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