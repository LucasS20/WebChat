import {Injectable} from '@angular/core';
import {GrupoPerguntas} from "../../models/grupo-perguntas";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GrupoPerguntaService {
    private readonly urlHost: string = 'http://localhost:8080';
    private readonly endpointGrupoPerguntas = 'api/grupoPerguntas';

    constructor(public http: HttpClient) {
    }

    getGruposPerguntasProfessorID(professorID: string = 'ced75a42-18c1-4cf2-a3ba-f6677598af67'): Observable<GrupoPerguntas[]> {
        const urlGetProfessorID = 'getByProfessorID';
        return this.http.get<GrupoPerguntas[]>(`${this.urlHost}/${this.endpointGrupoPerguntas}/${urlGetProfessorID}/${professorID}`);
    }
}
