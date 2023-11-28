import mysql from 'mysql2/promise'
import { DBRepository } from '../db_repository'

export const connectionFactory = (config: mysql.ConnectionOptions): Promise<mysql.Connection> => {
    return mysql.createConnection(config)
}

export class MySQLRepositoryImpl implements DBRepository {
    constructor(private connection: mysql.Connection) {}

    async query(sql: string, values?: any): Promise<[any, any]> {
        return this.connection.query(sql, values)
    }

    async close(): Promise<void> {
        await this.connection.end()
    }
}

export const createMySQLRepository = async (
    config?: mysql.ConnectionOptions
): Promise<DBRepository> => {
    const {
        DB_HOST: host,
        DB_PORT: port,
        DB_USER: user,
        DB_PASSWORD: password,
        DB_DATABASE: database,
    } = process.env
    const conf = config ?? {
        host,
        port: Number(port),
        user,
        password,
        database,
    }
    const connection = await connectionFactory(conf)
    return new MySQLRepositoryImpl(connection)
}
