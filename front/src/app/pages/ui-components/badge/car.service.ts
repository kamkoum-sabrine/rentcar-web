import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CarService {
    private apiUrl = 'http://localhost:3000/api/cars/create';

    constructor(private http: HttpClient) { }

    getCars() {
        return this.http.get<any[]>('http://localhost:3000/api/cars/getAll');
    }
    addCar(carData: any): Observable<any> {
        return this.http.post(this.apiUrl, carData);
    }
    deleteCar(id: string): Observable<any> {
        return this.http.delete(`http://localhost:3000/api/cars/delete/${id}`);
    }
    editCar(vehicle: any) {
        return this.http.put(`http://localhost:3000/api/cars/update/${vehicle._id}`, vehicle);
    }

}
