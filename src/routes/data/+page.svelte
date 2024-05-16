<!-- chartList.svelte -->
<script>

	import { liveQuery } from "dexie";
	import { db } from "../db";
	import FigureAdder from "../FigureAdder.svelte";
	import {onMount} from "svelte"
	import {now} from "../currentChoices"
  	import Tidy from "./Tidy.svelte"

	let config, script, chartCss, chosenName, currentProject, figureName, loaded=0
	  
  
	$: charts = liveQuery(async () => {
	  const charts = await db.Templates.toArray();
	  return charts;
	});
  
	$: projects = liveQuery(async () => {
	  const projects = await db.Projects.toArray();
	  return projects;
	});
  
  
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

	  console.log("csvString",csvString)
	  
	  sessionStorage.data = csvString
		.replace(/(?:\r\n|\r|\n)/g, "\\n")
		// .slice(0, -2);
  
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
  </script>
  
  <svelte:head>
	{#if $now.currentChart}
	{@html `<style type="text/css" id="injectedStyle"> ${$now.currentChart.chartScripts.chart_css} <\/style>`}
	{/if}
  </svelte:head>
  
  <div class="outer">
	<div class="controls">
  {#if $now.currentProject}
  <!-- <label for="projects">Select a project:  
	<select name="projects" bind:value={currentProject}>
	  {#each Object.values($projects) as project}
		<option value={project}>{project.projectName}</option>
	  {/each}
	</select></label><br><br> -->
  
	<label for="addRemove">Select or remove figures from {$now.currentProject.projectName}</label>
	  <table name="addRemove" class="controlTable">{#if $now.currentProject && $charts}
		<tr><th ><b>Figure name</b></th><th>Chart type</th><th style="color:red"></th></tr>
		{#each $now.currentProject.figures as figure}
		  <tr><td><button  on:click={()=>$now.currentChart=figure}>{figure.figureName}</button></td><td>{figure.chartName}</td><td><button style="color:red">X</button></td></tr>
		{/each}{/if}
  
		{#if $now.currentChart}
		<tr></tr>
		
  
  {/if}
  
	  </table>
	{/if}
  </div>
  <br>
  {#if $charts}
  <select name="chart" bind:value={$now.currentChart} style="display:none">
	  {#each $charts as chart}
		<option value={chart}>{chart.chartName}</option>
	  {/each}</select
	>
  {/if}
  
  <!-- {#if config}{JSON.stringify(config)}{/if} -->
  <!--This is what D3 renders-->
  <div class="chartBox">
	Output:
	<h5 id="accessibleSummary" class="visuallyhidden">.</h5>
	<div id="select"></div>
	<div aria-hidden="true" id="legend"></div>
	<div id="graphic" aria-hidden="true"></div>
	<h5 id="source">.</h5>
  </div></div>
  <!--End of what D3 renders-->
  
  <div class="dataBox">
{#if $now.currentChart}
	<Tidy csv={$now.currentChart.chartScripts.data_csv}/>
{/if}
</div>
  
  <style>
	@import '../global.css'; 
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
	width:calc(50% - 5px);
	position:absolute;
	left:calc(50% + 5px);
	bottom:0;
	height:50%;
  }
  .dataBox{
	background-color: white;
	width:50%;
	height:50%;
	position:absolute;
	left:5px;
	bottom:0
  }
  .controlTable{
	padding: 5px;
  }
  </style>
  