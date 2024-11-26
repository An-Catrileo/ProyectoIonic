import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiciodbService {
  private db!: SQLiteDBConnection;
  readonly user_table: string = 'usuarios'; // Tabla para usuarios
  readonly db_name: string = 'pixelPlayDB.db';
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private sqlite: SQLiteConnection;

  private isInitialized: boolean = false;
  private currentUser: any = null;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    const storedCurrentUser = localStorage.getItem('currentUser');
    if (storedCurrentUser) {
      this.currentUser = JSON.parse(storedCurrentUser);
      this.isAuthenticatedSubject.next(true);
    }
  }

  async initDB() {
    if (this.isInitialized) return;

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

      const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS ${this.user_table} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          rut TEXT NOT NULL,
          nombre TEXT NOT NULL,
          apellidop TEXT NOT NULL,
          apellidom TEXT NOT NULL,
          correo TEXT NOT NULL,
          password TEXT NOT NULL,
          role TEXT NOT NULL
        );
      `;
      await this.db.execute(createUsersTableQuery);

      // Crear un usuario administrador por defecto si no existe
      const adminUserQuery = `SELECT * FROM ${this.user_table} WHERE role = 'admin';`;
      const res = await this.db.query(adminUserQuery);
      if (!res.values || res.values.length === 0) {
        const insertAdminUserQuery = `INSERT INTO ${this.user_table} (rut, nombre, apellidop, apellidom, correo, password, role) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const adminValues = [
          '3-5',
          'admin',
          'admin',
          'admin',
          'admin@admin.com',
          'admin',
          'admin',
        ];
        await this.db.run(insertAdminUserQuery, adminValues);
        console.log(
          'Usuario administrador creado por defecto: username="admin", password="admin"'
        );
      }

      this.isInitialized = true;
      console.log('Base de datos inicializada');
    } catch (e) {
      console.error('Error al inicializar la base de datos', e);
    }
  }

  async registerUser(
    rut: string,
    nombre: string,
    apellidop: string,
    apellidom: string,
    correo: string,
    password: string,
    role: string = 'user'
  ): Promise<{ success?: string; error?: string }> {
    try {
      if (!password || !rut || !nombre || !apellidop || !apellidom || !correo) {
        throw new Error('Por favor, ingrese todos los campos');
      }

      // Insertar un nuevo usuario en la tabla de usuarios
      const insertUserQuery = `
        INSERT INTO ${this.user_table} (rut, nombre, apellidop, apellidom, correo, password, role) VALUES (?, ?, ?, ?, ?, ?, ?);
      `;
      const values = [
        rut,
        nombre,
        apellidop,
        apellidom,
        correo,
        password,
        role,
      ];
      await this.db.run(insertUserQuery, values);
      console.log('Usuario registrado exitosamente');
      await this.loginUser(correo, password);
      return { success: 'Usuario registrado exitosamente' };
    } catch (error) {
      console.error('Error al registrar el usuario', error);
      return { error: `Error al registrar el usuario: ${error}` };
    }
  }

  async loginUser(correo: string, password: string): Promise<{ success?: string; error?: string }> {
    try {
      const selectUserQuery = `
        SELECT * FROM ${this.user_table} WHERE correo = ? AND password = ?;
      `;
      const res = await this.db.query(selectUserQuery, [correo, password]);
      if (res.values && res.values.length > 0) {
        this.currentUser = res.values[0];
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.isAuthenticatedSubject.next(true);
        return { success: 'Usuario logueado exitosamente' };
      } else {
        return { error: 'Correo o contraseña incorrecta' };
      }
    } catch (error) {
      return { error: `Error al iniciar sesión: ${error}` };
    }
  }

  logoutUser(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): any {
    if (!this.currentUser) {
      const storedCurrentUser = localStorage.getItem('currentUser');
      if (storedCurrentUser) {
        this.currentUser = JSON.parse(storedCurrentUser);
      }
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  isAuthenticatedObservable() {
    return this.isAuthenticatedSubject.asObservable();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  }

  async getAllCustomers(): Promise<{ success?: any[]; error?: string }> {
    try {
      const selectQuery = `SELECT * FROM ${this.user_table} WHERE role <> 'admin';`;
      const res = await this.db.query(selectQuery);
      return { success: res.values ? res.values : [] };
    } catch (error) {
      console.error('Error al Obtener los clientes', error);
      return { error: `Error al obtener los clientes: ${error}` };
    }
  }

  async deleteCustomer(id: number): Promise<{ success?: string; error?: string }> {
    try {
      const deleteQuery = `DELETE FROM ${this.user_table} WHERE id = ?;`;
      await this.db.run(deleteQuery, [id]);
      console.log('Cliente Eliminado');
      return { success: 'Cliente eliminado exitosamente' };
    } catch (error) {
      console.error('Error al Eliminar el cliente', error);
      return { error: `Error al eliminar el cliente: ${error}` };
    }
  }
}
