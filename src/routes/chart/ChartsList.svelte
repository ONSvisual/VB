<!-- chartList.svelte -->
<script>
  import { liveQuery } from "dexie";
  import { db } from "./db";
//import "./global.css"
  import FigureAdder from "./FigureAdder.svelte";

	

  let config, script, chartCss;

  // $: theScript = `<style type="text/css" id="injectedStyle"> ${chartCss} <\/style>`; 

  $: charts = liveQuery(async () => {
    const charts = await db.Templates.toArray();
    const projects = await db.Projects.toArray();
    return charts;
  });

  $: projects = liveQuery(async () => {
    const projects = await db.Projects.toArray();
    return projects;
  });

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
    console.log(JSON.stringify(config));

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
    console.log("script", sessionStorage.script);
    script = eval(sessionStorage.script);
    chartCss = css;
    return config;
  }

  let selectedChart;

  $: console.log("selectedChart", selectedChart);

  $: selectedChart &&
    populate(
      selectedChart.chartName,
      selectedChart.chartScripts.config,
      selectedChart.chartScripts.script,
      selectedChart.chartScripts.data,
      selectedChart.chartScripts.css,
      selectedChart.chartScripts.comparison
    );
  let chosenName, selectedProject;
  let saveChart = () => 1;
  $: console.log("chosenName", chosenName);
</script>

<svelte:head>
  {@html `<style type="text/css" id="injectedStyle"> ${chartCss} <\/style>`}
</svelte:head>

<div class="outer">
  <div class="controls">
{#if $projects}
<label for="projects">Select a project:  
  <select name="projects" bind:value={selectedProject}>
    {#each Object.values($projects) as project}
      <option value={project}>{project.projectName}</option>
    {/each}
  </select></label><br><br>

  <label for="addRemove">Add or remove figures:</label>
    <table name="addRemove">{#if selectedProject && $charts}
      <tr><th ><b>Figure name</b></th><th>Chart type</th><th style="color:red"></th></tr>
      {#each selectedProject.figures as figure}
        <tr><td contenteditable=true>{figure.figureName}</td><td>{figure.chartName}</td><td style="color:red">X</td></tr>
      {/each}{/if}

      {#if selectedChart}
      <tr>.<td> </td><td></td><td></td></tr>
      <FigureAdder

    projectName="dvc9900"
    chartName={selectedChart.chartName}
    chartScripts={selectedChart.chartScripts}
    {selectedChart}
    {charts}
    figureName=""
  >  
  
  <td>
    {#if $charts}
    <select name="chart" bind:value={selectedChart}>
      {#each $charts as chart}
        <option value={chart}>{chart.chartName}</option>
      {/each}</select
    >
    {/if}
   </td>
 
</FigureAdder>
{/if}

    </table>
  {/if}
</div>
<br>
{#if $charts}
<select name="chart" bind:value={selectedChart} style="display:none">
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



<style>
  @import './global.css'; 
  th{
    text-align: left;
  }
  td,th{padding:0px 5px 0px 10px}
  table{border:1px solid grey}
  .outer{
    margin: 0px auto;
    max-width: 700px;
  }
.controls{
  /* background-color:red */
}
.chartBox{
  background-color: white;
}
</style>
