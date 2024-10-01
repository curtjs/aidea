<div>
	<h1>need an <span id="idea">idea?</span></h1>

	<button>yes please!</button>
</div>

<style lang="scss">
	// style idea
	#idea {
		color: blue;
	}

	// style the div and center vertically
	div {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	// style the button
	button {
		color: darkslategray;
		background-color: whitesmoke;
		border: none;
		padding: 10px 10px 10px 10px;
		border-radius: 10px 10px 10px 10px;
		// add a shadow
		box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);
		transition: 0.5s;

		&:hover {
			cursor: pointer;
			background-color: lightgray;
			color: black;
		}
	}
</style>
