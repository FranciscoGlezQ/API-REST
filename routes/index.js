import express from "express"
import todoController from "../todosControllers/todos"

const router = express.Router()



router.get('/api/v1/todos', todoController.getAllTodos)

router.get('/api/v1/todos/:id', todoController.getTodo)

router.post('/api/v1/todos',todoController.createTodo)


router.put('/api/v1/todos/:id', todoController.updateTodo)

router.delete('/api/v1/todos/:id', todoController.deleteTodo)

router.get('/api/v1/getEmployes', todoController.getEmployes)

router.get('/api/v1/getFP', todoController.getALLFP)

router.get('/api/v1/getFP/:id', todoController.getFP)

router.post('/api/v1/createFP', todoController.createFP)



export default router