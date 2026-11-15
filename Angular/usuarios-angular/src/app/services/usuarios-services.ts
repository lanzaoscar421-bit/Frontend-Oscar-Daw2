
import { Iusuario } from './../interfaces/iusuario.interface';
import { Service , signal} from '@angular/core';


@Service()
export class UsuariosServices {

    private arrUsuarios : Iusuario[];
    private url : string = "https://peticiones.online/api/users";
    private id : number;

    usuarioToEdit = signal<Iusuario | null>(null);

    constructor() {

        this.arrUsuarios = [];
        this.connectUsuarios ();
        this.id = this.arrUsuarios.length;
    
    }




    getAllUsuarios(): Iusuario []{

        return this.arrUsuarios;
    }


    private connectUsuarios(){
        fetch(this.url)
            .then(response => response.json())
            .then(datos => {
                datos.results.forEach((element: any, index: number) => {
                    let usuario: Iusuario = element as Iusuario;
                    usuario.id = index;
                    this.arrUsuarios.push(usuario);
                });
                this.id = this.arrUsuarios.length;
                console.log(this.arrUsuarios);
            })

        }



        addUsuario(usuario: Iusuario) : void{

            if (!this.arrUsuarios.includes(usuario) && usuario != null) {
            usuario.id = this.id;
            this.arrUsuarios.push(usuario);
            this.id++;
        }

        }

        deleteUsuarioByName(miUsuario: Iusuario){

            let i = this.arrUsuarios.findIndex(usuario => usuario.first_name == usuario.first_name);
            if (i != -1 && i >= 0 && i < this.arrUsuarios.length) {
                this.arrUsuarios.splice(i, 1);
            }

        }

        updateUsuario(usuario: Iusuario): void {
        let i = this.arrUsuarios.findIndex(u => u.id === usuario.id);
        if (i != -1) {
            this.arrUsuarios[i] = { ...this.arrUsuarios[i], ...usuario };
        }

    }
}
