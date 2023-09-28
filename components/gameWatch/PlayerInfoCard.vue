<template>
  <div>
    <v-card>
      <v-row>
        <v-col cols="4">
          <div v-if="user.isDead === true">
            <v-img
              max-width="100%"
              max-height="250"
              position="absolute"
              top="0%"
              left="0%"
              opacity="0.8"
              z-index="0"
              :src="user.role !== '' ? Role[user.role].deadicon : ''"
            />
          </div>
          <div v-if="user.isDead === false && user.unit === true">
            <v-img
              max-width="100%"
              max-height="250"
              position="absolute"
              top="0%"
              left="0%"
              opacity="0.8"
              z-index="0"
              :src="user.role !== '' ? Role[user.role].hasuniticon : ''"
            />
          </div>
          <div v-if="user.isDead === false && user.unit === false">
            <v-img
              max-width="100%"
              max-height="250"
              position="absolute"
              top="0%"
              left="0%"
              opacity="0.8"
              z-index="0"
              :src="user !== '' ? Role[user.role].nouniticon : ''"
            />
          </div>
        </v-col>
        <v-col cols="8">
          <p class="text-center">
            [name] : {{ user.user }}
          </p>
          <p class="text-center">
            [job] : {{ user.role !== '' ? Role[user.role].name : '' }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-card-text>
          <div
            ref="chatArea"
            class="overflow-y-auto"
            style="height: 10rem"
          >
            <v-list>
              <div
                v-for="(message, messageId) in room.messages"
                :key="messageId"
              >
                <div v-if="message.mode === 'log'">
                  <div v-if="message.user === user.user">
                    <p class="text-center">
                      {{ message.day }}学期 :
                      {{ message.message }}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <br>
              </div>
            </v-list>
          </div>
        </v-card-text>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { Role } from '~/scripts/constants'
export default {
  props:
    {
      room: {
        type: Object,
        required: true
      },
      user: {
        type: Object,
        required: true
      },
    },
  computed: {
    Role: () => Role,
  },
  watch: {
    'room.messages' () {
      this.$refs.chatArea.scrollTop = this.$refs.chatArea.scrollHeight
    }
  },
  mounted: () => {
  },
}
</script>
