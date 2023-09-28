import db from './auth'
import { TURN, Role, GROUP } from './constants'

const roomPath = function (roomId) {
  if (roomId === null) {
    return db.ref(db, 'rooms/')
  }

  return db.ref(`rooms/${roomId}`)
}

export async function isRoomExist(roomId) {
  const roomRef = roomPath(roomId)
  const snapshot = await roomRef.once('value')
  return snapshot.exists()
}

export async function isUserExist(roomId, user) {
  const roomRef = roomPath(roomId)
  const userRef = await roomRef.child('users/').once('value')
  if (userRef.exists()) {
    return (await user) in userRef.val()
  }
  return false
}

export async function isGameStarted(roomId) {
  const roomRef = roomPath(roomId)
  const snapshot = await roomRef.once('value')
  return snapshot.child('day').val() > 0
}

export async function createRoom(roomId, owner, rolesBreakDown) {
  const roles = []
  for (const key in rolesBreakDown) {
    for (let i = 0; i < rolesBreakDown[key]; i++) {
      roles.push(key)
    }
  }
  const roomRef = roomPath(roomId)
  await roomRef.set({
    owner,
    win: GROUP.NONE,
    day: 0,
    turn: 0,
    licensedToKill: '',
    usersReady: [owner],
    roles,
    messages: [],
    chatStartDate: 0,
  })
}

export async function joinUser(roomId, user) {
  const roomRef = roomPath(roomId)
  const userRef = roomRef.child('users')

  await userRef.child(user).set({
    user,
    isSelected: false,
    role: '',
    isDead: false,
    unit: true,
    isUnitStolen: false,
    isUnitGiven: false,
    deathOfDay: '',
    codeath: '',
    isGuarded: false,
    votedCnt: 0,
    votePass: false,
  })
}
export async function sendMessage(roomId, user, message, day, mode) {
  const roomRef = roomPath(roomId)
  const messageRef = roomRef.child('messages')
  const messageKey = messageRef.push().key

  await messageRef.child(messageKey).set({
    user,
    message,
    day,
    mode,
  })
}

export async function assignRoles(roomId) {
  const roomRef = roomPath(roomId)
  const rolesRef = roomRef.child('roles')
  const roles = await rolesRef.once('value')
  const shuffled = fyShuffle(await roles.val())

  const userRef = roomRef.child('users')
  const users = await userRef.once('value')
  const usersKey = Object.keys(users.val())

  for (let i = 0; i < shuffled.length; i++) {
    if (usersKey[i]) {
      const role = shuffled[i]
      const userRef = roomRef.child('users')
      await userRef.child(usersKey[i]).update({
        role,
      })
    }
  }

  roomRef.update({
    day: 1,
    usersReady: usersKey,
    turn: TURN.VOTE_RESULT,
  })
  nextTurn(roomId)
}

export async function enableSelected(roomId, user) {
  const roomRef = roomPath(roomId)
  const userRef = roomRef.child('users')
  await userRef.child(user).update({
    isSelected: true,
  })
}

export async function addReady(roomId, user) {
  const roomRef = roomPath(roomId)
  const usersReadyRef = roomRef.child('usersReady')
  const usersReady = await usersReadyRef.once('value')
  if (usersReady.val() !== null) {
    await usersReadyRef.set(usersReady.val().filter((u) => u !== user))
    enableSelected(roomId, user)
  }
}

