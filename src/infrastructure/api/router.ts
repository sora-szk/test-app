import Router from 'koa-router'
import { StatusHandler, createStatusHandler } from './status_handler'
import { DBHandler, createDBHandler } from './db_handler'

export const createRouter = async (): Promise<Router> => {
    const dbHandler: DBHandler = await createDBHandler()
    const statusHandler: StatusHandler = createStatusHandler()

    const router = new Router()
    router.get('/db/ping', dbHandler.ping)
    router.get('/health', statusHandler.status200)
    router.get('/status/200', statusHandler.status200)
    router.get('/status/400', statusHandler.status400)
    router.get('/status/500', statusHandler.status500)
    return router
}
