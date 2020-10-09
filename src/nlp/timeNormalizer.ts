/**
 *Intro:
 *Author:shine
 *Date:2017/11/1
 */
import dayjs from 'dayjs'
import TimeUnit from './timeUnit'
import preHandle from './strPreHandling'

export default class TimeNormalizer {
    timeBase: Date
    expression: string
    isPreferFuture: boolean
    constructor() {
        this.expression = ''
        this.isPreferFuture = true
    }

    static _preHandling(expression: string) {
        expression = preHandle.delKeyword(expression, '\\s+') // 清理空白符
        expression = preHandle.delKeyword(expression, '[的]+') // 清理语气助词
        expression = preHandle.DBC2CDB(expression)// 全角转半角
        expression = preHandle.numberTranslator(expression)// 大写数字转化
        return expression
    }

    turnOffPreferFuture() {
        this.isPreferFuture = false
    }

    getTimeBase() {
        return this.timeBase
    }

    setTimeBase(s: Date) {
        this.timeBase = s
    }

    parse(expression: string, timeBase?: string | number | Date): string | false {
        this.expression = expression
        const result = new Date(expression)
        // 如果 result 不为 Invalid Date ，说明原字符串已经是标准时间格式了
        if (result.toString() !== 'Invalid Date') {
            return dayjs(result).format('YYYY-MM-DD HH:mm:ss')
        }
        const exp = TimeNormalizer._preHandling(expression)
        if (timeBase) {
            if (typeof timeBase === 'string' || typeof timeBase === 'number') {
                this.timeBase = new Date(timeBase)
            } else if (timeBase instanceof Date) {
                this.timeBase = timeBase
            } else {
                this.timeBase = new Date()
            }
        } else {
            this.timeBase = new Date()
        }
        const tu = new TimeUnit(exp, this.isPreferFuture, this.timeBase)
        return tu.timeNormalization()
    }
}