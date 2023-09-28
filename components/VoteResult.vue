<template>
  <div>
    <v-card>
      <v-card-title>
        <div v-if="getDiedUsersLength(room.users) === 0" class="display-1">
          テストにより除籍になった人物はいませんでした
        </div>
        <div v-else>
          <div v-for="u in room.users" :key="u.user">
            <p v-if="u.isDead && u.deathOfDay === room.day" class="display-1">
              {{ u.user }}
            </p>
          </div>
        </div>
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'JinroGame',
  data: () => ({
    isVoted: false
  }),
  computed: {
    ...mapGetters({
      room: 'getData'
    })
  },
  methods: {
    getDiedUsersLength (users) {
      let result = 0
      /*
      for (let i = 0; i < users.length; i++) {
        if (users[usersKey[i]].isDead && users[usersKey[i]].deathOfDay === this.room.day) {
          result++
        }
      }
      */
      const usersKey = Object.keys(users)
      for (const key of usersKey) {
        if (users[key].isDead && users[key].deathOfDay === this.room.day) { result++ }
      }
      return result
    }
  }

}
</script>
