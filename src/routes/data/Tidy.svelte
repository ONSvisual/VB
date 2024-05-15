<script>
	import {tsvParse, csvParse, tsvFormat,csvFormat} from 'd3-dsv';
	export let csv = '';
    import {now} from "../currentChoices"
    let unedited=true;
    import { db } from "../db";
    let status

    async function updateDB_csv(e) {
        console.log("now",$now)
      try {
          const id = await db.Projects
          .where('projectName')
          .equals($now.currentProject.projectName)
          .modify(x => x.figures
                .find(e=>e.figureName=$now.currentChart.figureName)
                .chartScripts.data_csv=$now.currentChart.chartScripts.data_csv
            );

          status = `${$now.currentChart.figureName} data sucessfully saved`;

      } catch (error) {
        status = `Failed to update ${$now.currentChart.figureName}: ${error}`;
      }
      console.log("data update:",status)
    }

    $: console.log("csv",csv)
	let data = [];
	let columns=[];
	let tidy=[];
	let name = 'column';
	let tidycolumns=[];
	let href ='';
	
	
	function readCSV(csv){
        data=csvParse(csv)
		columns = data.columns
	}

    function readDSV(csv){
        data=tsvParse(csv)
		columns = data.columns
        $now.currentChart.chartScripts.data=csvFormat(tsvParse(csv))
        unedited=false
	}


    $: readCSV(csv) //tsvFormat(csvParse(csv))
</script>


<h2>
Paste your data from Excel
</h2>
<button class:edited={unedited} on:click={updateDB_csv}>Save this data</button>
<textarea style="width:95%" on:input="{e => readDSV(e.target.value)}" rows=20  id="csvdata">{tsvFormat(csvParse(csv))}</textarea>

<p>
	Here's your table
</p>

<div class="tablewrapper">
	<table>
		<thead>
			<tr>
			{#each columns as d}
			<th>{d}</th>
			{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as d}
			<tr>
				{#each Object.keys(d) as e}
				<td>{d[e]}</td>
				{/each}
			</tr>
			{/each}
		</tbody>
	</table>
</div>
<!-- 
<h2>
	Step 2: Choose your columns to merge
</h2>

<label for="columnname">
	Choose a new columns name (optional)
</label>
<input id="columnname" on:input={e=>tidydata(data)} bind:value={name} type="text">

<p>
	Choose which columns to combine
</p>

	{#each columns as d}
	<div class="item">
		<input name="checkboxes" type="checkbox" on:input={e=>tidydata(data)} id={d} value={d}><label for={d}>{d}</label>
	</div>
	
	{/each}

<h2>
	Step 3. Check your tidy data
</h2>
<p>
	Here's your tidy data
</p>

<div class="tablewrapper">
	<table>
		<thead>
			<tr>
			{#each tidycolumns as d}
			<th>{d}</th>
			{/each}
			</tr>
		</thead>
		<tbody>
			{#each tidy as d}
			<tr>
				{#each Object.keys(d) as e}
				<td>{d[e]}</td>
				{/each}
			</tr>
			{/each}
		</tbody>
	</table>
</div>

<h2>
	Step 4. Download your data
</h2>
<p>
	Happy with your new data? Let's download it
</p>
<button>
	<a href={href} download='data.csv'>Download as .csv</a>
</button> -->

<style>
	.tablewrapper{
		height:150px;
		overflow:scroll
	}
	
	thead tr {
    background-color: #206095;
    color: #ffffff;
    text-align: left;
}
	th, td {
    padding: 5px;
	}
	
	tbody tr {
			border-bottom: 1px solid #dddddd;
	}

	tbody tr:nth-of-type(even) {
			background-color: #f3f3f3;
	}

	tbody tr:last-of-type {
			border-bottom: 2px solid #206095;
	}
	.item{
		display:block;
	}
	
	.item *{
		display:inline;
		padding: 5px;
	}
	.edited{
        visibility: hidden;
    }
	
</style>