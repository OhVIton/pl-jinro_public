<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      app
      fixed
    >
      <v-dialog
        v-model="dialog"
        width="50rem"
      >
        <template #activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            ルール
          </v-btn>
        </template>
        <v-card>
          <v-card-title>ルール</v-card-title>
          <v-card-text>
            <u style="color: #c38743">
              <p class="display-1" style="color: white">
                一限さんとは
              </p>
            </u>
            一限さんとは、8人程度(推奨)で行うパーティゲームです。<br>
            まず最初に各プレイヤーは、学生側、退学者、一限さんに分けられます。<br>
            このゲームの醍醐味は、退学者や一限さんが学生になりすまして嘘をついたり、<br>
            他の人に退学者や一限さんの疑いをかけるなどの心理戦が行われるところです。<br>
            <br>
            <br>
            <u style="color: #c38743">
              <p class="display-1" style="color: white">
                勝敗について
              </p>
            </u>
            一限さんは人狼ゲームと同様、ゲームを進めていくと人数が減っていきます。<br>
            そして、それぞれの陣営には勝利条件があります。<br>
            <br>
            <v-card outlined>
              <v-data-table :headers="ruleHeaders[0]" :items="ruleItems[0]" hide-default-footer />
            </v-card>
            <br>
            <u style="color: #c38743">
              <p class="display-1" style="color: white">
                シーンについて
              </p>
            </u>
            {{ turnText(TURN.DAY) }}・{{ turnText(TURN.VOTE) }} {{ turnText(TURN.NIGHT) }}の3つのシーンがあり、{{ turnText(TURN.NIGHT) }}のシーンからゲーム開始します。<br>
            <br>
            <v-card outlined>
              <v-data-table :headers="ruleHeaders[1]" :items="ruleItems[1]" hide-default-footer />
            </v-card>
            <br>
            <u style="color: #c38743">
              <p class="display-1" style="color: white">
                {{ turnText(TURN.DAY) }}中の行動について
              </p>
            </u>
            <br>
            それぞれの役職により、{{ turnText(TURN.NIGHT) }}中にできる行動が異なります。<br>
            <br>
            <v-card outlined>
              <v-data-table :headers="ruleHeaders[2]" :items="ruleItems[2]" hide-default-footer />
            </v-card>
            <br>
            <u style="color: #c38743">
              <p class="display-1" style="color: white">
                除籍されたプレイヤーについて
              </p>
            </u>
            <br>
            除籍されたプレイヤーはチャットで発言することができなくなります。<br>
            例えば、学務であった場合でも照会結果を発表できません。<br>
            <br>
            <br>
            <u style="color: #c38743">
              <p class="display-1" style="color: white">
                おすすめの配役
              </p>
            </u>
            <br>
            <v-card outlined>
              <v-data-table :headers="ruleHeaders[3]" :items="ruleItems[3]" hide-default-footer />
            </v-card>
            <br>
            <u style="color: #c38743">
              <p class="display-1" style="color: white">
                役職について
              </p>
            </u>
            <v-card v-for="role in Role" :key="role.name" :color="groupColor(role.group)" class="mt-3">
              <v-card-title>({{ groupText(role.group) }}) {{ role.name }}</v-card-title>
              <v-card-text>
                {{ role.description }}
              </v-card-text>
            </v-card>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" block @click="dialog = false">
              閉じる
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container pt-0>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { Role, groupColor, groupText, turnText, TURN } from '~/scripts/constants'
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        }
      ],
      miniVariant: false,
      right: true,
      dialog: false,
      title: '一限さん',
      ruleHeaders: [[
        { text: '陣営', value: 'team' },
        { text: '勝利条件', value: 'condition' },
      ],
      [
        { text: 'シーン', value: 'scene' },
        { text: '行動内容', value: 'action' },
      ],
      [
        { text: '役職', value: 'role' },
        { text: '行動内容', value: 'action' },
      ], [

        { text: '定員', value: 'capacity' },
        { text: '学生', value: 'student' },
        { text: '学務', value: 'seer' },
        { text: '先輩', value: 'hunter' },
        { text: '教授', value: 'professor' },
        { text: '退学者', value: 'werewolf' },
        { text: '一限さん', value: 'tf' },
      ]
      ],
      ruleItems: [[
        {
          team: '学生側',
          condition: '退学者を全て除籍させる。一限さんの勝利条件を満たしていない。',
        },
        {
          team: '退学者',
          condition: '退学者の数≧学生側＋一限さんの数 にする。一限さんの勝利条件を満たしていない。',
        },
        {
          team: '一限さん',
          condition: '自分を除く生存者をすべて落単させる。',
        }
      ], [
        {
          scene: turnText(TURN.DAY),
          action: '残っている人たちでチャットし、誰が退学者、一限さんかを推理する。学務が照会結果を発表するなどして議論を進める。',
        },
        {
          scene: turnText(TURN.VOTE),
          action: '誰を除籍するか多数決で決める。最多票が複数いた場合は1人ランダムに除籍される。また、過半数がパスを選択した場合は誰も除籍されない。',
        },
        {
          scene: turnText(TURN.NIGHT),
          action: '退学者による除籍、学務による照会、一限さんによる落単など、成績処理中に行動ができる役職がアクションを起こす。退学者を全て除籍させる。',
        },
      ], [
        {
          role: '学生',
          action: '成績処理中は祈ることしかできず、何も行動を起こせない。',
        },
        {
          role: '学務',
          action: '誰か1人を選択して退学者であるかどうかと単位状況を照会できる。',
        },
        {
          role: '先輩',
          action: '誰か1人を選択して退学者による除籍と一限さんによる落単から守ることができる。',
        },
        {
          role: '教授',
          action: '誰か1人を選択して単位を与えることができる。',
        },
        {
          role: '退学者',
          action: '誰か1人を選択して除籍させる。退学者が複数いる場合は専用チャットで相談し、1人を除籍させる。最初の成績処理中のターンのみ、除籍させることができない。',
        },
        {
          role: '一限さん',
          action: '誰か2人を選択して落単させる。また、全員の単位状況を確認することができる。',
        },
      ], [
        {
          capacity: '8人(推奨)',
          student: '2',
          seer: '1',
          hunter: '1',
          professor: '1',
          werewolf: '2',
          tf: '1',
        },
        {
          capacity: '9人',
          student: '3',
          seer: '1',
          hunter: '1',
          professor: '1',
          werewolf: '2',
          tf: '1',
        },
        {
          capacity: '10人',
          student: '4',
          seer: '1',
          hunter: '1',
          professor: '1',
          werewolf: '2',
          tf: '1',
        },
        {
          capacity: '11人',
          student: '4',
          seer: '1',
          hunter: '1',
          professor: '1',
          werewolf: '3',
          tf: '1',
        },
        {
          capacity: '12人',
          student: '5',
          seer: '1',
          hunter: '1',
          professor: '1',
          werewolf: '3',
          tf: '1',
        },
      ]
      ]
    }
  },
  computed: {
    Role: () => Role,
    groupColor: () => groupColor,
    groupText: () => groupText,
    TURN: () => TURN,
    turnText: () => turnText,
  }
}
</script>
