<!-- chartList.svelte -->
<script>
	import { liveQuery } from "dexie";
	import { db } from "../db";
	import FigureAdder from "../FigureAdder.svelte";
	import {onMount} from "svelte"
	import {now} from "../currentChoices"
	import { HSplitPane } from 'svelte-split-pane'
	let config, script, chartCss, chosenName, currentProject, figureName, loaded=0
	
	async function updateDB_config(e) {
        console.log("now",$now)
      try {
          const id = await db.Projects
          .where('projectName')
          .equals($now.currentProject.projectName)
          .modify(x => x.figures
                .find(e=>e.figureName=$now.currentChart.figureName)
                .chartScripts.config_js=$now.currentChart.chartScripts.config_js
            );

          status = `${$now.currentChart.figureName} data sucessfully saved`;

      } catch (error) {
        status = `Failed to update ${$now.currentChart.figureName}: ${error}`;
      }
      console.log("data update:",status)
    }
	


  
	//$: currentProject = (sessionStorage && sessionStorage.project) ? JSON.parse(sessionStorage.project) : {}
  
	let loadProject=(pr)=>{
	  console.log ("pr", pr)
  
	  if (pr && pr.figures) $now.currentChart = pr.figures[0]
	  if ($now.currentChart) populate(
		$now.currentChart.chartName,
      $now.currentChart.chartScripts.config_js,
      $now.currentChart.chartScripts.script_js,
      $now.currentChart.chartScripts.data_csv,
      $now.currentChart.chartScripts.chart_css,
      $now.currentChart.chartScripts.comparison_csv
	  );
	  loaded=1
	}
  
   //$: loadProject($now.currentProject)
  
	function populate(
	  chartName,
	  conf,
	  scr,
	  data,
	  css,
	  comparison,
	  graphic_data,
	  size,
	  namesUnique,
	  load,
	  categoriesUnique,
	  groups,
	  legendItem,
	  svg,
	  calculatedChartWidth,
	  i,
	  xDomain,
	  divs,
	  svgs,
	  fullwidth,
	  chart_width,
	  yAxis,
	  uniqueOptions,
	  dateformat,
	  dateparse,
	  sliderDomain,
	  sliderSimple,
	  t,
	  keys,
	  grouped_data,
	  var_group,
	  var_group2,
	  var_group3,
	  columnNames,
	  numbers,
	  dataPivoted,
	  breaks,
	  colour,
	  key,
	  legendx,
	  popTotal,
	  graphic_data_new,
	  maxPercentage,
	  height,
	  xLeft,
	  xRight,
	  y,
	  widths,
	  dataForLegend,
	  titleDivs,
	  formatNo,
	  x,
	  groupedData,
	  xcategories,
	  plots,
	  chart,
	  headers,
	  rows,
	  splitBar,
	  splitBarInner,
	  finalrow
	) {
	  if ( document.querySelector("#accessibleSummary")){
		document.querySelector("#accessibleSummary").innerHTML = "";
		document.querySelector("#select").innerHTML = "";
		document.querySelector("#legend").innerHTML = "";
		document.querySelector("#graphic").innerHTML = "";
		document.querySelector("#source").innerHTML = "";
  
	  let csvString = data;
	  sessionStorage.data = csvString
		.replace(/(?:\r\n|\r|\n)/g, "\\n")
		.slice(0, -2);
  
	  sessionStorage.config = conf; //.replace("data.csv",encodeURIComponent(csvString))
	  config = eval(sessionStorage.config);
	  //console.log(JSON.stringify(config));
  
	  sessionStorage.script =
		scr.replace(
		  "d3.csv(config.essential.graphic_data_url",
		  "load = (config) => Promise.resolve(d3.csvParse(`" +
			sessionStorage.data +
			"`)"
		) +
		" load(" +
		JSON.stringify(config) +
		")";
	  //console.log("script", sessionStorage.script);
	  script = eval(sessionStorage.script);
	  chartCss = css;
	  return config;
	}
	}
  
	if($now.currentProject) $now.currentChart=$now.currentProject.figures[0]
  
	$: $now.currentChart &&
	  populate(
		$now.currentChart.chartName,
      $now.currentChart.chartScripts.config_js,
      $now.currentChart.chartScripts.script_js,
      $now.currentChart.chartScripts.data_csv,
      $now.currentChart.chartScripts.chart_css,
      $now.currentChart.chartScripts.comparison_csv
	  );
	
	  onMount(()=>loadProject($now.currentProject))

	let saveChart = () => 1;
	//$: console.log("chosenName", chosenName);

	$: $now.currentChart && updateDB_config()
  </script>
  
  <svelte:head>
	{#if $now.currentChart}
	{@html `<style type="text/css" id="injectedStyle"> ${$now.currentChart.chartScripts.chart_css} <\/style>`}
	{/if}
  </svelte:head>
  {#if 1}



    <div class="left">
      <!--This is what D3 renders-->
<div class="chartBox">
	<h5 id="accessibleSummary" class="visuallyhidden">.</h5>
	<div id="select"></div>
	<div aria-hidden="true" id="legend"></div>
	<div id="graphic" aria-hidden="true"></div>
	<h5 id="source">.</h5>
  </div>
  <!--End of what D3 renders-->
    </div>

    <div class="right">

{#if $now.currentChart}
  {#if $now.currentChart.config.essential}
  <a
	href={$now.currentChart.config.essential.graphic_data_url}
	target="_blank"
	rel="noreferrer"
	download="data.csv">
	<h3 style:color="slategrey">data source</h3>
  </a>
  <input
	type="url"
	class="full"
	on:change={(e) => {
	  $now.currentChart.config.essential.graphic_data_url = e.target.value
	  config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
	  
	}}
	value={$now.currentChart.config.essential.graphic_data_url} />
 
{/if}

{#each Object.keys($now.currentChart.config) as main, i}
  {#if main != 'elements' && main !== 'chart_build'}
	<h1 style:color="#666">config: {main}</h1>
	{#each Object.keys($now.currentChart.config[main]) as sub, ii}
	  {#if sub !== 'graphic_data_url'}
		{#if main == 'css'}
		  <h3
			style:color="slategrey"
			on:mouseover={document
			  .querySelectorAll(sub)
			  .forEach((element) => {
				element.classList.add('highlighted')
			  })}
			on:mouseout={document
			  .querySelectorAll(sub)
			  .forEach((element) => {
				element.classList.remove('highlighted')
			  })}>
			{sub}
		  </h3>
		{:else}
		  <h3 style:color="slategrey">{sub}</h3>
		{/if}

		{#if $now.currentChart.config.chart_build}
		  {#if $now.currentChart.config.chart_build[sub] == 'number'}
			<input
			  type="number"
			  bind:value={$now.currentChart.config[main][sub]}
			  on:change={(e) => {
				$now.currentChart.config[main][sub] = e.target.value
				config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
				
			  }} />
		  {:else if $now.currentChart.config.chart_build[sub] == 'radio'}
			<div>
			  {#each $now.currentChart.config.chart_build[sub + '_options'] as option}
				<label for={option}>{option}</label>
				<input
				  type="radio"
				  name={$now.currentChart.config.chart_build[sub]}
				  id={option}
				  bind:value={option}
				  checked={option == $now.currentChart.config[main][sub]}
				  on:change={(e) => {
					$now.currentChart.config[main][sub] = e.target.value
					config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
				  }} />
			  {/each}
			</div>
		  {:else if $now.currentChart.config.chart_build[sub] == 'colour'}
			<div>

			  {#each $now.currentChart.config.chart_build[sub + '_options'] as option, i}
				<label for={option}>{option}:</label>
				<input
				  type="color"
				  name={$now.currentChart.config.chart_build[sub][i]}
				  id={option}
				  bind:value={option}
				  on:change={(e) => {
					$now.currentChart.config[main][sub][i] = e.target.value
					config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
				  }} />
			  {/each}
			</div>
		  {:else if $now.currentChart.config.chart_build[sub] == 'textarea'}
			<textarea
			  class="full"
			  type="text"
			  name={$now.currentChart.config.chart_build[sub]}
			  id={$now.currentChart.config.chart_build[sub]}
			  bind:value={$now.currentChart.config[main][sub]}
			  on:change={(e) => {
				$now.currentChart.config[main][sub] = e.target.value
				config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
				
			  }} />
		  {:else if $now.currentChart.config.chart_build[sub] == 'dThreeFormat'}
			<select
			  class="full"
			  bind:value={$now.currentChart.config[main][sub]}
			  on:change={(e) => {
				$now.currentChart.config[main][sub] = e.target.value
				config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
				
			  }}>
			  {#each d3Format as option, i}
				<option value={option[1]}>
				  {option[0]} ({option[1]})
				</option>
			  {/each}
			</select>
		  {:else if typeof $now.currentChart.config[main][sub] == 'object'}
			{#each Object.keys($now.currentChart.config[main][sub]) as subsub}
			  {#if typeof $now.currentChart.config[main][sub][subsub] == 'object'}
				<h4>Object {subsub}</h4>
				<div>
				  {#each Object.keys($now.currentChart.config[main][sub][subsub]) as subsubsub}
					<label for={'field_' + subsubsub} class="label">
					  {subsubsub}:
					</label>
					<input
					  type="number"
					  class="full"
					  id="field_{subsubsub}"
					  on:change={(e) => {
						$now.currentChart.config[main][sub][subsub][subsubsub] = e.target.value
						config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
					  }}
					  value={$now.currentChart.config[main][sub][subsub][subsubsub]} />
				  {/each}
				</div>
			  {:else if main=="css"}
				<label for={'field_' + subsub} class="label">
				  {subsub}:
				</label>
				<input
				  type="text"
				  class="full"
				  id="field_css_{sub}_{subsub}"
				  on:change={(e) => {
					$now.currentChart.config[main][sub][subsub] = e.target.value
					config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
					//NEED TO ADD NEW CSS * ** *** ****
				  }}
				  value={$now.currentChart.config[main][sub][subsub]} />
			  {/if}
			{/each}
		  {:else}
			<textarea
			  class="full"
			  on:change={(e) => {
				$now.currentChart.config[main][sub] = e.target.value
				config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
				
			  }}
			  value={$now.currentChart.config[main][sub]} />
		  {/if}
		{:else if typeof $now.currentChart.config[main][sub] == 'object'}
		  {#each Object.keys($now.currentChart.config[main][sub]) as subsub}
			{#if typeof $now.currentChart.config[main][sub][subsub] == 'object'}
			  <h4>{subsub}</h4>
			  <div>
				{#each Object.keys($now.currentChart.config[main][sub][subsub]) as subsubsub}
				  {#if typeof $now.currentChart.config[main][sub][subsub][subsubsub] == 'string' && $now.currentChart.config[main][sub][subsub][subsubsub][0] == '#'}
					<label for="colour_{subsubsub}">{subsubsub}:</label>

					<input
					  type="color"
					  id="colour_{subsubsub}"
					  on:change={(e) => {
						$now.currentChart.config[main][sub][subsub][subsubsub] = e.target.value
						config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
		
					  }}
					  value={$now.currentChart.config[main][sub][subsub][subsubsub]} />
				  {:else if typeof $now.currentChart.config[main][sub][subsub][subsubsub] == 'string'}
					<label for="text_{subsubsub}">{subsubsub}:</label>
					<input
					  type="number"
					  id="text_{subsubsub}"
					  on:change={(e) => {
						$now.currentChart.config[main][sub][subsub][subsubsub] = e.target.value
						config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
		
					  }}
					  value={$now.currentChart.config[main][sub][subsub][subsubsub]} />
				  {:else if !isNaN($now.currentChart.config[main][sub][subsub][subsubsub])}
					<label for="number_{subsubsub}">{subsubsub}:</label>
					<input
					  type="number"
					  id="number_{subsubsub}"
					  on:change={(e) => {
						$now.currentChart.config[main][sub][subsub][subsubsub] = e.target.value
						config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
					  }}
					  value={$now.currentChart.config[main][sub][subsub][subsubsub]} />
				  {:else}
					<label for={'field_' + subsubsub} class="label">
					  {subsub}:
					</label>
					<input
					  type="number"
					  id="field_{subsubsub}"
					  on:change={(e) => {
						$now.currentChart.config[main][sub][subsub][subsubsub] = e.target.value
						config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
					  }}
					  value={$now.currentChart.config[main][sub][subsub][subsubsub]} />
				  {/if}
				{/each}
			  </div>
			{:else}
			  <label for={'input_' + subsub} class="label">
				{subsub}:
			  </label>
			  {#if typeof $now.currentChart.config[main][sub][subsub] == 'string' && $now.currentChart.config[main][sub][subsub][0] == '#'}
				<input
				  type="color"
				  id="input_{subsub}"
				  on:change={(e) => {
					$now.currentChart.config[main][sub][subsub] = e.target.value
					config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)

				  }}
				  value={$now.currentChart.config[main][sub][subsub]} />
			  {:else if typeof $now.currentChart.config[main][sub][subsub] == 'string'}
				<input
				  type="text"
				  id="input_{subsub}"
				  class="full"
				  on:change={(e) => {
					$now.currentChart.config[main][sub][subsub] = e.target.value
					config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)

				  }}
				  value={$now.currentChart.config[main][sub][subsub]} />
			  {:else if !isNaN($now.currentChart.config[main][sub][subsub])}
				<input
				  type="number"
				  on:change={(e) => {
					$now.currentChart.config[main][sub][subsub] = e.target.value
					config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
				  }}
				  value={$now.currentChart.config[main][sub][subsub]} />
			  {:else}
				<textarea
				  class="full"
				  on:change={(e) => {
					$now.currentChart.config[main][sub][subsub] = e.target.value
					config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
				  }}
				  value={$now.currentChart.config[main][sub][subsub]} />
			  {/if}
			{/if}
		  {/each}
		{:else}
		  <textarea
			class="full"
			on:change={(e) => {
			  $now.currentChart.config[main][sub] = e.target.value
			  config = ($now.currentChart.config)
	  $now.currentChart.chartScripts.config_js = "config = " + JSON.stringify(config)
console.log("config",config)
			}}
			value={$now.currentChart.config[main][sub]} />
		{/if}
	  {/if}
	  <hr />
	{/each}
  {/if}
{/each}
{/if}
		</div>

{/if}
<div class="highlighted" style="width:0; height:0;" />
  
  <style>
	@import '../global.css'; 
	.left{
    height: calc(100vh - 100px) !important;
	width:calc(50vw - 20px);
	position: absolute;
	margin-top: 80px;
	left:0
 	}

	.right{
	margin-top: 80px;
	position: absolute;
	width:calc(50vw - 20px);
    top: 0;
    right: 0;
    height: calc(100vh - 100px) !important;
    overflow-y: scroll;
    overflow-x: hidden;
	}
	

	th{
	  text-align: left;
	}
	td,th{padding:0px 5px 0px 10px}
	table{border:1px solid grey}
	.outer{
	  margin: 0px auto;
	  max-width: 100vw;
	}
  .controls{
	/* background-color:red */
  }
  .chartBox{
	background-color: white;
  }

  .controlTable{
	padding: 5px;
  }
  input[type='number'] {
    width: 50px;
    margin-right: 30px;
  }
  .full {
    width: 95%;
    padding: 5px;
  }



  .tablewrapper {
    height: 150px;
    overflow: scroll;
    border: 1px solid black;
  }

  thead tr {
    background-color: #206095;
    color: #ffffff;
    text-align: middle;
  }
  th,
  td {
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

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-family: inherit;
    font-size: inherit;
    -webkit-padding: 0.4em 0;
    padding: 0.4em;
    margin: 0 0 0.5em 0;
    box-sizing: border-box;
    border: 2px solid #5a5a5a;
    border-radius: 2px;
    font-weight: bolder;
    max-width: 99%;
    background: transparent;
    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='8 4 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l10 10 10-10z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 5px;
  }
  h3 {
    margin-bottom: 5px;
    margin-top: 10px;
  }
  h4 {
    margin-bottom: 5px;
    margin-top: 10px;
    color: #999797;
  }
  hr {
    width: 90%;
    text-align: left;
    margin-left: 5%;
    height: 5px;
    background: rgb(252, 237, 249);
    border: none;
  }
  label {
    margin-left: 15px;
  }
  .css {
    width: 100%;
    height: 300px;
  }
  :global(.left, .right) {
    padding: 20px;
  }
  :global(.highlighted) {
    outline: solid;
  }
  </style>
  