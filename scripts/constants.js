export const TURN = {
  WAITING: 0,
  DAY: 1,
  CHAT: 2,
  VOTE: 3,
  VOTE_RESULT: 4,
  NIGHT: 5,
  END: -1,
}

export const GROUP = {
  NONE: 0,
  VILLAGE: 1,
  WOLF: 2,
  TF: 3,
}
export function turnText(turn) {
  switch (turn) {
    case TURN.WAITING:
      return '待機中'
    case TURN.DAY:
      return '開講'
    case TURN.CHAT:
      return '講義'
    case TURN.VOTE:
      return 'テスト'
    case TURN.VOTE_RESULT:
      return 'テスト返却'
    case TURN.NIGHT:
      return '成績処理'
    default:
      return '終了'
  }
}

export function groupText(group) {
  switch (group) {
    case GROUP.NONE:
      return 'なし'
    case GROUP.VILLAGE:
      return '学生チーム'
    case GROUP.WOLF:
      return '退学者チーム'
    case GROUP.TF:
      return '一限チーム'
  }
}

export function groupColor(group) {
  switch (group) {
    case GROUP.VILLAGE:
      return 'blue'
    case GROUP.WOLF:
      return 'red'
    case GROUP.TF:
      return '#c38743'
    default:
      return 'black'
  }
}

// 落単したら開講中の行動ができなくなる
export const Role = {
  Villager: {
    name: '学生',
    description: '一般的な学生です。成績処理中は祈ることしかできません。',
    group: GROUP.VILLAGE,
    icon: '/img/roles/villager.webp',
    hasuniticon: '/img/roles/hasunit/villager.webp',
    nouniticon: '/img/roles/nounit/villager.webp',
    deadicon: '/img/roles/dead/villager.webp',
  },
  Seer: {
    name: '学務',
    description:
      '成績処理中に1人を「退学者か退学者ではないか」と「単位を落としているか落としていないか」を照会することができます。退学者でない場合、役職まではわかりません。',
    group: GROUP.VILLAGE,
    icon: '/img/roles/seer.webp',
    hasuniticon: '/img/roles/hasunit/seer.webp',
    nouniticon: '/img/roles/nounit/seer.webp',
    deadicon: '/img/roles/dead/seer.webp',
  },
  Hunter: {
    name: '先輩',
    description:
      '成績処理中に自分を除く1人を退学者から守ることができます。先輩が2人以上いる場合、それぞれの先輩が1人のプレイヤーを守ることができます。',
    group: GROUP.VILLAGE,
    icon: '/img/roles/hunter.webp',
    hasuniticon: '/img/roles/hasunit/hunter.webp',
    nouniticon: '/img/roles/nounit/hunter.webp',
    deadicon: '/img/roles/dead/hunter.webp',
  },
  Professor: {
    name: '教授',
    description:
      '成績処理中に自分を含めて1人に単位を与えることが出来ます。その成績処理中に一限さんが単位を奪おうとした人に与えようとすると失敗します。',
    group: GROUP.VILLAGE,
    icon: '/img/roles/professor.webp',
    hasuniticon: '/img/roles/hasunit/professor.webp',
    nouniticon: '/img/roles/nounit/professor.webp',
    deadicon: '/img/roles/dead/professor.webp',
  },
  Werewolf: {
    name: '退学者',
    description:
      '成績処理中に1人を除籍させることができます。退学者が2人以上いる場合、退学者全体で話し合い、1人を除籍します。退学者同士は誰が退学者か知ることができ、成績処理中の間は退学者同士で会話することができます。',
    group: GROUP.WOLF,
    icon: '/img/roles/werewolf.webp',
    hasuniticon: '/img/roles/hasunit/werewolf.webp',
    nouniticon: '/img/roles/nounit/werewolf.webp',
    deadicon: '/img/roles/dead/werewolf.webp',
  },
  TF: {
    name: '一限',
    description:
      '成績処理中に2人の単位を奪うことが出来ます。自分は単位を持っています。なお、一限さんは退学者から除籍されません。また、落単をさせる際、全てのプレイヤーの単位状況を把握することができます。',
    group: GROUP.TF,
    icon: '/img/roles/tf.webp',
    hasuniticon: '/img/roles/hasunit/tf.webp',
    nouniticon: '/img/roles/nounit/tf.webp',
    deadicon: '/img/roles/dead/tf.webp',
  },
}
