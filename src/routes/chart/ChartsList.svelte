<!-- chartList.svelte -->
<script>
  import { liveQuery } from "dexie";
  import { db } from "../db";
  import FigureAdder from "../FigureAdder.svelte";
  import {onMount} from "svelte"
  import {now} from "../currentChoices"
  import { symbolWye } from "d3";

  let config, code, chartCss, chosenName, currentProject, figureName, loaded=0
	
  async function setupDB(projectName, figureName, chartName, chartScripts) {
      try {
          const id = await db.Projects.add({
            projectName: projectName,
            figures: []
        });
        status = `${projectName} successfully created a new project in DB`;
        // Reset form:
        // projectName="";
        // figureName="";
        // chartName = "";
        // chartScripts = "";
      } catch (error) {
        status = `No need for a new project?: ${error}`;
      }
      console.log("setupDB",status)
    }

    async function addFigureToProject(projectName, figureName, chartName, chartScripts) {
      try {
          const id = await db.Projects.where('projectName').equals(projectName).modify(x =>
         x.figures.push({figureName:figureName, chartName:chartName, chartScripts:chartScripts}) );
          status = `${chartName} successfully added to ${projectName} as ${figureName}`;

          //Something to update $now from DB
      $now.currentProject.figures.push({figureName:figureName, chartName:chartName, chartScripts:chartScripts})
      $now=$now
      //  Reset form:
        projectName="";
        figureName="";
        chartName = "";
        chartScripts = "";
      } catch (error) {
        status = `Failed to add ${figureName}: ${error}`;
      }
      console.log("addFigureToProject",status)
    }

  

  // $: theScript = `<style type="text/css" id="injectedStyle"> ${chartCss} <\/style>`; 

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
      chartCss = css;
    let csvString = data;
    sessionStorage.data = csvString
      .replace(/(?:\r\n|\r|\n)/g, "\\n")
      //.slice(0, -2);

    sessionStorage.config = conf; //.replace("data.csv",encodeURIComponent(csvString))
    config = eval(sessionStorage.config);
    $now.currentChart.config=config;
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
    code = eval(sessionStorage.script);
    
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
  
  let saveChart = () => 1;
  onMount(()=>loadProject($now.currentProject))
</script>

<svelte:head>
  {#if $now.currentChart}
  {@html `<style type="text/css" id="injectedStyle"> ${$now.currentChart.chartScripts.chart_css} <\/style>`}
  {/if}
</svelte:head>


<style>
  /* @import '../global.css';  */
  th{
    text-align: left;
  }
  td,th{padding:0px 5px 0px 10px}
  table{border:1px solid grey}
  .outer{
    margin: 0px auto;
    max-width: 700px;
  }

.chartBox{
  background-color: white;
}
.controlTable{
  padding: 5px;
}
</style>

<div class="outer">
  <div class="controls">
{#if $now.currentProject}
  <label for="addRemove">Add or remove figures from {$now.currentProject.projectName}</label>
    <table name="addRemove" class="controlTable">
      {#if $now.currentProject && $charts}
      <tr><th ><b>Figure name</b></th><th>Chart type</th><th style="color:red"></th></tr>
      {#each $now.currentProject.figures as figure}
        <tr><td><button  on:click={()=>$now.currentChart=figure}>{figure.figureName}</button></td><td>{figure.chartName}</td><td><button style="color:red">X</button></td></tr>
      {/each}
      
{/if}

      {#if $now.currentChart}
      <tr></tr>
      <hr>
      <tr><td>Add a figure:</td><td></td><td></td></tr>
      <tr>
        <td>
          <input type="text" placeholder="Figure name" bind:value={figureName}/>
        </td>
        <td>
          {#if $charts}
          <select name="chart" bind:value={$now.currentChart}>
            {#each $charts as chart}
              <option value={chart}>{chart.chartName}</option>
            {/each}</select
          >
          {/if}
         </td>
        <td>
          <button on:click={()=>{setupDB($now.currentProject.projectName, figureName, $now.currentChart.chartName, $now.currentChart.chartScripts);addFigureToProject($now.currentProject.projectName, figureName, $now.currentChart.chartName, $now.currentChart.chartScripts)}}>Save</button>
        </td>
      </tr>

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
  <h5 id="accessibleSummary" class="visuallyhidden">.</h5>
  <div id="select"></div>
  <div aria-hidden="true" id="legend"></div>
  <div id="graphic" aria-hidden="true"></div>
  <h5 id="source">.</h5>
</div></div>
<!--End of what D3 renders-->