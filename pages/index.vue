<template>
  <v-main>
    <v-card>
      <v-row>
        <v-col cols="12" md="6">
          <v-img class="ml-md-3" src="/img/top/banner.webp" style="height: 100vh" />
        </v-col>
        <v-col cols="12" md="6">
          <v-card-text>
            <v-card>
              <v-card-title>ルームを作成</v-card-title>
              <v-card-text>
                <v-text-field v-model="ownId" label="Room ID" />
                <v-text-field v-model="owner" label="Username" />

                <v-row>
                  <v-col v-for="(r, index) in Role" :key="index" type="number" cols="6" sm="2">
                    <v-text-field
                      v-model.number="rolesBreakDown[index]"
                      :label="r.name"
                      cols="3"
                      type="number"
                      :color="groupColor(r.group)"
                      @change="() => { if(rolesBreakDown[index] < 0) rolesBreakDown[index] = 0}"
                    />
                  </v-col>
                </v-row>

                <v-btn v-if="ownId != '' & owner != ''" type="number" nuxt @click="start()">
                  Start
                </v-btn>
                <v-btn v-else disabled>
                  Start
                </v-btn>
              </v-card-text>
            </v-card>
          </v-card-text>

          <v-card-text>
            <v-card>
              <v-card-title>ルームに参加</v-card-title>

              <v-card-text>
                <v-text-field v-model="roomId" label="Room ID" />
                <v-text-field v-model="joinUser" label="Username" />

                <v-btn v-if="roomId != '' & joinUser != ''" nuxt @click="join(roomId, joinUser)">
                  Join
                </v-btn>
                <v-btn v-else disabled>
                  Join
                </v-btn>
              </v-card-text>
            </v-card>
          </v-card-text>

          <v-card-text>
            <v-card>
              <v-card-title>ルームを閲覧</v-card-title>

              <v-card-text>
                <v-text-field v-model="watchId" label="Room ID" />

                <v-btn v-if="watchId != ''" nuxt @click="watch(watchId, joinUser)">
                  Join
                </v-btn>
                <v-btn v-else disabled>
                  Join
                </v-btn>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-main>
</template>

<script>
import { joinUser, createRoom, isRoomExist, isUserExist, isGameStarted } from '~/scripts/repository'
import { groupColor, Role } from '~/scripts/constants'
export default {
  name: 'JinroIndex',
  data: () => {
    return {
      title: '一限さん',
      roomId: '',
      joinUser: '',
      owner: '',
      ownId: '',
      watchId: '',
      rolesBreakDown: Object.fromEntries(Object.keys(Role).map(x => [x, 0]))
    }
  },
  computed: {
    Role: () => Role,
    groupColor: () => groupColor
  },
  mounted () {
    this.$store.dispatch('bindData', this.$route.query.roomId)
  },
  methods: {
    async start () {
      if (await isRoomExist(this.ownId)) {
        alert('すでに使用されているルームIDです')
        return
      }

      createRoom(this.ownId, this.owner, this.rolesBreakDown)
      this.join(this.ownId, this.owner)
    },
    async join (roomId, user) {
      if (!(await isRoomExist(roomId))) {
        alert('ルームが存在しません')
        return
      }
      if (await isGameStarted(roomId)) {
        alert('ゲームが開始されています')
        return
      }
      if (await isUserExist(roomId, user)) {
        if (!confirm('すでに使用されているユーザー名ですが、上書きしますか？')) { return }
      }

      joinUser(roomId, user)
      this.$router.push({
        path: 'jinroGame',
        query: {
          roomId,
          user
        }
      })
    },
    async watch (roomId) {
      if (!(await isRoomExist(roomId))) {
        alert('ルームが存在しません')
        return
      }

      this.$router.push({
        path: 'gameWatch',
        query: {
          roomId,
        }
      })
    }
  }
}
</script>
