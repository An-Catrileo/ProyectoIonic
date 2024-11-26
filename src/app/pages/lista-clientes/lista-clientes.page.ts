import { Component, OnInit } from '@angular/core';
import { ServiciodbService } from 'src/app/services/database.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.page.html',
  styleUrls: ['./lista-clientes.page.scss'],
})
export class ListaClientesPage implements OnInit {
  clients: any[] = [];
  loading: boolean = false;
  responseMessage: { success?: string; error?: string } = {};

  constructor(private dbService: ServiciodbService) {}

  async ngOnInit() {
    this.loading = true;
    await this.dbService.initDB();
    await this.loadClients();
    this.loading = false;
  }

  async loadClients() {
    try {
      const response = await this.dbService.getAllCustomers();
      if (response.success) {
        this.clients = response.success;
      } else if (response.error) {
        this.responseMessage.error = response.error;
      }
    } catch (error) {
      this.responseMessage.error = 'Error al cargar los clientes.';
    }
  }

  async deleteClient(id: number) {
    this.loading = true;
    try {
      const response = await this.dbService.deleteCustomer(id);
      if (response.success) {
        this.responseMessage.success = response.success;
        await this.loadClients();
      } else if (response.error) {
        this.responseMessage.error = response.error;
      }
    } catch (error) {
      this.responseMessage.error = 'Error al eliminar el estudiante.';
    } finally {
      this.loading = false;
    }
  }
}
