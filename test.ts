import NLP from './src/index'

const test = [
    '十点十分',
    '八点十七分',
    '2019-5-3 19:00',
    '2019-05-3 19:00',
    '2019-5-03 19:00',
    '2019-05-03 19:00',
    '没有时间点',
    'Hi，all。下周一下午三点开会',
    '周一开会',
    '周五开会',
    '下下周一开会',
    '6:30 起床',
    '明天6:30 起床',
    '6-3 春游',
    '6月3日 春游',
    '12-1 春游',
    '明天早上跑步',
    '本周日到下周日出差',
    '周四下午三点到五点开会',
    '昨天上午，第八轮中美战略与经济对话气候变化问题特别联合会议召开。中国气候变化事务特别代表解振华表示，今年中美两国在应对气候变化多边进程中政策对话的重点任务，是推动《巴黎协定》尽早生效。',
]
const n = new NLP()
test.forEach(s => {
    console.log(s, '====>', n.parse(s))
})

