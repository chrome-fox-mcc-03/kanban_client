<template>

    <div class="uk-card uk-card-default uk-card-body uk-card-hover">
        <div v-if="task.badge === 0" class="uk-card-badge uk-label" style="display:none;"></div>
        <div v-else-if="task.badge === 1" class="uk-card-badge uk-label">Team</div>
        <div v-else-if="task.badge === 2" class="uk-card-badge uk-label uk-label-danger">Important</div>
        <div v-else class="uk-card-badge uk-label uk-label-warning">Due</div>

        <h3 class="uk-card-title"> {{ taskData.title }}</h3>
        <p> {{ task.desc }} </p>
        <div class="uk-card-footer">
            <a :href="`#task-editor-${taskData.id}`" uk-toggle class="uk-button uk-button-text">Read more</a>
        </div>
        <div class="task-navigation">
            <a @click="updateCategory(-1)" v-if="task.category !== 0" uk-icon="arrow-left"></a>
            <a @click="deleteTask" uk-icon="trash" id="delete-confirmation"></a>
            <a @click="updateCategory(+1)" v-if="task.category !== 3" uk-icon="arrow-right"></a>
        </div>

        <div :id="'task-editor-'+taskData.id" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
                <h2 class="uk-modal-title">Task Editor</h2>
                <fieldset class="uk-fieldset">
                    <form class="uk-form-horizontal uk-margin-large" @submit.prevent="updateTask">
                        <label class="uk-form-label" for="form-horizontal-text">Title</label>
                        <input v-model="taskData.title" class="uk-input" type="text">

                        <label class="uk-form-label" for="form-horizontal-text">Description</label>
                        <textarea v-model="taskData.desc" class="uk-textarea" rows="3"></textarea>

                        <label class="uk-form-label" for="form-horizontal-text">Badge</label>
                        <select class="uk-select" v-model="taskData.badge">
                            <option v-for="(badge, index) in badges" :key="index" :value="index">{{ badge }}</option>
                        </select>
                    <br><br>
                    <button @click="getTaskData" class="uk-button uk-button-danger uk-modal-close" type="button">Cancel</button>
                    <button class="uk-button uk-button-primary" type="submit">Save</button>
                    </form>
                </fieldset>

            </div>
            
        </div>

    </div>

</template>

<script>
    export default {
        name: "TaskCard",
        data() {
            return {
                taskData: {
                    id: this.task.id,
                    title: this.task.title,
                    desc: this.task.desc,
                    badge: this.task.badge,
                    category: this.task.category
                    
                },
                badges: ["None", "Team", "Important", "Due"]
            }
        },
        props: ['task'],
        methods: {
            getTaskData() {
                this.taskData.title = this.task.title
                this.taskData.desc = this.task.desc
                this.taskData.badge = this.task.badge
                this.taskData.category = this.task.category
            },
            deleteTask() {
                UIkit.modal.confirm(`Are you sure want to delete Task ${this.taskData.title} ?`).then( () => {
                    this.$emit('deleteTask', this.taskData.id)
                }, () => {
                    console.log('Rejected.')
                });
                
            },
            updateCategory(input) {
                let category = this.taskData.category + input
                let obj = {
                    category,
                    id: this.taskData.id
                }
                this.$emit("updateCategory", obj)
            },
            updateTask() {
                let obj = {
                    id: this.taskData.id,
                    title: this.taskData.title,
                    desc: this.taskData.desc,
                    badge: this.taskData.badge,
                    category: this.taskData.category
                }
                UIkit.modal(`#task-editor-${this.taskData.id}`).hide();
                this.$emit("updateTask", obj)
            }
        },
        created() {
            
        }
    }
</script>

<style scoped>
    .task-editor .uk-open>.uk-modal-dialog {
        border-radius: 15px;
    }


    .uk-form-horizontal label {
        font-size: 1.5em
    }
</style>