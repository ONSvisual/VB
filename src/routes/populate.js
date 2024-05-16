import {now, currentCss} from "./currentChoices"

export function populate(
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
      currentCss=css;
    let csvString = data;
    sessionStorage.data = csvString
      .replace(/(?:\r\n|\r|\n)/g, "\\n")
      //.slice(0, -2);

    sessionStorage.config = conf; //.replace("data.csv",encodeURIComponent(csvString))
    let config = eval(sessionStorage.config);
    now.currentChart.config=config;
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