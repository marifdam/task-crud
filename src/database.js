import fs from "node:fs/promises"
import { type } from "node:os"

const databasePath = new URL('../db.json',import.meta.url)

export class Database{
    #database=[]

    constructor() {
        fs.readFile(databasePath,'utf8')
        .then(data=>{
            this.#database = JSON.parse(data)
        }).catch(()=>{
            this.#persist()
        })
    }

    #persist(){
        fs.writeFile(databasePath,JSON.stringify(this.#database,null,2))
    }

    select(id){
        let database = this.#database
        if(id){
            let result = database.filter(data=>{
                if(data.id === id) return data   
            })
            return result
        }else{
            return database

        }
    }

    insert(data){
        if(Array.isArray(this.#database)){
            this.#database.push(data)
        }else{
            this.#database = data
        }
        this.#persist()
        return data
    }

    update(id, content) {
        if (id) {
            this.#database = this.#database.map(data => {
                if (data.id === id) {
                    return {
                        ...data,
                        ...content 
                    };
                }
                return data;
            });
            
            this.#persist();
        }
    }
    
    delete(id) {
        const originalLength = this.#database?.length;
        if (originalLength) {
            this.#database = this.#database.filter(data => data.id !== id);
            
            if (this.#database.length < originalLength) {
                this.#persist();
            }
        }
    }
    
}