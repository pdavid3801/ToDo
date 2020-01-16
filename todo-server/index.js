const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET method

app.get('/', (req, res) => {
	res.send('Main page');
}),

app.get('/todos', (req, res) => {
	 const todo = fs.readFileSync('/home/pfeil/Dokumentumok/Code/node/basic-node-server/json/todos.json')
	 const read = JSON.parse(todo);
	res.send(todo);
}), 

// POST method

app.post('/todos', (req, res) => {
	const todos = fs.readFileSync('/home/pfeil/Dokumentumok/Code/node/ToDo/json')
	const newTodo = {
		id : uuid(),
		title : "",
		description : "",
		isDone : false
	}
	const read = JSON.parse(todos);
	read.push(newTodo);

	const content = JSON.stringify(read);
	fs.writeFileSync('/home/pfeil/Dokumentumok/Code/node/ToDo/json',content)

	res.send(read);
    res.end();
});

// DELETE method

app.delete('/todos/:id', (req,res) => {

  const todosJson = fs.readFileSync('/home/pfeil/Dokumentumok/Code/node/basic-node-server/json/todos.json')
  const todosObj = JSON.parse(todosJson);
  
  const filArray = todosObj.filter((todoElement) => {
    return todoElement.id !== req.params.id;
  });

  // const filArray = todosObj.filter(todoElement => todoElement.id !== req.params.id);

	const content = JSON.stringify(filArray);
	fs.writeFileSync('/home/pfeil/Dokumentumok/Code/node/basic-node-server/json/todos.json',content)
  
  console.log("delete: req.params.id " + JSON.stringify(req.params.id));

  res.json(content);
})

// PUT method

app.put('/todos/:id',(req,res)  => {
	const id = req.params.id;
	const requestBody = req.body;
	console.log(req.query, req.body);
	const jsonContent = fs.readFileSync('/home/pfeil/Dokumentumok/Code/node/basic-node-server/json/todos.json');
	const parseContent = JSON.parse(jsonContent);

	const index = parseContent.findIndex((todo) => {
		return todo.id === id;
	});
	Object.assign(parseContent[index], requestBody);

	const stringContent = JSON.stringify(parseContent);
	fs.writeFileSync('/home/pfeil/Dokumentumok/Code/node/basic-node-server/json/todos.json',stringContent);

	res.json(parseContent);
})

app.listen(3000, () => console.log(`Server listened on 3000 port...`));