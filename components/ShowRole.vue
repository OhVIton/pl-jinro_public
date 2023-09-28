<template>
  <div>
    <v-row>
      <v-col cols="2" align-self="center">
        <v-img max-height="12rem" :src="(Role[room.users[$route.query.user].role] !== undefined ? Role[room.users[$route.query.user].role].icon : '')" />
      </v-col>
      <v-col align-self="center" cols="10">
        <v-card v-if="!room.users[$route.query.user].isDead" :color="groupColor(Role[room.users[$route.query.user].role] !== undefined ? Role[room.users[$route.query.user].role].group : '')">
          <v-card-title>あなたの役職は{{ Role[room.users[$route.query.user].role] !== undefined ? Role[room.users[$route.query.user].role].name : '' }} です</v-card-title>
          <v-card-subtitle>{{ Role[room.users[$route.query.user].role] !== undefined ? Role[room.users[$route.query.user].role].description : '' }}</v-card-subtitle>
        </v-card>
        <v-card v-else>
          <v-card-title>あなたは除籍されました</v-card-title>
        </v-card>
        <v-card v-if="(room.users !== undefined ? room.users[$route.query.user].role === 'Werewolf' : false) && (room.roles !== undefined ? room.roles.filter(x => x === 'Werewolf').length > 1 : false)">
          <v-card-title>あなたの同じ役職のプレイヤーが他にいます</v-card-title>
          <v-card-text>
            <ul>
              <div v-for="u in room.users" :key="u.user">
                <li v-if="u.user !== $route.query.user && u.role === 'Werewolf'">
                  {{ u.user }}
                </li>
              </div>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { groupColor, Role } from '~/scripts/constants'
export default {
  name: 'ShowRole',
  computed: {
    Role: () => Role,
    groupColor: () => groupColor,
    ...mapGetters({ room: 'getData' })
  }
}
</script>
