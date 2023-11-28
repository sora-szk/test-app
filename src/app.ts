import Koa from 'koa'
import { createRouter } from './infrastructure/api/router'

export const createApp = async (): Promise<Koa> => {
    const app = new Koa()
    const router = await createRouter()
    app.use(router.routes())
    return app
}
