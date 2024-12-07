import pool from "../config/database.js";

class School{
    static async create (name , address , latitude , longitude){
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(query, [name, address, latitude, longitude]);
        return result;
    }
    static async findAll(){
        const query = `SELECT * FROM schools`;
        const [result] = await pool.execute(query);
        return result;
    }
}

export default School;