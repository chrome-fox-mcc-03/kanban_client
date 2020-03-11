<template>
  <div>
    <sui-button @click.native="toggle">Show Modal</sui-button>
    <sui-modal v-model="open">
      <sui-modal-header id="modal-header">
        <h1>Create QanbaN</h1>
      </sui-modal-header>
      <sui-modal-content form>
        <sui-form>
          <sui-form-field>
            <label>Title</label>
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" max=10 name="title" placeholder="Title">
            </div>
          </sui-form-field>
          <sui-form-field>
            <label>Description</label>
            <textarea type="text" name="description" placeholder="Description" style="resize: none;"></textarea>
          </sui-form-field>
          <div class="ui fluid large teal submit button" type="submit">Submit</div>
        </sui-form>
    </sui-modal>
  </div>
</template>

<script>
export default {
  name: 'Create',
  data() {
    return { 
      open: false
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
}
</script>

<style>

</style>