const pool = require('../../db')
const queries = require('./queries')

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const addStudents = (req, res) => {
    const {name, email, age, dob} = req.body
    // check if email exsits
    pool.query(queries.checkEmailExsits, [email], (error, results) => {
        if (results.rows.length) {
            res.send("Email already exsits")
        }
    })

    // add student to db
    pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
        if (error) throw error
        res.status(201).send("Student Created Successfully")
    })
}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id)
    
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length

        if (noStudentFound) {
            res.send('Student does not exsits in the database')
        }

        pool.query(queries.removeStudent, [id], (error, results) => {
            if(error) throw error
            res.status(200).send('Student removed successfully')
        })

    })
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id) 
    const { name } = req.body

    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudent = !results.rows.length

        if(noStudent) {
            res.send('Student does not exsits in database')
        }

        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if(error) throw error
            res.status(200).send('Student update successfully')
        })
    })
}

module.exports = {
    getStudents,
    getStudentById,
    addStudents,
    removeStudent,
    updateStudent,
}