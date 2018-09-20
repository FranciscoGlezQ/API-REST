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
	getEmployes(req,res){
		var items = [
                {id: '1',  name: 'Dikerson', fingerprint: 1},
                {id: '2',  name: 'Larsen', fingerprint: 0},
                {id: '3',  name: 'Essie', fingerprint: 1},
                {id: '4',  name: 'Mitzi', fingerprint: 0},
                {id: '5',  name: 'Genevieve', fingerprint: 1},
                {id: '6',  name: 'Dickerson', fingerprint: 1},
                {id: '7',  name: 'Navarro', fingerprint: 0},
                {id: '8',  name: 'Name', fingerprint: 1},
                {id: '9' , name: 'Dunlap', fingerprint: 0},
                {id: '10', name: 'John', fingerprint: 1},
                {id: '11', name: 'George', fingerprint: 1},
                {id: '18', name: 'Thor', fingerprint: 0},
                {id: '80', name: 'Wick', fingerprint: 1},
                {id: '12', name: 'Dulan', fingerprint: 0},
                {id: '26', name: 'Jami', fingerprint: 1}

            ]

            return res.status(200).send({
            	success: 'true',
            	message: 'Employees successfully retrieved',
            	employes: items
            })



	}

	createFP(req,res) {
		if(!req.body.id){
			return res.status(400).send({
				success: 'false',
				message: 'id is required'
			})
		}else if(!req.body.blobData){
			return res.status(400).send({
				success: 'false',
				message: 'blobData is required'
			})
		} 

		const newFP ={
			id: parseInt(req.body.id,10),
			blobData: req.body.blobData
		} 
		db.push(newFP)

		return res.status(200).send({
			success: 'true',
			message: 'Post request done', 
			newData: newFP
		})
	}
	getALLFP(req,res){
		return res.status(200).send({
					success:'true',
					message:'FPs successfully retrieved',
					fp:db
				})
	}


	getFP(req,res){
		const id = parseInt(req.params.id, 10)

		db.map((Fp)=>{
			if(Fp.id === id){
				return res.status(200).send({
					success:'true',
					message:'FP successfully retrieved',
					fp:Fp
				})
			}
		})


		return res.status(200).send({
			success: 'false',
			message: 'FP does not exist'
		})
	}
}


const todosController = new TodosController()

export default todosController



















