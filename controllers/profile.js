const profileHandler = (req,res,DB)=>{
	const {id} = req.params;
	DB.select('*').from('users').where({
		id:id
	}).then(user =>{
		if(user.length){
			return res.json(user[0]);
		}else{
			res.status(404).json("No Such User");
		}
		
	}).catch(err =>res.status(404).json("Error getting User"));
}

module.exports = {
	profileHandler:profileHandler
}