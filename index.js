let app = new Vue ({
	el: "#app",
	data: {
		isLogIn: false,
		backlogs: [
			{ id:1, title:"Makan", description:"Makan siang di gyukaku"},
			{ id:1, title:"Belajar", description:"Belajar biar bener dulu otak"},
			{ id:1, title:"Project", description:"Beresin project biar lulus"},
			{ id:1, title:"Jagur", description:"Jangan anggurin si jagur"}
		]
	},
	methods: {
		LogIn: function () {
			this.isLogIn = true
		}
	}
})


