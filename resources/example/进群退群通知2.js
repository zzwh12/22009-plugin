import { updateGroupId, GroupChangeNotice } from './openid取qq.js'
const self_id = '102073196'
QQBotGroupIncrease()
async function QQBotGroupIncrease () {
  await sleep(30000)
  Bot[self_id].sdk.on('notice.group.decrease', async data => {
    GroupChangeNotice('decrease', `${self_id}-${data.group_id}`, `${self_id}-${data.operator_id}`)
  })
  Bot[self_id].sdk.on('notice.group.increase', async data => {
    const msg = '\r\r# 欢迎使用 📌\r***\r\r># 希望你的心情如这绚烂的花朵，每天都充满色彩和活力🌸，生活中的每一刻都值得珍惜与欢笑(˃ ⌑ ˂ഃ )'
    const list = [
      [
        { label: '绑定uid', data: '/原神绑定' },
        { label: '扫码登录', data: '/扫码登录' },
        { label: '更新面板', data: '/原神更新面板' },
        { label: '模拟抽卡', data: '/十连' }
      ], [
        { label: '体力', data: '/原神体力' },
        { label: '签到', data: '/原神签到' },
        { label: '深渊', data: '/喵喵深渊' },
        { label: '转生', data: '/转生' },
        { label: '素材', data: '/今日素材' }
      ], [
        { label: '连连看', data: '/连连看' },
        { label: '小游戏', data: '/希腊奶帮助' },
        { label: '御神签', data: '/御神签' },
        { label: '表情包', data: '/兽猫酱' }
      ], [
        { label: 'meme', data: '/随机meme' },
        { label: '异世界', data: '/异世界降临帮助' },
        { label: '修仙', data: '/修仙' },
        { label: '扫雷', data: '/扫雷' },
        { label: '帮助', data: '/帮助', style: 0 }
        // { label: '群加白', data: `/群加白${data.group_id}` },
      ]
    ]
    Bot[self_id].pickGroup(`${self_id}-${data.group_id}`).sendMsg([msg, ...Bot.Button(list)])
    updateGroupId(self_id, `${self_id}-${data.group_id}`, `${self_id}-${data.operator_id}`)
  })
}
/** 延时，单位ms */
function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
