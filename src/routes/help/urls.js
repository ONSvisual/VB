let charts = [
    "area-stacked",
    "area-stacked-sm",
    "bar-chart-horizontal",
    "bar-chart-horizontal-clustered",
    "bar-chart-horizontal-clustered-sm",
    "bar-chart-horizontal-grouped",
    "bar-chart-horizontal-grouped-clustered",
    "bar-chart-horizontal-sm",
    "bar-chart-horizontal-sm-colour",
    "bar-chart-horizontal-stacked",
    "bar-chart-horizontal-stacked-clustered",
    "bar-chart-horizontal-stacked-clustered-grouped",
    "bar-chart-horizontal-stacked-grouped",
    "bar-chart-horizontal-stacked-sm",
    "bar-chart-horizontal-stacked-with-tooltip",
    "bar-chart-horizontal-with-dropdown",
    "bar-chart-horizontal-with-reference-line",
    "bar-chart-horizontal-with-reference-sm",
    "bubble-chart-animated",
    "column-chart",
    "column-chart-sm",
    "column-chart-stacked",
    "column-chart-stacked-sm",
    "column-chart-stacked-with-line",
    "column-chart-stacked-with-line-sm",
    "column-chart-with-ci-sm",
    "comet-plot",
    "dot-plot",
    "dot-plot-with-ci-sm",
    "doughnut",
    "heatmap",
    "heatmap-per-column",
    "line-chart",
    "line-chart-sm",
    "line-chart-sm-colours",
    "line-chart-with-area",
    "line-chart-with-ci-sm",
    "population-pyramid-static",
    "population-pyramid-static-with-comparison",
    "population-pyramid-with-comparison-toggle",
    "population-pyramid-with-dropdown",
    "population-pyramid-with-dropdown-and-interactive-comparison",
    "range-plot",
    "ridgeline-plot",
    "scatter-plot",
    "scatter-plot-animated",
    "scatter-plot-sm",
    "slope-chart",
    "split-bar-chart"
]

charts.forEach(c=>populateJSON(c))

let  VB =   {
                Templates:{}
            }


function populateJSON(c){
    fetch(`https://cdn.statically.io/gh/ONSvisual/Charts/main/${c}/config.js`)
    .then(res=>res.text())
    .then(txt=>VB.Templates[c].config=txt)

    fetch(`https://cdn.statically.io/gh/ONSvisual/Charts/main/${c}/script.js`)
    .then(res=>res.text())
    .then(txt=>VB.Templates[c].script=txt)

    fetch(`https://cdn.statically.io/gh/ONSvisual/Charts/main/${c}/index.html`)
    .then(res=>res.text())
    .then(txt=>VB.Templates[c].html=txt)

    fetch(`https://cdn.statically.io/gh/ONSvisual/Charts/main/${c}/chart.css`)
    .then(res=>res.text())
    .then(txt=>VB.Templates[c].css=txt)    
   
    fetch(`https://cdn.statically.io/gh/ONSvisual/Charts/main/${c}/data.csv`)
    .then(res=>res.text())
    .then(txt=>VB.Templates[c].data=txt)    

    fetch(`https://cdn.statically.io/gh/ONSvisual/Charts/main/${c}/comparison.csv`)
    .then(res=>res.text())
    .then(txt=>VB.Templates[c].data=txt)    
}
