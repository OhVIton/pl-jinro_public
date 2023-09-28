<template>
  <div>
    <font size="5">
      閲覧モード
    </font>
    <h1>
      <v-img
        v-if="room.turn === TURN.NIGHT"
        :src="require('@/static/img/turn/night.webp')"
        height="50"
        width="50"
      />
      <v-img
        v-else
        :src="require('@/static/img/turn/day.webp')"
        height="50"
        width="50"
      />
      {{ room.day }} 学期
      {{ turnText(room.turn) }}
    </h1>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="8">
            <v-row>
              <v-col v-for="user in room.users" :key="user.user" cols="12" sm="6">
                <player-info-card :user="user" :room="room" class="mb-3" />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="4">
            <v-col>
              <v-card>
                <v-card-title>Chat</v-card-title>
                <v-card-text>
                  <div ref="chatArea" class="overflow-y-auto" style="height: 50vh">
                    <v-list>
                      <div
                        v-for="(message, messageId) in room.messages"
                        :key="messageId"
                      >
                        <div v-if="message.mode === 'turn' || message.mode === 'wolf' || message.mode === 'over'">
                          {{ message.day }} 学期 {{ message.mode === 'wolf' ? '[人狼]' : '' }} {{ message.user }} :
                          {{ message.message }}
                        </div>
                      </div>
                      <div>
                        <p />
                      </div>
                    </v-list>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-card-actions>
      <v-btn to="/">
        Back To Home
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { GROUP, groupColor, Role, TURN, turnText } from '~/scripts/constants'
import PlayerInfoCard from '~/components/gameWatch/PlayerInfoCard.vue'

// /gameWatch?roomId=(ルームID)
export default {
  components: { PlayerInfoCard },
  computed: {
    groupColor: () => groupColor,
    GROUP: () => GROUP,
    Role: () => Role,
    TURN: () => TURN,
    turnText: () => turnText,
    ...mapGetters({ room: 'getData' }),
  },
  watch: {
    'room.messages' () {
      this.$refs.chatArea.scrollTop = this.$refs.chatArea.scrollHeight
    }
  },

  mounted() {
    this.$store.dispatch('bindData', this.$route.query.roomId)
  },
  methods: {
    ...mapActions(['bindData']),
  },
}
</script>
