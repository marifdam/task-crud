import {randomUUID} from "node:crypto"
import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database()
export const routes = [
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler:(req,res)=>{
            const {title,description} = req.body

            if(!title){
                return res.writeHead(400).end(
                    JSON.stringify({message: 'please insert a title'})
                )
            }

            if(!description){
                return res.writeHead(400).end(
                    JSON.stringify({message: 'please insert a description'})
                )
            }

            

            const task= {
                id: randomUUID(),
                title,
                description,
                completed_at:null,
                created_at: new Date(),
                updated_at: new Date(),
            }
            
            database.insert(task)
            let newDatabase = database.select(task.id)
            return res.writeHead(201).end(JSON.stringify(newDatabase))
        }
    },

    {
        method:'GET',
        path: buildRoutePath('/tasks/:id'),
        handler: (req,res)=>{
            const {id} = req.params
            const tasks = database.select(id)
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method:'GET',
        path: buildRoutePath('/tasks'),
        handler: (req,res)=>{
            const tasks = database.select()
            if(tasks.length == 0 || !tasks){
                return res.writeHead(204).end()
            }
            return res.end(JSON.stringify(tasks))
        }
    },

    {
        method:'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler:(req,res)=>{
            const {id} = req.params
            const {title,description} = req.body
            if(!title && !description){
                return res.writeHead(400).end(
                    JSON.stringify({
                        message: "please insert a title or description"
                    })
                )
            }

            const task = database.select(id)

            if(task.length === 0){
                return res.writeHead(404).end(JSON.stringify({message: "task not found"}))
            }

            database.update(id,{
                title: title??task.title,
                description: description??task.description,
                updated_at: new Date()
            })
            let newDatabase = database.select(id)
            return res.writeHead(202).end(JSON.stringify(newDatabase))
        }
    },

    {
        method: 'DELETE',
        path:buildRoutePath('/tasks/:id'),
        handler: (req,res)=>{
            const {id} = req.params

            const task = database.select(id)

            if(task.length === 0){
                return res.writeHead(404).end(JSON.stringify({message: "task not found"}))

            }
            database.delete(id)
            let newDatabase = database.select()
            return res.writeHead(202).end(JSON.stringify(newDatabase))
        }
        
    },

    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req,res)=>{
            const {id} = req.params
            const task = database.select(id)

            if(task.length === 0){
                return res.writeHead(402).end(JSON.stringify({message:"task not found"}))
            }

            const isTaskCompleted = !!task.completed_at
            const completed_at = isTaskCompleted? null : new Date()

            database.update(id,{completed_at})
            let newDatabase = database.select(id)
            return res.writeHead(202).end(JSON.stringify(newDatabase))
        }
    }

]