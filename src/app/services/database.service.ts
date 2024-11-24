import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class ServiciodbService {

private db!: SQLiteDBConnection;
readonly db_table: string = "clientes"; // Nombre de la tabla cambiado a "clientes"
readonly db_name: string = "clientes.db";

private sqlite: SQLiteConnection;

private isInitialized: boolean = false;
constructor() {
  this.sqlite = new SQLiteConnection(CapacitorSQLite);
}

  async initDB() {
    if(this.isInitialized) return;

    try {  
      // Crea la conexión a la base de datos
      this.db = await this.sqlite.createConnection(
        this.db_name,   // Nombre de la base de datos
        false,          // encrypted: si la base de datos está encriptada
        'no-encryption',// mode: modo de encriptación
        1,              // version: versión de la base de datos
        false           // readonly: si la conexión es de solo lectura
      );

      await this.db.open();

      // Crear la tabla si no existe
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${this.db_table} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          rut TEXT NOT NULL,
          nombre TEXT NOT NULL,
          apellidop TEXT NOT NULL,
          apellidom TEXT NOT NULL,
          correo TEXT NOT NULL
        );
      `;
      await this.db.execute(createTableQuery);
      this.isInitialized = true;
      console.log('Base de datos inicializada');
    } catch (e) {
      console.error('Error al inicializar la base de datos', e);
    }
  }

  async addItem(rut: string, nombres: string, apellidop: string, apellidom: string, correo: string ){
    try {
      if(!rut || !nombres || !apellidop || !apellidom || !correo){
        alert('Por favor, Ingrese todos los campos');
        return
      }
      const inserQuery = `
      INSERT INTO ${this.db_table} (rut, nombre, apellidop, apellidom, correo) VALUES (?,?,?,?,?);
      `;
      const values = [rut, nombres, apellidop, apellidom, correo];
      await this.db.run(inserQuery, values);
      console.log('Estudiante fue Agregado!')
      
    } catch (error) {
      console.error('Error al agregar el estudiante', error);
    }
  }

  async getAllStudents(): Promise<any[]>{
    try {
        const SelectQuery=  `Select * from ${this.db_table};`;
        const res = await this.db.query(SelectQuery);
        return res.values? res.values : [];      
    } catch (error) {
      console.error("Error al Obtener los estudiantes", error);
      return[]
    }
  }

  async deleteStudent(id: number){
      try {
        const deletequery = `DELETE FROM ${this.db_table} WHERE id = ?;`;
        await this.db.run(deletequery, [id]);
        console.log("Estudiantes Eliminado");
      } catch (error) {
        console.error("Error al Eliminar el estudiantes", error);
      }
  }

}