export async function nextTurn(roomId) {
  const roomRef = roomPath(roomId)

  const chatStartDateRef = roomRef.child('chatStartDate')

  const turnRef = roomRef.child('turn')
  const turn = await turnRef.once('value')

  const dayRef = roomRef.child('day')
  const day = await dayRef.once('value')

  const userRef = roomRef.child('users')
  const users = await userRef.once('value')
  const usersKey = Object.keys(users.val())

  const curTurn = await turn.val()
  let nTurn = curTurn + 1

  switch (curTurn) {
    case TURN.WAITING:
      await dayRef.set(day.val() + 1)
      nTurn = TURN.DAY
      break

    case TURN.DAY:
      await chatStartDateRef.set(Date.now())
      nTurn = TURN.CHAT
      break

    case TURN.CHAT:
      for (let i = 0; i < usersKey.length; i++) {
        await userRef.child(usersKey[i]).update({
          votedCnt: 0,
          votePass: false,
        })
      }
      nTurn = TURN.VOTE
      break

    case TURN.VOTE: {
      let mostVotedUsers = []
      let mostVotedCnt = 0
      let votePassCnt = 0
      for (let i = 0; i < usersKey.length; i++) {
        const user = usersKey[i]
        const userData = await userRef.child(user).once('value')

        if (userData.val().votePass || userData.val().isDead) {
          votePassCnt++
        }

        if (userData.val().votedCnt > mostVotedCnt) {
          mostVotedCnt = userData.val().votedCnt
          mostVotedUsers = [user]
        } else if (userData.val().votedCnt === mostVotedCnt) {
          mostVotedUsers.push(user)
        }
      }

      if (votePassCnt <= usersKey.length / 2) {
        if (mostVotedCnt !== 0) {
          if (mostVotedUsers.length === 1) {
            await userRef.child(mostVotedUsers[0]).update({
              isDead: true,
              deathOfDay: day.val(),
              codeath: 'vote',
              unit: false,
            })
          } else {
            await userRef.child(fyShuffle(mostVotedUsers)[0]).update({
              isDead: true,
              deathOfDay: day.val(),
              codeath: 'vote',
              unit: false,
            })
          }
        }
      }

      nTurn = TURN.VOTE_RESULT
      break
    }

    case TURN.VOTE_RESULT: {
      const whoWin = await checkWhoWin(roomId)
      switch (whoWin) {
        case GROUP.NONE: {
          nTurn = TURN.NIGHT

          const wolves = []
          for (let i = 0; i < usersKey.length; i++) {
            const user = usersKey[i]
            const userData = await userRef.child(user).once('value')
            if (userData.val().role === 'Werewolf' && !userData.val().isDead) {
              wolves.push(user)
            }
          }
          roomRef.child('licensedToKill').set(fyShuffle(wolves)[0])
          break
        }
        default:
          await roomRef.update({
            win: whoWin,
          })
          nTurn = TURN.END
          break
      }
      break
    }

    case TURN.NIGHT: {
      for (let i = 0; i < usersKey.length; i++) {
        const user = usersKey[i]
        const userData = await userRef.child(user).once('value')

        // check if a person is dead
        if (
          userData.val().deathOfDay === day.val() &&
          userData.val().codeath !== 'vote'
        ) {
          await userRef.child(user).update({
            isDead: true,
            unit: false,
            codeath: 'wolf',
          })
        }

        // check if a person is guarded
        if (userData.val().isGuarded) {
          await userRef.child(user).update({
            isDead: false,
            unit: true,
            deathOfDay: '',
            isGuarded: false,
            codeath: '',
          })
        }

        // check if a person is given unit
        if (userData.val().isUnitStolen) {
          await userRef.child(user).update({
            unit: false,
            isUnitStolen: false,
          })
        } else if (userData.val().isUnitGiven) {
          await userRef.child(user).update({
            unit: true,
            isUnitGiven: false,
          })
        }
      }
      await dayRef.set(day.val() + 1)
      // nTurn = TURN.DAY

      const whoWin = await checkWhoWin(roomId)
      switch (whoWin) {
        case GROUP.NONE:
          nTurn = TURN.DAY
          break
        default:
          await roomRef.update({
            win: whoWin,
          })
          nTurn = TURN.END
          break
      }
      break
    }
    case TURN.END: {
      break
    }
  }

  const aliveUsers = []
  for (let i = 0; i < usersKey.length; i++) {
    const user = usersKey[i]
    const userData = await userRef.child(user).once('value')
    if (!(await userData.val().isDead)) {
      aliveUsers.push(user)
    }

    await userRef.child(user).update({
      isSelected: false,
    })
  }
  await roomRef.child('usersReady').set(aliveUsers)
  await turnRef.set(nTurn)
}

