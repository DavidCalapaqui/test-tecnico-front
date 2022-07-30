import Swal from 'sweetalert2';
import {getFetch} from './utils/getFetch'

export const getClientes = async () => {

    const resp = await getFetch('clientes', {}, 'GET');
    const clientes = await resp.json();
    // console.log(clientes)
    
    return clientes;
}

export const savePaquete = async (paquete) => {
    try {
        const resp = await getFetch('paquetes', paquete, 'POST');
        const {ok, msg} = await resp.json();
        if(ok){
            Swal.fire('Paquete creado', msg, 'success')
        }

    } catch (error) {
        Swal.fire('Paquete creado', error.message, 'success')
    }

}