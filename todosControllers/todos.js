/* eslint-disable class-methods-use-this */

import db from '../db/db'



class TodosController{
	getAllTodos(req, res){
		return res.status(200).send({
			success: 'true',
			message: 'todos retrieved successfully',
			todos: db
		})
	}


	getTodo(req,res){
		const id = parseInt(req.params.id, 10)

		db.map((todo)=>{
			if(todo.id === id){
				return res.status(200).send({
					succcess: 'true',
					message: 'Todo retrieved successfully',
					todo
				})
			}
		})


		return  res.status(200).send({
			success: 'false', 
			message: 'todo does not exist'
		})
	}


	createTodo(req, res){
		if(!req.body.title){
			return res.status(200).send({
				success: 'false',
				message: 'title is required'
			})
		}
		else if(!req.body.description){
			return res.status(200).send({
				success: 'false',
				message: 'description is required'
			})
		}


		const newTodo = {
			id : db.length +1,
			title: req.body.title,
			description: req.body.description
		}

		db.push(newTodo)

		return res.status(200).send({
			success: 'true',
			message: 'Todo added successfully'
		})
	}


	updateTodo(req,res){
		const id = parseInt(req.params.id, 10)

		let todoFound
		let itemIndex

		db.map((todo, index)=>{
			if(todo.id === id){
				todoFound = todo
				itemIndex = index
			}
		})

		if(!todoFound){
			return res.status(404).send({
				success: 'false',
				message: 'Todo not found'
			})
		}


		if(!req.body.title){
			return res.status(400).send({
				success: 'false',
				message: 'Title is required'
			})
		}
		else if(!req.body.description){
			return res.status(400).send({
				success: 'false',
				message: 'Description is required'
			})
		}

		const newTodo ={
			id: todoFound.id,
			title: req.body.title || todoFound.title,
			description: req.body.description || todoFound.description
		}

		db.splice(itemIndex,1,newTodo)

		return res.status(201).send({
			success: 'true',
			message: 'Todo updated successfully',
			newTodo
		})
	}

	deleteTodo(req,res){
		const id = parseInt(req.params.id,10)

		let todoFound
		let itemIndex

		db.map((todo, index)=>{
			if(todo.id === id){
				todoFound = todo
				itemIndex = index
			}
		})

		if(!todoFound){
			return res.status(404).send({
				success: 'false',
				message: 'Todo does not exist'
			})
		}

		db.splice(itemIndex,1)

		return res.status(200).send({
			success: 'true',
			message: 'Todo deleted successfully'
		})

	}

	getUser(req,res){
		
	}

}


const todosController = new TodosController()

export default todosController



















