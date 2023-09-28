<template>
  <div>
    <v-card v-if="room.users[$route.query.user].role === 'Villager'">
      <v-card-title>祈りましょう</v-card-title>
    </v-card>

    <v-card v-else-if="room.users[$route.query.user].role === 'Seer'">
      <v-card-title>誰を照会するか決めてください</v-card-title>
      <v-row>
        <v-col v-for="u in room.users" :key="u.user">
          <v-card v-if="$route.query.user !== u.user" class="elevation-1">
            <v-card-title>{{ u.user }}</v-card-title>
            <v-card-text v-if="u.isDead">
              <v-btn disabled>
                除籍
              </v-btn>
            </v-card-text>
            <v-card-text v-else>
              <div v-if="!room.users[$route.query.user].isSelected">
                <v-btn color="primary" @click="divine(u.user)">
                  照会
                </v-btn>
              </div>
              <div v-else>
                <v-btn disabled>
                  照会
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-card-text v-if="room.users[$route.query.user].isSelected">
        <div v-if="divineResult.user !== ''">
          <v-card v-if="divineResult.isWolf" :color="groupColor(GROUP.WOLF)">
            <v-row>
              <v-col cols="10" align-self="center">
                <v-card-title>
                  {{ divineResult.user }} は退学者です
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
          <v-card v-else :color="groupColor(GROUP.VILLAGE)">
            <v-row>
              <v-col cols="10" align-self="center">
                <v-card-title>
                  {{ divineResult.user }} は退学者ではありません
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
          <v-card v-if="divineResult.hasUnit" color="green" class="mt-4">
            <v-row>
              <v-col cols="10" align-self="center">
                <v-card-title>
                  {{ divineResult.user }} は単位を持っています
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
          <v-card v-else :color="groupColor(GROUP.TF)" class="mt-4">
            <v-row>
              <v-col cols="10" align-self="center">
                <v-card-title>
                  {{ divineResult.user }} は単位を持っていません
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </v-card-text>
    </v-card>

    <v-card v-else-if="room.users[$route.query.user].role === 'Hunter'">
      <v-card-title>誰を守るか決めてください</v-card-title>
      <v-row>
        <v-col v-for="u in room.users" :key="u.user">
          <v-card v-if="u.user !== $route.query.user" class="elevation-1">
            <v-card-title>{{ u.user }}</v-card-title>
            <v-card-text v-if="u.isDead">
              <v-btn disabled>
                除籍
              </v-btn>
            </v-card-text>
            <v-card-text v-else>
              <div v-if="!room.users[$route.query.user].isSelected">
                <v-btn color="primary" @click="guard(u.user)">
                  守る
                </v-btn>
              </div>
              <div v-else>
                <v-btn disabled>
                  守る
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-card v-else-if="room.users[$route.query.user].role === 'Professor'">
      <v-card-title>誰に単位を与えるか決めてください</v-card-title>
      <v-row>
        <v-col v-for="u in room.users" :key="u.user">
          <v-card class="elevation-1">
            <v-card-title>{{ u.user }}</v-card-title>
            <v-card-text v-if="u.isDead">
              <v-btn disabled>
                除籍
              </v-btn>
            </v-card-text>
            <v-card-text v-else>
              <div v-if="!room.users[$route.query.user].isSelected">
                <v-btn color="primary" @click="give(u.user)">
                  与える
                </v-btn>
              </div>
              <div v-else>
                <v-btn disabled>
                  与える
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-btn
        v-if="!room.users[$route.query.user].isSelected"
        @click="addReady($route.query.roomId, $route.query.user)"
      >
        与えない
      </v-btn>
    </v-card>

    <div v-else-if="room.users[$route.query.user].role === 'Werewolf'">
      <v-card v-if="room.day !== 1">
        <v-card-title v-if="room.licensedToKill === $route.query.user">
          誰を除籍させるか決めてください
        </v-card-title>
        <v-card-title v-else>
          {{ room.licensedToKill }}
          が除籍させます。誰を除籍させるか相談して決めましょう。
        </v-card-title>
        <v-row>
          <v-col v-for="u in room.users" :key="u.user">
            <v-card v-if="u.user !== $route.query.user" class="elevation-1">
              <v-card-title>{{ u.user }}</v-card-title>
              <v-card-text v-if="u.isDead">
                <v-btn disabled>
                  除籍
                </v-btn>
              </v-card-text>
              <v-card-text v-else>
                <div
                  v-if="
                    !room.users[$route.query.user].isSelected &&
                      u.role !== 'Werewolf' &&
                      room.licensedToKill === $route.query.user
                  "
                >
                  <v-btn color="primary" @click="attack(u.user)">
                    除籍させる
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn disabled>
                    除籍させる
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card v-else>
        <v-card-title>初日は鳴りを潜めておきましょう...</v-card-title>
      </v-card>
    </div>

    <v-card v-else-if="room.users[$route.query.user].role === 'TF'">
      <v-card-title v-if="!room.users[$route.query.user].isSelected">
        誰を落単させるか決めてください 残り: {{ TFActionLeft }}
      </v-card-title>
      <v-row>
        <v-col v-for="u in room.users" :key="u.user">
          <v-card v-if="u.user !== $route.query.user" class="elevation-1">
            <v-card-title>{{ u.user }}</v-card-title>
            <v-card-text v-if="u.isDead">
              <v-btn disabled>
                除籍
              </v-btn>
            </v-card-text>
            <v-card-text v-if="!u.unit">
              <v-btn disabled>
                落単済み
              </v-btn>
            </v-card-text>
            <v-card-text v-else>
              <div v-if="u.role === 'TF'">
                <v-btn disabled>
                  {{ Role[u.role].name }}
                </v-btn>
              </div>
              <div
                v-else-if="
                  !room.users[$route.query.user].isSelected &&
                    !selectedUsers.includes(u.user)
                "
              >
                <v-btn color="primary" @click="rob(u.user)">
                  落単させる
                </v-btn>
              </div>
              <div v-else>
                <v-btn disabled>
                  落単させる
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-btn
        @click="
          TFActionLeft = 0
          rob('')
        "
      >
        確定
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Role, groupColor, GROUP } from '~/scripts/constants'
import {
  addReady,
  doAction,
  sendMessage,
  enableSelected,
} from '~/scripts/repository'

