<script>
	import { page } from '$app/stores';
	import { now } from "./currentChoices"

	$: visibility = $now.currentProject?false:true

</script>

<header>
	<div class="corner">
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/project' ? 'page' : undefined}>
				<a href="/project" >0. Projects</a>
			</li>
			<li aria-current={$page.url.pathname === '/chart' ? 'page' : undefined} class:greyed={visibility}>
				<a href="/chart" class:greyed={visibility}>1. Chart choices</a>
			</li>
			<li aria-current={$page.url.pathname === '/data' ? 'page' : undefined} class:greyed={visibility}>
				<a href="/data" class:greyed={visibility}>2. Replace datasets</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/tweak') ? 'page' : undefined} class:greyed={visibility}>
				<a href="/tweak" class:greyed={visibility}>3. Tweak charts</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/features') ? 'page' : undefined} class:greyed={visibility}>
				<a href="/features" class:greyed={visibility}>4. Add features</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/download') ? 'page' : undefined} class:greyed={visibility}>
				<a href="/download" class:greyed={visibility}>5. Download</a>
			</li>
			<!-- <li aria-current={$page.url.pathname.startsWith('/help') ? 'page' : undefined}>
				<a href="/help">help</a>
			</li> -->
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	.greyed{
		color:lightgrey;
		pointer-events: none;
	}
</style>
