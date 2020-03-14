<template>
  <nav class="navbar navbar-dark mb-3" style="background: #655c56; position: fixed; min-width: 100vw; z-index:999">
		<a class="navbar-brand" href="#">Kanban</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item">
					<a class="nav-link" href="#" @click="logout">Log Out</a>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'NavBar',
	methods: {
		logout () {
			localStorage.removeItem('token');
			this.$emit('logout');
		}
	}
}
</script>

<style>

</style>