// FETCH-POST 

const data = {
  title: "valami",
  description: "Testelek",
  isDone: true
}

fetch('http://localhost:3000/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then((response) => response.json())
.then((data) => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
