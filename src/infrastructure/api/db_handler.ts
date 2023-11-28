import { Context } from 'koa'
import { Usecase } from '../../app/usecase'
import { createUsecase } from '../../app/interactor'

export interface DBHandler {
    ping(ctx: Context): Promise<void>
}

export class DBHandlerImpl implements DBHandler {
    constructor(private usecase: Usecase) {}

    ping = async (ctx: Context) => {
        await this.usecase.pingDB()
        ctx.body = 'DB pinged'
    }
}

export const createDBHandler = async (usecase?: Usecase): Promise<DBHandler> => {
    const u = usecase ?? (await createUsecase())
    return new DBHandlerImpl(u)
}
