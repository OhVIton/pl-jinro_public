<template>
  <div>
    <!--
    <v-card v-if="!room.users[$route.query.user].isDead" :color="groupColor(Role[room.users[$route.query.user].role] !== undefined ? Role[room.users[$route.query.user].role].group : '')">
      <v-card-title>あなたの役職は {{ Role[room.users[$route.query.user].role] !== undefined ? Role[room.users[$route.query.user].role].name : '' }} です</v-card-title>
      <v-card-subtitle>{{ Role[room.users[$route.query.user].role] !== undefined ? Role[room.users[$route.query.user].role].description : '' }}</v-card-subtitle>
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

    <v-card v-else-if="room.users[$route.query.user].deathOfDay === room.day - 1">
      <v-card-title>あなたは除籍されました</v-card-title>
    </v-card>

    <v-card v-else-if="room.users[$route.query.user].isDead">
      <v-card-title>あなたは除籍されています</v-card-title>
    </v-card>
    -->

    <v-card v-if="room.day !== 1">
      <v-card-title>以下の人たちが除籍されました</v-card-title>
      <v-card-subtitle>
        <ul>
          <div v-for="u in room.users" :key="u.user">
            <li v-if="u.isDead && u.deathOfDay === room.day - 1 && u.codeath === 'wolf'">
              {{ u.user }}
            </li>
          </div>
        </ul>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { groupColor, Role } from '~/scripts/constants'
export default {
  name: 'DayTime',
  computed: {
    Role: () => Role,
    groupColor: () => groupColor,
    ...mapGetters({ room: 'getData' })
  }

}

</script>
