<template>
    <div  id="register-container">
        <h1 class=" title">Register</h1>
        <form @submit.prevent="register()" id="register-form">
            <label class="first_name-label register" for="first_name">First Name:</label><br>
            <input v-model="first_name" class="first_name-input register" type="text" id="first_name-register" name="first_name" ><br>
            <label class="last_name-label register" for="last_name">Last Name:</label><br>
            <input v-model="last_name" class="last_name-input register" type="last_name" id="last_name-register" name="last_name"><br><br>
            <label class="email-label register" for="email">Email:</label><br>
            <input v-model="email" class="email-input register" type="text" id="email-register" name="email" ><br>
            <label class="password-label register" for="password">Password:</label><br>
            <input v-model="password" class="password-input register" type="password" id="password-register" name="password"><br><br>
            <label class="role-label register" for="role">Role:</label><br>
            <select v-model="role" class="role-input" id="role">
                <option value="">---Select---</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
            </select>
            <input id="submit-register" class="submit" type="submit" value="Register">
        </form>     
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            role: ''
        }
    },
    methods: {
        register: function () {
            let obj = {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password,
                role: this.role
            }
            this.$emit('register', obj)
        }
    }
}
</script>

<style>

</style>