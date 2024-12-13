import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContratsService {
    private apiUrl = 'http://localhost:3000/api/reservations/create';

    constructor(private http: HttpClient) { }

    getContrats() {
        return this.http.get<any[]>('http://localhost:3000/api/reservations/getAll');
    }
    addContrat(contratData: any): Observable<any> {
        return this.http.post(this.apiUrl, contratData);
    }
    deleteContrat(id: string): Observable<any> {
        return this.http.delete(`http://localhost:3000/api/reservations/delete/${id}`);
    }
    editContrat(contrat: any) {
        return this.http.put(`http://localhost:3000/api/reservations/update/${contrat._id}`, contrat);
    }

}
