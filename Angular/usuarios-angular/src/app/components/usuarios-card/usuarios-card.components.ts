import { Iusuario } from './../../interfaces/iusuario.interface';
import { UsuariosServices } from './../../services/usuarios-services';
import { ChangeDetectionStrategy,Component, inject,input,Input } from '@angular/core';


@Component({
  imports: [],
  selector: 'app-usuarios-card',
  styleUrl: './usuarios-card.components.css',
  templateUrl: './usuarios-card.components.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})

export class UsuariosCardComponents {

  @Input() miUsuario !: Iusuario;

  usuariosServices = inject(UsuariosServices);


  //Eliminar

  deleteUsuario(miUsuario : Iusuario){

    this.usuariosServices.deleteUsuarioByName(miUsuario);
    

  }

  //Editar
  updateUsuario(miUsuario: Iusuario){

    this.usuariosServices.usuarioToEdit.set(miUsuario);
  }
}