export async function vote(room, user, isPass) {
  const roomRef = roomPath(room)
  const userRef = roomRef.child('users')
  const userData = await userRef.child(user).once('value')

  if (isPass) {
    await userRef.child(user).update({
      votePass: true,
    })
    return
  }
  await userRef.child(user).update({
    votedCnt: userData.val().votedCnt + 1,
  })
}

export async function doAction(roomId, toUser, role, fromUser) {
  const roomRef = roomPath(roomId)
  const dayRef = roomRef.child('day')
  const day = await dayRef.once('value')
  const userRef = roomRef.child('users')

  switch (role) {
    case Role.Hunter: {
      /*
      const hunterRef = userRef.child(fromUser)
      const user = await userRef.child(toUser).once('value')

      if (user.val().role === 'Werewolf') {
        await hunterRef.update({
          isDead: true,
          deathOfDay: day.val(),
        })
      } else {
        await userRef.child(toUser).update({
          isGuarded: true,
        })
      }
      */
      await userRef.child(toUser).update({
        isGuarded: true,
      })
      break
    }
    case Role.Professor:
      await userRef.child(toUser).update({
        isUnitGiven: true,
      })
      break
    case Role.Werewolf: {
      const user = await userRef.child(toUser).once('value')
      if (user.val().role === 'TF') {
        break
      } else {
        await userRef.child(toUser).update({
          deathOfDay: day.val(),
          // unit: false,
        })
      }
      break
    }
    case Role.TF: {
      for (const user of toUser) {
        await userRef.child(user).update({
          isUnitStolen: true,
        })
      }
      break
    }
    default:
      break
  }
}

export async function checkWhoWin(roomId) {
  // check which group wins

  const roomRef = roomPath(roomId)
  const userRef = roomRef.child('users')
  const users = await userRef.once('value')
  const usersKey = Object.keys(users.val())

  const rolesRef = roomRef.child('roles')
  const roles = await rolesRef.once('value')
  const rolesVal = roles.val()

  let TFCount = 0

  for (let i = 0; i < rolesVal.length; i++) {
    if (rolesVal[i] === 'TF') {
      TFCount++
    }
  }

  let notHaveUnitCnt = 0
  let aliveTFCnt = 0
  let aliveVillageCnt = 0
  let aliveWerewolfCnt = 0

  for (let i = 0; i < usersKey.length; i++) {
    const user = usersKey[i]
    const userData = await userRef.child(user).once('value')

    if (!userData.val().unit && userData.val().role !== 'TF') {
      notHaveUnitCnt++
    }

    if (!userData.val().isDead) {
      if (Role[userData.val().role].group === GROUP.VILLAGE) {
        aliveVillageCnt++
      } else if (Role[userData.val().role].group === GROUP.WOLF) {
        aliveWerewolfCnt++
      } else if (Role[userData.val().role].group === GROUP.TF) {
        aliveTFCnt++
      }
    }
  }

  // alert(`nothaveunit: ${notHaveUnitCnt} village: ${aliveVillageCnt} werewolf: ${aliveWerewolfCnt}`)
  if (aliveTFCnt > 0 && notHaveUnitCnt === usersKey.length - TFCount) {
    return GROUP.TF
  }

  if (aliveWerewolfCnt === 0) {
    return GROUP.VILLAGE
  }

  if (aliveVillageCnt <= aliveWerewolfCnt) {
    return GROUP.WOLF
  }

  return GROUP.NONE
}

function fyShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1))
    const tmp = array[i]
    array[i] = array[r]
    array[r] = tmp
  }
  return array
}
