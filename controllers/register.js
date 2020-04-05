const registerHandler = (req,res,bcrypt,DB)=>{
	const {email,name,password}= req.body;
	  //Sync
    const hash = bcrypt.hashSync(password);
    if(!email || !name || !password){
        return res.status(400).json('invalid data');
    }
    DB.transaction(trx =>{
    	trx.insert({
    		hash:hash,
    		email:email
    	})
    	.into('login')
    	.returning('email')
    	.then(loginEmail =>{
    		if(name===""){
    			res.status(404).json('invalid data');
    		}else{
               return trx('users').returning('*')
    		.insert({
    			name:name,
    			email:loginEmail[0],
    			joined:new Date()
    		})
    		.then(user =>{
    			res.json(user[0]);
    		})
    	  }
    	})
    	.then(trx.commit)
    	.catch(trx.rollback)
    })
    .catch(err => res.status(404).json('unable to register'));
}

module.exports = {
    registerHandler:registerHandler
} 