(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{447:function(e,t,r){"use strict";r.r(t);r(11),r(12),r(14),r(7),r(17),r(13),r(18);var n=r(3),o=r(87),c=r(438);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var d={name:"DayTime",props:{roomid:{type:String,default:"1234"},user:{type:String,default:"test"}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({Role:function(){return c.b}},Object(o.d)({room:"getData"}))},v=d,f=r(96),O=r(138),m=r.n(O),y=r(439),_=r(437),component=Object(f.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.room.users[e.$route.query.user].isDead?e.room.users[e.$route.query.user].deathOfDay===e.room.day-1?r("v-card",[r("v-card-title",[e._v("あなたは除籍されました")])],1):r("v-card",[r("v-card-title",[e._v("あなたは除籍されています")])],1):r("v-card",[r("v-card-title",[e._v("あなたの役職は "+e._s(void 0!==e.Role[e.room.users[e.$route.query.user].role]?e.Role[e.room.users[e.$route.query.user].role].name:"")+" です")]),e._v(" "),r("v-card-subtitle",[e._v(e._s(void 0!==e.Role[e.room.users[e.$route.query.user].role]?e.Role[e.room.users[e.$route.query.user].role].description:""))])],1),e._v(" "),1!==e.room.day?r("v-card",[r("v-card-title",[e._v("以下の人たちが除籍されました")]),e._v(" "),r("v-card-subtitle",[r("ul",e._l(e.room.users,(function(u){return r("div",{key:u.user},[u.isDead&&u.deathOfDay===e.room.day-1?r("li",[e._v("\n            "+e._s(u.user)+"\n          ")]):e._e()])})),0)])],1):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;m()(component,{VCard:y.a,VCardSubtitle:_.a,VCardTitle:_.c})},448:function(e,t,r){"use strict";r.r(t);r(11),r(12),r(14),r(7),r(17),r(13),r(18);var n=r(3),o=r(87),c=r(440);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={name:"JinroGame",props:{roomId:{type:String,default:"1234"},user:{type:String,default:"test"}},data:function(){return{input_str:""}},computed:d({},Object(o.d)({room:"getData"})),methods:d({submit:function(e){Object(c.i)(this.roomId,this.user,e,this.room.day),this.input_str=""}},Object(o.c)(["bindData"]))},f=r(96),O=r(138),m=r.n(O),y=r(280),_=r(487),component=Object(f.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h2",[e._v("\n    Player\n  ")]),e._v(" "),r("ul",e._l(e.room.users,(function(t,n){return r("div",{key:n},[t.isDead?e._e():r("li",[t.user===e.room.owner?r("p",[e._v("\n          "+e._s(t.user)+"（ホスト）\n        ")]):r("p",[e._v("\n          "+e._s(t.user)+"\n        ")])])])})),0),e._v(" "),r("h2",[e._v("\n    Chat\n  ")]),e._v(" "),e._l(e.room.messages,(function(t,n){return r("div",{key:n},[t.day===e.room.day?r("div",[e._v("\n      "+e._s(t.user)+" : "+e._s(t.message)+"\n    ")]):e._e()])})),e._v(" "),e.room.users[e.user].isDead?r("div",[r("v-text-field",{attrs:{disabled:""}})],1):r("div",[r("v-text-field",{attrs:{label:e.user},on:{keypress:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submit(e.input_str)}},model:{value:e.input_str,callback:function(t){e.input_str=t},expression:"input_str"}}),e._v(" "),r("v-btn",{on:{click:function(t){return e.submit(e.input_str)}}},[e._v("\n      送信\n    ")])],1)],2)}),[],!1,null,null,null);t.default=component.exports;m()(component,{VBtn:y.a,VTextField:_.a})},449:function(e,t,r){"use strict";r.r(t);r(11),r(12),r(14),r(7),r(17),r(13),r(18);var n=r(3),o=r(87),c=r(440);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var d={name:"JinroGame",data:function(){return{isVoted:!1}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(o.d)({room:"getData"})),methods:{vote:function(e){Object(c.j)(this.$route.query.roomId,e)}}},v=d,f=r(96),O=r(138),m=r.n(O),y=r(280),_=r(439),j=r(437),h=r(485),D=r(486),component=Object(f.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-card",[r("v-card-title",[e._v("投票")]),e._v(" "),r("v-card-text",[r("v-row",e._l(e.room.users,(function(t){return r("v-col",{key:t.user},[t.isDead?e._e():r("v-card",{staticClass:"elevation-1"},[r("v-card-title",[e._v(e._s(t.user))]),e._v(" "),r("v-card-text",[e.isVoted||e.room.users[e.$route.query.user].isDead?r("div",[r("v-btn",{attrs:{disabled:""}},[e._v("\n                  投票\n                ")])],1):r("div",[r("v-btn",{attrs:{color:"primary"},on:{click:function(r){e.isVoted=!0,e.vote(t.user)}}},[e._v("\n                  投票\n                ")])],1)])],1)],1)})),1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;m()(component,{VBtn:y.a,VCard:_.a,VCardText:j.b,VCardTitle:j.c,VCol:h.a,VRow:D.a})},450:function(e,t,r){"use strict";r.r(t);r(11),r(12),r(14),r(7),r(17),r(13),r(18);var n=r(3),o=r(87);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var l={name:"JinroGame",data:function(){return{isVoted:!1}},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(o.d)({room:"getData"})),methods:{}},d=l,v=r(96),f=r(138),O=r.n(f),m=r(439),y=r(437),component=Object(v.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-card",[r("v-card-title",[e._v("投票結果")]),e._v(" "),r("v-card-subtitle",e._l(e.room.users,(function(u){return r("div",{key:u.user},[u.isDead&&u.deathOfDay===e.room.day?r("p",{staticClass:"display-body"},[e._v("\n          "+e._s(u.user)+"\n        ")]):e._e()])})),0)],1)],1)}),[],!1,null,null,null);t.default=component.exports;O()(component,{VCard:m.a,VCardSubtitle:y.a,VCardTitle:y.c})},451:function(e,t,r){"use strict";r.r(t);r(11),r(12),r(14),r(7),r(17),r(13),r(18);var n=r(3),o=r(87),c=r(438);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var d={name:"GameOver",computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({groupText:function(){return c.d}},Object(o.d)({room:"getData"}))},v=d,f=r(96),O=r(138),m=r.n(O),y=r(439),_=r(437),component=Object(f.a)(v,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-card",[r("v-card-title",[e._v("Game Over!")]),e._v(" "),r("v-card-subtitle",[e._v("\n      Win: "+e._s(e.groupText(e.room.win))+"\n    ")])],1)],1)}),[],!1,null,null,null);t.default=component.exports;m()(component,{VCard:y.a,VCardSubtitle:_.a,VCardTitle:_.c})},488:function(e,t,r){"use strict";r.r(t);r(11),r(12),r(14),r(7),r(17),r(13),r(18);var n=r(3),o=r(87),c=r(438),l=r(447),d=r(448),v=r(449),f=r(450),O=r(467),m=r(451),y=r(440);function _(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function j(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var h={name:"JinroGame",components:{DayTime:l.default,Chat:d.default,NightAction:O.default,VoteTime:v.default,VoteResult:f.default,GameOver:m.default},data:function(){return{}},computed:j({TURN:function(){return c.c},Role:function(){return c.b},nextTurn:function(){return y.h},assignRoles:function(){return y.a},turnText:function(){return c.e}},Object(o.d)({room:"getData"})),mounted:function(){this.$store.dispatch("bindData",this.$route.query.roomId)},methods:j({isHost:function(){return this.room.owner===this.$route.query.user}},Object(o.c)(["bindData"]))},D=r(96),P=r(138),w=r.n(P),T=r(280),V=r(432),component=Object(D.a)(h,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-main",[r("h1",[e._v(e._s(e.$route.query.roomId))]),e._v(" "),r("h2",[e._v("あなた: "+e._s(e.$route.query.user))]),e._v(" "),r("h2",[e._v(e._s(e.turnText(e.room.turn)))]),e._v(" "),r("h1",[e._v("day "+e._s(e.room.day))]),e._v(" "),e.room.turn===e.TURN.WAITING?r("div",[r("Chat",{attrs:{"room-id":e.$route.query.roomId,user:e.$route.query.user}}),e._v(" "),e.isHost()?r("div",[Object.keys(e.room.users).length===e.room.roles.length?r("v-btn",{staticClass:"mt-2",on:{click:function(t){e.assignRoles(e.$route.query.roomId),e.nextTurn(e.$route.query.roomId)}}},[e._v("\n        始める\n      ")]):r("v-btn",{staticClass:"mt-2",attrs:{disabled:""}},[e._v("\n        始める\n      ")])],1):e._e()],1):e.room.turn===e.TURN.DAY?r("div",[r("DayTime",{attrs:{"room-id":e.$route.query.roomId,user:e.$route.query.user}})],1):e.room.turn===e.TURN.CHAT?r("div",[r("Chat",{attrs:{"room-id":e.$route.query.roomId,user:e.$route.query.user}})],1):e.room.turn===e.TURN.VOTE?r("div",[r("VoteTime")],1):e.room.turn===e.TURN.VOTE_RESULT?r("div",[r("VoteResult")],1):e.room.turn!==e.TURN.NIGHT||e.room.users[e.$route.query.user].isDead?e.room.turn===e.TURN.END?r("div",[r("GameOver")],1):e._e():r("div",[r("NightAction")],1),e._v(" "),e.isHost()?r("v-btn",{on:{click:function(t){return e.nextTurn(e.$route.query.roomId)}}},[e._v("\n    turn++\n  ")]):e._e(),e._v(" "),r("v-btn",{attrs:{to:"/"}},[e._v("\n    Back To Home\n  ")])],1)}),[],!1,null,null,null);t.default=component.exports;w()(component,{Chat:r(448).default,DayTime:r(447).default,VoteTime:r(449).default,VoteResult:r(450).default,NightAction:r(467).default,GameOver:r(451).default}),w()(component,{VBtn:T.a,VMain:V.a})}}]);