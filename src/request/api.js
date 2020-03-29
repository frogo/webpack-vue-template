import { GET, POST } from './http'
import CONFIG from './config'

// GET 请求演示
export const getDemo = (p) => GET(CONFIG.COMMON.GET_DEMO, p)
// POST 请求演示
export const postDemo = (p) => POST(CONFIG.COMMON.POST_DEMO, p)
// GET 用户信息 示例
export const getUser = (p) => GET(CONFIG.COMMON.GET_USER, p)
