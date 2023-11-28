import { Context } from 'koa'

export interface StatusHandler {
    status200(ctx: Context): Promise<void>
    status400(ctx: Context): Promise<void>
    status500(ctx: Context): Promise<void>
}

export class StatusHandlerImpl implements StatusHandler {
    async status200(ctx: Context) {
        ctx.body = 'Status 200'
    }
    async status400(ctx: Context) {
        ctx.status = 400
        ctx.body = 'Status 400'
    }
    async status500(ctx: Context) {
        ctx.status = 500
        ctx.body = 'Status 500'
    }
}

export const createStatusHandler = (): StatusHandler => new StatusHandlerImpl()
