import {Component, OnInit} from '@angular/core';
import {FormComponent} from "../../form/form/form.component";
import {ActivatedRoute} from "@angular/router";
import {JogoService} from "../../../services/jogoService/jogo.service";
import {TabuleiroService} from "../../../services/tabuleiro.service";

@Component({
  selector: 'app-tabuleiro',
  standalone: true,
  imports: [],
  templateUrl: './tabuleiro.component.html',
  styleUrl: './tabuleiro.component.scss'
})
export class TabuleiroComponent extends FormComponent implements OnInit {
  private userID: any;
  private salaID: any;

  constructor(public route: ActivatedRoute,
              public tabuleiroService: TabuleiroService) {
    super();
  }

  ngOnInit(): void {
    this.userID = this.route.snapshot.params['userID'];
    this.salaID = this.route.snapshot.params['salaID'];
    this.tabuleiroService.conectarAosSockets(this.salaID);
  }

}
