
const mysql =  require('mysql')

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '207563787',
	database: 'testapimysql'
})

let userModel = {};

userModel.getUsers = (callback) => {
	if(connection){
		connection.query('SELECT * FROM users ORDER BY id',
							(err, rows) => {
								if(err){
									callback(err, null)
								}
								else{
									callback(null, rows);
								}
							})
	}else{	
		console.log("No connection Found")
	}
}

userModel.insertUser = (userData, callback)=>{
	if(connection){
		connection.query('INSERT INTO users SET ?', userData,
			(err, result)=>{
				if(err){
					callback(err, null)
				}
				else{
					callback(null, {
						"insertId": result.insertId
					} );
				}
			} )
	}
}


userModel.updateUser = (userData, callback) =>{
	if(connection){
		const sql = `
			UPDATE users SET
			username = ${connection.escape(userData.username)},
			password = ${connection.escape(userData.password)},
			email = ${connection.escape(userData.email)}
			WHERE id = ${connection.escape(userData.id)}
		`

		connection.query(sql,(err, result) =>{
			if(err){
				callback(err, null)
			}else{
				callback(null,{
					success: true,
					msg: "Usuario actualizado exitosamente"
				})
			}
		})
	}
}


export default userModel 