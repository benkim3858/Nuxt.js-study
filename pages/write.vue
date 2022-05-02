<template>
  <v-container fluid>
    <v-textarea
      clearable
      clear-icon="mdi-close-circle"
      label="Text"
      value="This is clearable text."
      v-model="write.content"
    ></v-textarea>
    <div class="text-center">
    <v-btn
      rounded
      color="primary"
      dark
      @click="board_upload"
    >
      write
    </v-btn>
  </div>
  </v-container>
</template>

<script>
export default {
    data() {
        return {
            write: {
                content:''
            }
        }
    },
    
    methods: {
        async board_upload() {
            let user_id = this.$store.state.user_id;
            try {
                await this.$axios.post('/user/board_upload', {...this.write, user_id});
            } catch (e) {
                
            }
        }
    },
}
</script>

<style>

</style>