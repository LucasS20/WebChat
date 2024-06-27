import {Routes} from '@angular/router';
import {ChatComponent} from "./components/telas/chat/chat.component";
import {CriarSalaComponent} from "./components/criarSala/criar-sala/criar-sala.component";
import {JogoComponent} from "./components/telas/jogo/jogo.component";
import {TabuleiroComponent} from "./components/telas/tabuleiro/tabuleiro.component";
import {CadastroProfessorComponent} from "./components/telas/cadastro-professor/cadastro-professor.component";
import {LoginComponent} from "./components/telas/login/login.component";
import {Table2Component} from "./components/telas/table2/table2.component";

export const routes: Routes = [
  {path: '', component: CriarSalaComponent},

  {path: 'cadastroProfessor', component: CadastroProfessorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chat/:salaID/:userID', component: ChatComponent},
  {path: 'criarSala', component: CriarSalaComponent},
  {path: 'jogo/:salaID/:userID', component: JogoComponent},
  {path: 'jogo/tabuleiro/:salaID/:userID', component: TabuleiroComponent},
  {path: 'jogo/table/:salaID/:userID', component: Table2Component},

];
