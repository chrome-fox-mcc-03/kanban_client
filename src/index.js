const app = new Vue ({
    el: "#app",
    data: {
        email: '',
        password: '',
        logStatus: false,
        todos: [
            {
                title: "First Task",
                description: "This is your first awesome task. You go girl!",
                status: 'started',
                editTitle: false,
                editDesc: false
            },
            {
                title: "Second Task",
                description: "Second task is even more awesome.",
                status: 'started',
                editTitle: false,
                editDesc: false
            }
        ]
    },
    methods: {
        login: function () {
            // alert('masuk')
            console.log(this.logStatus,'pjojokj')
            this.logStatus = true
        },
        logout: function() {
            this.logStatus = false
        },
        addTask: function() {
            this.todos.push({
                title: "New Task",
                description: "Add description here.",
                status: 'started',
                editTitle: false,
                editDesc: false
            })
        }
    },
    created() {
        console.log(this.logStatus)
    }
})