import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GrupoPerguntas} from "../../models/grupo-perguntas";
import {CreateSala} from "../../models/create-sala";
import {Jogo} from "../../models/Jogo";



@Injectable({
    providedIn: 'root'
})
export class JogoService {

    private readonly urlHost: string = 'http://localhost:8080';
    private readonly endpointJogo = 'api/jogo';

    constructor(public http: HttpClient) {
    }

    criarSala(dadosSala: CreateSala): Observable<any> {
        const create: string = 'create'
        return this.http.post<Jogo>(`${this.urlHost}/${this.endpointJogo}/${create}`, dadosSala);
    }


}
