<template>
    <div>
        <div class="modal-dialog text-center">
            <div class="col-sm-20 main-section">
                <div class="modal-content">
                    <div class="col-12 user-img">
                        <img src="https://i.pinimg.com/originals/22/6d/5c/226d5cd7f24a676a8c1925bd061cd33d.gif" alt="" srcset="">
                    </div>
                    <div class="col-12 form-input">
                        <form >
                            <h1>LOGIN</h1>
                            <div class="form-group">
                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" aria-describedby="emailHelp">
                            </div>
                            <div class="form-group">
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                            </div>
                            
                            <a href="#">Register</a>
                            <button type="submit" class="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoginPanel"
}
</script>

<style>

</style>