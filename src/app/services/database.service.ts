import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db!: SQLiteDBConnection;
  readonly db_table: string = "clientes"; // Nombre de la tabla cambiado a "clientes"
  readonly db_name: string = "clientes.db"; // Nombre de la base de datos cambiado a "clientes.db"

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
        this.db_name,
        false,
        'no-encryption',
        1,
        false
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
      console.log('Base de datos inicializada'); // Mensaje actualizado
    } catch (e) {
      console.error('Error al inicializar la base de datos', e); // Mensaje actualizado
    }
  }

  async addItem(rut: string, nombres: string, apellidop: string, apellidom: string, correo: string) {
    try {
      if (!rut || !nombres || !apellidop || !apellidom || !correo) {
        alert('Por favor, ingrese todos los campos');
        return;
      }
      const insertQuery = `
        INSERT INTO ${this.db_table} (rut, nombre, apellidop, apellidom, correo) VALUES (?,?,?,?,?);
      `;
      const values = [rut, nombres, apellidop, apellidom, correo];
      await this.db.run(insertQuery, values);
      console.log('Cliente agregado correctamente'); // Mensaje actualizado
      
    } catch (error) {
      console.error('Error al agregar el cliente', error); // Mensaje actualizado
    }
  }

  async getAllClients(): Promise<any[]> {
    try {
      const selectQuery = `SELECT * FROM ${this.db_table};`;
      const res = await this.db.query(selectQuery);
      return res.values ? res.values : [];      
    } catch (error) {
      console.error("Error al obtener los clientes", error); // Mensaje actualizado
      return [];
    }
  }

  async deleteClient(id: number) {
    try {
      const deleteQuery = `DELETE FROM ${this.db_table} WHERE id = ?;`;
      await this.db.run(deleteQuery, [id]);
      console.log("Cliente eliminado correctamente"); // Mensaje actualizado
    } catch (error) {
      console.error("Error al eliminar el cliente", error); // Mensaje actualizado
    }
  }

}