export default {
  name: 'NightAction',
  data: () => ({
    // room.users[$route.query.user].isSelected: false,
    TFActionLeft: 2,
    selectedUsers: [],
    divineResult: { user: '', isWolf: false, hasUnit: false },
  }),
  computed: {
    Role: () => Role,
    addReady: () => addReady,
    groupColor: () => groupColor,
    GROUP: () => GROUP,
    ...mapGetters({ room: 'getData' }),
  },
  methods: {
    divine(userId) {
      this.divineResult.user = userId
      if (this.room.users[userId].role === 'Werewolf') {
        this.divineResult.isWolf = true
      }

      if (this.room.users[userId].unit) {
        this.divineResult.hasUnit = true
      }
      // addReady(this.$route.query.roomId, this.$route.query.user)
      enableSelected(this.$route.query.roomId, this.$route.query.user)
      // this.room.users[$route.query.user].isSelected = true

      const logText = `[行動] ${this.$route.query.user} が ${userId} を照会しました`
      sendMessage(
        this.$route.query.roomId,
        this.$route.query.user,
        logText,
        this.room.day,
        'log'
      )
    },
    guard(userId) {
      doAction(
        this.$route.query.roomId,
        userId,
        Role.Hunter,
        this.$route.query.user
      )
      // addReady(this.$route.query.roomId, this.$route.query.user)
      enableSelected(this.$route.query.roomId, this.$route.query.user)
      // this.room.users[$route.query.user].isSelected = true

      const logText = `[行動] ${this.$route.query.user} が ${userId} を守りました`
      sendMessage(
        this.$route.query.roomId,
        this.$route.query.user,
        logText,
        this.room.day,
        'log'
      )
    },
    give(userId) {
      doAction(this.$route.query.roomId, userId, Role.Professor, '')
      // addReady(this.$route.query.roomId, this.$route.query.user)
      enableSelected(this.$route.query.roomId, this.$route.query.user)
      // this.room.users[$route.query.user].isSelected = true

      const logText = `[行動] ${this.$route.query.user} が ${userId} に単位を与えました`
      sendMessage(
        this.$route.query.roomId,
        this.$route.query.user,
        logText,
        this.room.day,
        'log'
      )
    },
    attack(userId) {
      doAction(this.$route.query.roomId, userId, Role.Werewolf, '')
      // addReady(this.$route.query.roomId, this.$route.query.user)
      enableSelected(this.$route.query.roomId, this.$route.query.user)
      // this.room.users[$route.query.user].isSelected = true

      const logText = `[行動] ${this.$route.query.user} が ${userId} を除籍させました`
      sendMessage(
        this.$route.query.roomId,
        this.$route.query.user,
        logText,
        this.room.day,
        'log'
      )
    },
    rob(userId) {
      this.TFActionLeft--
      if (this.TFActionLeft > 0) {
        this.selectedUsers.push(userId)
      } else {
        // this.room.users[$route.query.user].isSelected = true
        if (userId !== '') {
          this.selectedUsers.push(userId)
        }
        doAction(
          this.$route.query.roomId,
          this.selectedUsers,
          Role.TF,
          this.$route.query.user
        )
        enableSelected(this.$route.query.roomId, this.$route.query.user)
        // addReady(this.$route.query.roomId, this.$route.query.user)
      }

      const logText = `[行動] ${this.$route.query.user} が ${userId} を落単させました`
      sendMessage(
        this.$route.query.roomId,
        this.$route.query.user,
        logText,
        this.room.day,
        'log'
      )
    },
  },
}
</script>
