# Crud Task
A simple crud to create, read, update and delete tasks from a JSON database

## How to run:
`npm install` and `npm run dev` 

## Endpoints 
### To add a new element in the database:
**POST**

`http://localhost:4444/tasks`
```
{
	"title": "go to the park",
	"description": "see the birds"
}
```
<hr>

### To get all elements in the database or by id:
**GET**

`http://localhost:4444/tasks`

`http://localhost:4444/tasks/:id`
<hr>

### To change a task
**PUT**

`http://localhost:4444/tasks/:id`
```
{
	"title": "go to the supermarket",
	"description": "buy oranges"
}
```
<hr>

### To delete a task
**DELETE**

`http://localhost:4444/tasks/:id`
<hr>

### To mark a task as completed.
**PATCH**

`http://localhost:4444/tasks/:id/complete`



