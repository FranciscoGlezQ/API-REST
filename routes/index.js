import express from "express"
import todoController from "../todosControllers/todos"
import user from "../db/dbConnection"

const router = express.Router()




router.get('/users', (req, res) =>{
	user.getUsers((err,data)=>{
		if( err )
			res.status(402).json(err)
		else{
			res.status(200).json(data)
		}
	})
})




router.post('/addUser', (req, res)=>{
	const userData={
		id: null,
		username: req.body.username,
		password: req.body.password,
		email: 	  req.body.email
	}

	user.insertUser(userData, (err, data) => {
		if(err){
			if(err.code == "ER_DUP_ENTRY")
				res.status(200).json({
					success: false,
					msg: "El correo ya ha sido registrado"
				})
			else
				res.status(500).json(err)
		}
		else if(data && data.insertId){
			res.status(200).json({
				success: true,
				msg: 'Usuario Insertado',
				data: data
			})
		}
	})
		
})


router.put('/updateUser', (req, res) =>{
	const userData = {
		id: req.body.id,
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	}

	user.updateUser(userData, (err, data) => {
		if(err){
			if(err.code == "ER_DUP_ENTRY")
				res.status(500).json({
					success: false,
					msg: "EL correo ya existe"
				})
			else
				res.status(500).json(err)
		}
		else{
			res.status(200).json({
				success: true,
				msg: data.msg
			})
		}
	})
})












router.get('/api/v1/todos', todoController.getAllTodos)

router.get('/api/v1/todos/:id', todoController.getTodo)

router.post('/api/v1/todos',todoController.createTodo)

router.put('/api/v1/todos/:id', todoController.updateTodo)

router.delete('/api/v1/todos/:id', todoController.deleteTodo)




// Add POST - /api/login
router.post('/api/login', (req, res) => {
  if (req.body.username === 'demo' && req.body.password === 'demo') {
  	console.log(req)
    req.session.authUser = { username: 'demo' }
    return res.json({ username: 'demo' })
  }
  res.status(401).json({ message: 'Bad credentials' })
})

// Add POST - /api/logout
router.post('/api/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})




export default router