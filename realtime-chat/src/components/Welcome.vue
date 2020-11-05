<template>
  <div class="row" style="margin-top: 50px;">
    <div class="col s12 l6 offset-l3">
      <div class="card">
        <div class="card-image">
          <img src="../assets/Chat.jpg">
          <span class="card-title blue-grey-text">Enter Your Name</span>
        </div>
        <form class="row" @submit.prevent="enter">
          <div class="input-field col s8 offset-s2">
            <input id="name" type="text" class="validate" v-model="name">
            <label for="name">Your Name</label>
          </div>
          <p class="red-text col s12">{{ feedback }}</p>
          <div class="card-action col s12 blue" style="cursor: pointer" @click="enter">
            <a>Enter</a>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>


export default {
  name: 'Welcome',
  data() {
    return {
      name: null,
      feedback: null,
    }
  },
  methods: {
    enter() {
      if (this.name) {
        this.$router.push({
          name: 'Chat', params: {
            name: this.name
          }
        })
        this.name = null;
        this.feedback = null;
      } else {
        this.feedback = 'You must enter name'
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  display: contents;
}

.input-field input[type=text].valid {
  border-bottom: 1px solid #4BBAE7;
  box-shadow: 0 1px 0 0 #4BBAE7;
}

.input-field .prefix.active {
  color: #4BBAE7;
}

.input-field input[type=text]:focus + label {
  color: #4BBAE7;
}

.input-field input[type=text]:focus {
  border-bottom: 1px solid #4BBAE7;
  box-shadow: 0 1px 0 0 #4BBAE7;
}

</style>
