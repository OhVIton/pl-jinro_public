<template>
  <div>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col
            v-for="u in room.users"
            :key="u.user"
          >
            <v-card :class="'elevation-1 ' + votedCardClass['card-'+ u.user] !== undefined ? votedCardClass['card-' + u.user] : ''">
              <v-card-title>{{ u.user }}</v-card-title>
              <v-card-text v-if="u.isDead">
                <div>
                  <v-btn disabled>
                    除籍
                  </v-btn>
                </div>
              </v-card-text>
              <v-card-text v-else>
                <div v-if="!room.users[$route.query.user].isSelected && !room.users[$route.query.user].isDead">
                  <v-btn color="primary" @click="addReady($route.query.roomId, $route.query.user); vote(u.user, false);">
                    選択
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn disabled>
                    選択
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-btn v-if="!room.users[$route.query.user].isDead && !room.users[$route.query.user].isSelected" block @click="addReady($route.query.roomId, $route.query.user); vote($route.query.user, true)">
            パス
          </v-btn>
          <v-btn v-else disabled block>
            パス
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { vote, addReady, sendMessage } from '~/scripts/repository'
export default {
  name: 'JinroGame',
  data: () => ({
    // isVoted: false,
    votedCardClass: {},
  }),
  computed: {
    addReady: () => addReady,
    ...mapGetters({
      room: 'getData'
    })
  },
  methods: {
    vote (user, isPass) {
      vote(this.$route.query.roomId, user, isPass)
      if (!isPass) { this.votedCardClass['card-' + user] = 'blue' }
      const logText = isPass ? `[テスト] ${this.$route.query.user} が パス をしました` : `[テスト] ${this.$route.query.user} が ${user} を選択しました`
      sendMessage(this.$route.query.roomId, this.$route.query.user, logText, this.room.day, 'log')
    }
  }

}
</script>
