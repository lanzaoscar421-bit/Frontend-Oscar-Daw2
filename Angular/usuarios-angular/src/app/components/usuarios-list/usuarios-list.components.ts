import { UsuariosCardComponents } from './../usuarios-card/usuarios-card.components';
import { ChangeDetectionStrategy,Component , inject, } from '@angular/core';
import { Iusuario } from './../../interfaces/iusuario.interface';
import { UsuariosServices } from './../../services/usuarios-services';


@Component({
  imports: [UsuariosCardComponents],
  selector: 'app-usuarios-list',
  styleUrl: './usuarios-list.components.css',
  templateUrl: './usuarios-list.components.html',
  changeDetection : ChangeDetectionStrategy.Eager,

})
export class UsuariosListComponents {


  usuariosArray: Iusuario [];

  private usuariosServices = inject(UsuariosServices);

  constructor() {
    this.usuariosArray = [];

  }

  ngOnInit(): void{

    this.usuariosArray = this.usuariosServices.getAllUsuarios();
  }
}
