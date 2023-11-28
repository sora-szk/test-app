import { createApp } from './app'

const startServer = async () => {
    const port = process.env.API_PORT
    const app = await createApp()
    app.listen(port)
    console.log(`Server listening on port ${port}`)
}

startServer()
