<template>
  <div class="row">
    <div class="col s12 l6 offset-l3">
      <div class="card">
        <h5 class="card-title blue-grey-text" style="background-color: #4BBAE7;padding: 10px 0px;margin-bottom: 0">
          Message Box</h5>
        <div class="message-box" style="height: 80vh;width: 100%;" v-chat-scroll>
          <div v-for="message in messageBox" class="message darker" :class="{'message-right':name==message.name,'message-left':name!=message.name}" :key="message.timestamp">
            <div class="message-name" >{{ message.name }}</div>
            <div class="message-content" style="text-align: start"><span>{{ message.content }}</span></div>
            <div class="message-time" style="font-size: 10px">{{ message.timestamp }}</div>
          </div>
        </div>
        <form>
          <div class="row" @submit.prevent="enter">
            <div class="input-field col s8 offset-s2 flex">
              <textarea id="icon_prefix2" ref="newMessage" class="materialize-textarea" v-model="message"></textarea>
              <label for="icon_prefix2">Enter Message</label>
              <i class="material-icons Medium" @click="enter">send</i>
            </div>
          </div>
        </form>
        <div class="card-action col s12  red lighten-1" style="cursor: pointer" @click="goBack">
          <a>Go Back</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import db from '../firebase/init.js'
import moment from 'moment'

export default {
  name: 'Welcome',
  props: ['name'],
  data() {
    return {
      message: '',
      feedback: null,
      messageBox: [],

    }
  }, methods: {
    enter() {
      if (this.message) {
        db.collection('message').add({
          content: this.message,
          name: this.name,
          timestamp: Date.now()
        })
        this.message = null;
      } else {
        this.feedback = 'Enter message in order to send one!'
      }
    },
    goBack(){
      this.$router.push({name:"Welcome"})
    }

  },
  created() {
    db.collection('message').orderBy('timestamp').onSnapshot(shapshot => {
      shapshot.docChanges().forEach(change => {
        if (change.type == 'added') {
          let doc = change.doc;
          let contentBox = {};
          contentBox.name = doc.data().name;
          contentBox.timestamp = moment(doc.data().timestamp).format('lll');
          contentBox.content = doc.data().content.trim();
          contentBox.id = doc.id;

          this.messageBox.push(contentBox);
        }
      })
    })
  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  display: contents;
}

.input-field textarea.valid {
  border-bottom: 1px solid #4BBAE7;
  box-shadow: 0 1px 0 0 #4BBAE7;
}

.input-field .prefix.active {
  color: #4BBAE7;
}

.input-field textarea:focus + label {
  color: #4BBAE7;
}

.input-field textarea:focus {
  border-bottom: 1px solid #4BBAE7;
  box-shadow: 0 1px 0 0 #4BBAE7;
}

.flex {
  display: flex;
  justify-items: flex-end;
}

i {
  padding-top: 15px;
  height: 30px;
  cursor: pointer;
  transition: 0.3s;
}
i:hover,i:focus{
  color: #4BBAE7;
}

.message-box {
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: min-content;
  align-items: start;
  background: linear-gradient(180deg, rgba(55,73,82,1) 27%, rgba(82,102,112,1) 72%, rgba(96,125,139,1) 98%);
}

/* Chat containers */

.message {
  display: grid;
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 5px;
  margin: 5px 10px;
  width: auto;
  grid-template-rows: min-content min-content min-content;

}

.message-right {
  grid-column: 2/4;
  justify-self: end;
}

.message-left {
  grid-column: 1/3;
  justify-self: start;

}

.message-right> .message-name {
  color: #4BBAE7;
  justify-self: end;
}

.message-right> .message-content {
  justify-self: end;
}

.message-right> .message-time {
  justify-self: start;
}
.message-left> .message-name {
  justify-self: start;
  color: black;
}

.message-left> .message-content {
  justify-self: start;
}

.message-left> .message-time {
  justify-self: end;
}
/* Darker chat container */
.darker {
  border-color: #ccc;
  background-color: #ddd;
}


</style>
