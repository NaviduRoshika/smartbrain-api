const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'f9c227d5f09e440abb7ba0cb9c97078f'
});

const imageApiCallHandler = (req,res)=>{
   app.models.predict("a403429f2ddf4b49b307e318f00e528b",req.body.input)
   .then(data =>{
   	res.json(data);
   })
   .catch(err => res.status(400).json('unable to work with api')); 	
}


const imageHandler = (req,res,DB)=>{
	const {id} = req.body;
	DB('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries =>{
		res.json(entries[0]);
	}).catch(err => res.status(404).json('unable to increment'));

}

module.exports ={
	imageHandler:imageHandler,
	imageApiCallHandler:imageApiCallHandler
}