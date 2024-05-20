import {Routes} from '@angular/router';
import {ChatComponent} from "./components/telas/chat/chat.component";
import {CriarSalaComponent} from "./components/criarSala/criar-sala/criar-sala.component";
import {JogoComponent} from "./components/telas/jogo/jogo.component";

export const routes: Routes = [
  {path: 'chat/:salaID/:userID', component: ChatComponent},
  {path: 'criarSala', component: CriarSalaComponent},
  {path: 'jogo/:salaID/:userID', component: JogoComponent},
];
