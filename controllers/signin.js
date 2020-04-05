const signinHandler = (req,res,bcrypt,DB)=>{
      DB.select('email','hash')
      .from('login')
      .where('email','=',req.body.email)
      .then(data =>{
          const isValid = bcrypt.compareSync(req.body.password,data[0].hash);
          if(isValid){
          	return DB.select('*')
          	.from('users')
          	.where('email', '=',req.body.email)
          	.then(user =>{
          		res.json(user[0]);
          	})
          	.catch(err => res.status(404).json('user not found'));
          }else{
          	res.status(400).json('invalid entry');
          }
      })
      .catch(err => res.status(404).json('invalid entry'));

}

module.exports = {
  signinHandler:signinHandler
}