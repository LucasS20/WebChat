import {Routes} from '@angular/router';
import {ChatComponent} from "./components/chat/chat.component";
import {CriarSalaComponent} from "./components/criarSala/criar-sala/criar-sala.component";

export const routes: Routes = [
  {path: 'chat/:roomId/:userId', component: ChatComponent},
  {path: 'criarSala', component: CriarSalaComponent},
];
