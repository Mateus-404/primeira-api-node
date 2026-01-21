import { sql } from './db.js'

/*sql`DROP TABLE IF EXISTS videos`.then( () =>{
    console.log("Tabela apagada!")
})*/
await sql`
    CREATE TABLE videos(
    id          TEXT primary KEY,
    title       TEXT,
    description TEXT,
    duration    INTEGER
    );
`.then(() => {
    console.log ("Tabela criada!")
})