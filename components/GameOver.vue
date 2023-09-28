<template>
  <div>
    <v-card :color="groupColor(room.win)">
      <v-card-title>Game Over! {{ groupText(room.win) }}の勝利です</v-card-title>
    </v-card>
    <v-card :color="groupColor(room.win)" class="mt-3">
      <v-card-title>{{ groupText(room.win) }}</v-card-title>
    </v-card>
    <v-row class="mt-1" height="20rem">
      <div v-for="u in room.users" :key="u.user">
        <v-col v-if="room.win === Role[u.role].group">
          <v-card v-if="room.win === Role[u.role].group" height="20rem" contain>
            <v-img v-if="u.unit && !u.isDead" :src="Role[u.role].hasuniticon" height="12rem" contain />
            <v-img v-else-if="!u.isDead" :src="Role[u.role].nouniticon" height="12rem" contain />
            <v-img v-else-if="u.isDead" :src="Role[u.role].deadicon" height="12rem" contain />
            <v-card-title>{{ u.user }}</v-card-title>
            <v-card-text>
              {{ Role[u.role].name }}
              <div v-if="u.isDead">
                {{ u.deathOfDay }}学期に除籍{{ u.codeath === 'wolf' ? '(退学者)' : '(テスト)' }}
              </div>
              <div v-if="!u.unit && !u.isDead">
                落単
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </div>
    </v-row>

    <div v-for="group in GROUP" :key="group">
      <div v-if="group !== room.win && group !== GROUP.NONE">
        <v-card :color="groupColor(group)" class="mt-3 mb-3">
          <v-card-title>{{ groupText(group) }}</v-card-title>
        </v-card>
        <v-row class="mt-1" height="20rem">
          <div v-for="u in room.users" :key="u.user">
            <v-col v-if="Role[u.role].group === group">
              <v-card height="20rem" contain>
                <v-img v-if="u.unit && !u.isDead" :src="Role[u.role].hasuniticon" height="12rem" contain />
                <v-img v-else-if="!u.isDead" :src="Role[u.role].nouniticon" height="12rem" contain />
                <v-img v-else-if="u.isDead" :src="Role[u.role].deadicon" height="12rem" contain />
                <v-card-title>{{ u.user }}</v-card-title>
                <v-card-text>
                  {{ Role[u.role].name }}
                  <div v-if="u.isDead">
                    {{ u.deathOfDay }}学期に除籍{{ u.codeath === 'wolf' ? '(退学者)' : '(テスト)' }}
                  </div>
                  <div v-if="!u.unit">
                    落単
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </div>
        </v-row>
      </div>
    </div>
    <!--
    <v-card :color="groupColor(room.win)">
      <v-card-title>Game Over! {{ groupText(room.win) }}の勝利です</v-card-title>
      <v-card-text>
        <div v-for="group in GROUP" :key="group">
          <div v-if="group !== GROUP.NONE">
            <ul>
              <p />
              {{ groupText(group) }}
              <div v-for="u in room.users" :key="u.user">
                <li v-if="Role[u.role].group === group">
                  <div v-if="u.isDead">
                    <s>{{ `${Role[u.role].name}: ${u.user}` }}</s> ({{ u.deathOfDay }}学期 に除籍)
                  </div>
                  <div v-else>
                    {{ u.unit ? `${Role[u.role].name}: ${u.user}`: `${Role[u.role].name}: ${u.user}` + ' (落単)' }}
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </v-card-text>
    </v-card>
    -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { groupText, Role, GROUP, groupColor } from '~/scripts/constants'
export default {
  name: 'GameOver',
  computed: {
    groupText: () => groupText,
    groupColor: () => groupColor,
    Role: () => Role,
    GROUP: () => GROUP,
    ...mapGetters({
      room: 'getData'
    })
  }
}
</script>
