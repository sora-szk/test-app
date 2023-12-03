import { createApp } from './app'

const startServer = async () => {
    const port = process.env.API_PORT
    const app = await createApp()
    const server = app.listen(port)
    server.keepAliveTimeout = 800 * 1000
    server.headersTimeout = 900 * 1000
    console.log(`keepAliveTimeout: ${server.keepAliveTimeout}`)
    console.log(`headersTimeout: ${server.headersTimeout}`)
    console.log(`Server listening on port ${port}`)
}

startServer()
