export interface DBRepository {
    query(sql: string, values?: any): Promise<[any, any]>
    close(): Promise<void>
}
