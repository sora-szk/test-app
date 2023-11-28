import { DBRepository } from '../infrastructure/db/db_repository'
import { createMySQLRepository } from '../infrastructure/db/repository_impl/mysql_repository_impl'
import { Usecase } from './usecase'

export class Interactor implements Usecase {
    constructor(private repository: DBRepository) {}

    async pingDB(): Promise<void> {
        const [rows, _] = await this.repository.query('SELECT 1')
        if (rows[0]['1'] !== 1) {
            throw new Error('DB is not ready')
        }
    }
}

export const createUsecase = async (repository?: DBRepository): Promise<Usecase> => {
    const {
        DB_HOST: host,
        DB_PORT: port,
        DB_USER: user,
        DB_PASSWORD: password,
        DB_DATABASE: database,
    } = process.env
    const repo =
        repository ??
        (await createMySQLRepository({
            host,
            port: Number(port),
            user,
            password,
            database,
        }))
    return new Interactor(repo)
}
