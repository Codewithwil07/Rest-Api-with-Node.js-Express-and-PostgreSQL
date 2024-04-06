const express = require('express')
const studentsRoutes = require('./src/students/routes')

const app = express()
const port = 3000


app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/api/v1/students', studentsRoutes)

app.listen(port, () => console.log("listening on port:" + port))