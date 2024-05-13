<!-- App.svelte -->
<script>
  import ChartsAdder from "./ChartsAdder.svelte";
  import ChartsList from "./ChartsList.svelte";
</script>

<svelte:head>

  <script id="config"></script>
  <script id="script"></script>
</svelte:head>

<ChartsAdder />
<ChartsList />