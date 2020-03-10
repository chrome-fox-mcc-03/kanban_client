<template>
    <div class="modal-dialog text-center">
        <div class="col-sm-20 main-section">
            <div class="modal-content">
                <div class="col-12 user-img">
                    <img src="https://i.pinimg.com/originals/6d/b9/88/6db988869c105086253a0c388796e1ea.gif" alt="" srcset="">
                </div>
                <div class="col-12 form-input">
                    <form >
                        <h1>REGISTER</h1>
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
</template>

<script>
export default {
    name: 'RegisterPanel'
}
</script>

<style>

</style>