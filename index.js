const express = require('express');
const app = express();
app.use(express.json());

const Joi= require('joi');

const courses = [
    {id: 1, name:'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]

app.get('/', (req,res)=>{
	res.send('Hello World')
});

app.get('/api/courses', (req,res) =>{
	res.send(courses)
})

app.get('/api/courses/:id', (req,res)=>{
	let course = courses.find(c =>c.id===parseInt(req.params.id));
	if(!course) res.status(404).send('the course ID does not exist');
	res.send(course);
})

app.post('/api/courses/', (req,res)=>{


	//const postResult = validateCourse(req.body);
	const {error} = validateCourse(req.body);

	if (error){
		res.status(400).send(postResult.error.details[0].message);
		return;
	}
	let course = {
		id:courses.length+1,
		name: req.body.name
	}
	courses.push(course);
	res.send(course);
})

app.put('/api/courses/:id', (req,res) =>{
	//Look up 
	let course=courses.find(c=>c.id===parseInt(req.params.id));
	if (!course) {
		res.status(404).send("the course ID does not exist");
		return;
	}
	//Validate
	//const validateResult= validateCourse(req.body);
	const {error}= validateCourse(req.body); // =result.error
	if (error){
		res.status(400).send(validateResult.error.details[0].message);
		return;
	}

	//Update
	course.name= req.body.name;
	res.send(course);
})

app.delete('/api/courses/:id',(req,res)=>{
	//Look up 
	let course = courses.find(c=>c.id===parseInt(req.params.id));
	if (!course){
		res.status(404).send("the course ID does not exist");
		return
	}
	//Delete
	const index= courses.indexOf(course);
	courses.splice(index,1);
	//Return
	res.send(course);
})

function validateCourse(course){
	const schema={
		name: Joi.string().min(3).required()
	}

	const result = Joi.validate(course,schema);
	return result;
}
const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log('Listening on port ${port}'))