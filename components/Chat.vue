<template>
  <div>
    <v-row>
      <v-col cols="12" sm="4">
        <v-card>
          <div v-if="mode === 'turn' || mode === 'waiting'">
            <v-card-title> Player </v-card-title>
            <v-card-text>
              <ul>
                <div v-for="(player, playerId) in room.users" :key="playerId">
                  <li v-if="!player.isDead">
                    <p v-if="player.user === room.owner">
                      {{ player.user }}（ホスト）
                    </p>
                    <p v-else>
                      {{ player.user }}
                    </p>
                  </li>
                </div>
              </ul>
            </v-card-text>
          </div>
          <div v-else-if="mode === 'wolf'">
            <v-card-title> 退学者 </v-card-title>
            <v-card-text>
              <ul>
                <div v-for="(player, playerId) in room.users" :key="playerId">
                  <div v-if="player.role === 'Werewolf' && !player.isDead">
                    <li>
                      {{ player.user }}
                    </li>
                  </div>
                </div>
              </ul>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8">
        <v-card>
          <v-card-title> Chat </v-card-title>
          <v-card-text>
            <div ref="chatArea" style="height: 15rem" class="overflow-y-auto">
              <v-list>
                <div
                  v-for="(message, messageId) in room.messages"
                  :key="messageId"
                >
                  <div v-if="message.day === room.day && message.mode === mode">
                    <v-list-item>
                      <v-list-item-content>
                        {{ message.user }} <br />
                        {{ message.message }}
                      </v-list-item-content>
                    </v-list-item>
                  </div>
                </div>
                <v-list-item>
                  <v-list-item-avatar />
                  <v-list-item-content />
                </v-list-item>
              </v-list>
            </div>
            <v-card>
              <v-card-title
                v-if="mode === 'turn'"
                class="justify-center text-h2"
              >
                {{ getTimerText() }}
              </v-card-title>
            </v-card>

            <div
              v-if="
                (mode === 'turn' &&
                  (room.users !== undefined
                    ? !room.users[$route.query.user].isDead
                    : false)) ||
                mode === 'wolf' ||
                mode === 'over' ||
                mode === 'waiting'
              "
            >
              <v-text-field
                v-model="input_str"
                :label="user"
                @keypress.enter="submit(input_str)"
              />
              <v-btn @click="submit(input_str)"> 送信 </v-btn>
            </div>
            <div v-else>
              <v-text-field disabled />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { nextTurn, sendMessage } from '~/scripts/repository'
import { TURN } from '~/scripts/constants'

export default {
  name: 'JinroGame',
  props: {
    roomId: {
      type: String,
      default: '1234',
    },
    user: {
      type: String,
      default: 'test',
    },
    mode: {
      // turn, wolf, over, log
      type: String,
      default: 'turn',
    },
  },

  data: () => ({
    input_str: '',
    nowDate: 0,
  }),
  computed: {
    ...mapGetters({ room: 'getData' }),
  },
  watch: {
    'room.messages'() {
      this.$refs.chatArea.scrollTop = this.$refs.chatArea.scrollHeight
    },
  },
  mounted() {
    this.assignNowDate()
    this.$refs.chatArea.scrollTop = this.$refs.chatArea.scrollHeight
  },
  methods: {
    assignNowDate() {
      setInterval(() => {
        this.nowDate = Date.now()
      }, 1000)
    },
    getTimerText() {
      const second = Math.floor(
        (this.room.chatStartDate + 300000 - this.nowDate) / 1000
      ) // 5 * 60 * 1000 = 30000  5 minute after this.chatStartDate
      if (second > 30000) {
        return '取得中'
      }
      if (second < 0 && this.room.turn === TURN.CHAT) {
        nextTurn(this.$route.query.roomId)
        return '時間切れ'
      }
      const minText = Math.floor(second / 60)
        .toString()
        .padStart(2, '0')
      const secText = (second % 60).toString().padStart(2, '0')
      return minText + ':' + secText
    },
    submit(message) {
      if (message.length > 0) {
        sendMessage(this.roomId, this.user, message, this.room.day, this.mode)
        this.input_str = ''
      }
    },
    ...mapActions(['bindData']),
  },
}
</script>
