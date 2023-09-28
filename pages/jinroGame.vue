<template>
  <v-main>
    <v-card>
      <v-card-title>
        <v-chip label outlined color="blue" class="mr-6">
          {{ $route.query.roomId }}
        </v-chip>
        <v-chip outlined label color="light-blue" class="mr-2">
          <v-icon class="mr-2">
            mdi-account
          </v-icon>
          {{ $route.query.user }}
        </v-chip>
      </v-card-title>
      <v-card-text class="display-2">
        <v-row align="center">
          <v-col cols="2">
            <v-img
              v-if="room.turn === TURN.NIGHT"
              src="/img/turn/night.webp"
              max-height="4rem"
              contain
            />
            <v-img
              v-else-if="
                room.turn === TURN.DAY ||
                  room.turn === TURN.CHAT ||
                  room.turn === TURN.VOTE ||
                  room.turn === TURN.VOTE_RESULT
              "
              src="/img/turn/day.webp"
              max-height="4rem"
              contain
            />
          </v-col>
          <v-col>
            {{ room.day }}学期
            {{ turnText(room.turn) }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text>
        <div v-if="room.turn === TURN.WAITING">
          <v-row>
            <v-col cols="12" md="4">
              <v-card>
                <v-card-title>構成</v-card-title>
                <v-card-text>
                  <div v-for="(role, index) in room.roles" :key="index">
                    <v-row>
                      <v-col cols="2">
                        <v-img
                          :src="Role[role].icon"
                          max-height="3rem"
                          contain
                        />
                      </v-col>
                      <v-col align-self="center" cols="10">
                        {{ Role[role] !== undefined ? Role[role].name : '' }}
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="8">
              <Chat
                :room-id="$route.query.roomId"
                :user="$route.query.user"
                :mode="'waiting'"
              />
            </v-col>
          </v-row>
          <div v-if="isHost($route.query.user)">
            <v-btn
              v-if="Object.keys(room.users).length === room.roles.length"
              class="mt-2"
              @click="assignRoles($route.query.roomId)"
            >
              始める
            </v-btn>
            <v-btn v-else class="mt-2" disabled>
              始める
            </v-btn>
          </div>
        </div>

        <div v-else-if="room.turn === TURN.DAY">
          <ShowRole />
          <DayTime />
        </div>

        <div v-else-if="room.turn === TURN.CHAT">
          <ShowRole />
          <v-row>
            <v-col cols="12" md="4">
              <v-card>
                <v-card-title>構成</v-card-title>
                <v-card-text>
                  <div v-for="(role, index) in room.roles" :key="index">
                    <v-row>
                      <v-col cols="2">
                        <v-img
                          :src="Role[role].icon"
                          max-height="3rem"
                          contain
                        />
                      </v-col>
                      <v-col align-self="center" cols="10">
                        {{ Role[role] !== undefined ? Role[role].name : '' }}
                      </v-col>
                    </v-row>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="8">
              <Chat
                :room-id="$route.query.roomId"
                :user="$route.query.user"
                :mode="'turn'"
              />
            </v-col>
          </v-row>
        </div>

        <div v-else-if="room.turn === TURN.VOTE">
          <VoteTime />
        </div>

        <div v-else-if="room.turn === TURN.VOTE_RESULT">
          <VoteResult />
        </div>

        <div
          v-else-if="
            room.turn === TURN.NIGHT &&
              !(room.users[$route.query.user] !== undefined
                ? room.users[$route.query.user].isDead
                : false)
          "
        >
          <ShowRole />
          <v-row>
            <v-col cols="12" sm="6">
              <NightAction />
            </v-col>
            <v-col cols="12" sm="6">
              <Chat
                v-if="
                  room.users !== undefined
                    ? room.users[$route.query.user].role === 'Werewolf'
                    : false
                "
                :room-id="$route.query.roomId"
                :user="$route.query.user"
                :mode="'wolf'"
              />
            </v-col>
          </v-row>
        </div>

        <div v-else-if="room.turn === TURN.END">
          <GameOver />
          <Chat
            :room-id="$route.query.roomId"
            :user="$route.query.user"
            :mode="'over'"
          />
        </div>

        <div
          v-if="
            room.turn !== TURN.WAITING &&
              !(room.users !== undefined
                ? room.users[$route.query.user].isDead
                : false)
          "
        >
          <v-card-text
            v-if="
              room.usersReady !== undefined
                ? room.usersReady.includes($route.query.user)
                : false
            "
          >
            まだReadyしていません
          </v-card-text>
          <v-btn @click="addReady($route.query.roomId, $route.query.user)">
            Ready
          </v-btn>
        </div>
      </v-card-text>
      <v-card-text v-if="room.turn !== TURN.END">
        {{
          room.usersReady !== undefined && room.users !== undefined
            ? `${Object.keys(room.users).length - room.usersReady.length}/${
              Object.keys(room.users).length
            }`
            : ''
        }}
        の操作を待っています
      </v-card-text>
      <v-card-actions>
        <v-btn to="/">
          Back To Home
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Role, TURN, turnText } from '~/scripts/constants'
import DayTime from '~/components/DayTime.vue'
import Chat from '~/components/Chat.vue'
import VoteTime from '~/components/VoteTime.vue'
import VoteResult from '~/components/VoteResult.vue'
import NightAction from '~/components/NightAction.vue'
import GameOver from '~/components/GameOver.vue'
import ShowRole from '~/components/ShowRole.vue'

import { assignRoles, addReady, nextTurn } from '~/scripts/repository'

export default {
  name: 'JinroGame',
  components: {
    DayTime,
    Chat,
    NightAction,
    VoteTime,
    VoteResult,
    GameOver,
    ShowRole,
  },
  data: () => {
    return {}
  },
  computed: {
    TURN: () => TURN,
    Role: () => Role,
    nextTurn: () => nextTurn,
    assignRoles: () => assignRoles,
    turnText: () => turnText,
    addReady: () => addReady,
    ...mapGetters({ room: 'getData' }),
  },
  watch: {
    'room.usersReady'() {
      if (
        this.isHost(this.$route.query.user) &&
        Object.keys(
          this.room.usersReady !== undefined ? this.room.usersReady : []
        ).length === 0
      ) {
        this.nextTurn(this.$route.query.roomId)
      }
    },
  },
  mounted() {
    this.$store.dispatch('bindData', this.$route.query.roomId)
  },

  methods: {
    isHost(user) {
      return this.room.owner === user
    },
    ...mapActions(['bindData']),
  },
}
</script>
