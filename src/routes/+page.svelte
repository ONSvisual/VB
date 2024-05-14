<script>

	
</script>

<svelte:head>
	<title>"vis builder</title>
	<meta name="description" content="ONS vis builder" />
</svelte:head>

<section>
	<h1>Chart choices</h1>
	<ol>
		<li>Name your “project” or open an existing one</li>
		<li>Select charts from the menu for each of the required figures</li>
		<li>Move to Step 2 to manipulate the data for each chart</li>
	</ol>
</section>

<style>
:global(section) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
:global(ol){
	font-size: 1.5em;
}
	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
