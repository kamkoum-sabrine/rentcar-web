import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private apiUrl = 'http://localhost:3000/api/clients/create';

    constructor(private http: HttpClient) { }

    getClients() {
        return this.http.get<any[]>('http://localhost:3000/api/clients/getAll');
    }
    addClient(clientData: any): Observable<any> {
        return this.http.post(this.apiUrl, clientData);
    }
    deleteClient(id: string): Observable<any> {
        return this.http.delete(`http://localhost:3000/api/clients/delete/${id}`);
    }
    editClient(client: any) {
        return this.http.put(`http://localhost:3000/api/clients/update/${client._id}`, client);
    }

}
