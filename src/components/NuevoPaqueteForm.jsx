import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm';
import {getClientes, savePaquete} from '../api';
import { getLocation } from '../utils/localizacion';

export const NuevoPaqueteForm = () => {
    
    useEffect(() => {

        obtenerClientes();
        getLocation();      
        getCiudad();
    
    }, [])
    
    const initPaquete = {
        origen: "",
        destino: "",
        peso: 1,
        valor:1,
        bultos:1,
        id_cliente:1
    }
    //const [ formValues, handleInputChange, reset ] = useForm(initPaquete)
    
    // const [id_cliente, setIdCliente] = useState(1)
    
    const [clientes, setClientes] = useState([])
    const [paquete, setPaquete] = useState(initPaquete)
    let {origen,  destino,  peso,   valor,  bultos, id_cliente} = paquete;
    
    

    const obtenerClientes = async () => {
        const clientes = await getClientes();
        setClientes(clientes.clientes)
    }

    const handleInputChange = ({ target }) => {
        console.log('target: ', typeof target)
        setPaquete({
            ...paquete,
            [ target.name ]: target.value
        })
        

    }
   
    const handleClienteChange = (e) => {
        // setIdCliente(e.target.value);
        setPaquete({...paquete, id_cliente: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let paqueteBody = {
            ...paquete,
            id_cliente
        }
        await savePaquete(paqueteBody);

        const {origen, ...resto} = initPaquete 
        const ciudad = localStorage.getItem("origen");
        setPaquete({origen:ciudad, ...resto});
    
    }

    const getCiudad = () => {
        const ciudad = localStorage.getItem("origen");
        setPaquete({...paquete, origen: ciudad})
        
    } 


    const disableSubmitButton = (origen!=="" && destino!=="" && valor>=1 && bultos >=1 && origen!==destino ) ?true: false;

  return (
    <>
        <h4> Ingrese la información</h4>
       
       
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                
                <div className='row'>
                    
                    <div className="input-group" >
                        <div className="input-group-prepend">
                            <label className="input-group-text" >Cliente</label>
                        </div>
                        <select value={id_cliente} id="clientes" className="custom-select " onChange={ (e) => handleClienteChange(e)} >
                            <option  value={1} selected>Escoger cliente...</option>
                            {
                                clientes?.map(cli => (
                                    <option key={cli.id} value={cli.id}>{cli.nombre}</option>
                                ))
                            }
                            {/* <option value="2">Two</option>
                            <option value="3">Three</option> */}
                        </select>
                    </div>
                    
                </div>
                
                <hr></hr>
                <div className='row' >

                    <div className="form-group col">
                        <label >Origen</label>
                        {/* <input id="origen" name="origen" value={ (localStorage.getItem("origen") !== "" )? localStorage.getItem("origen") : origen}  required onChange={handleInputChange} type="text" className="form-control" placeholder="Origen" /> */}
                        <input id="origen" name="origen" value={ origen}  required onChange={handleInputChange} type="text" className="form-control" placeholder="Origen" />
                    </div>
                    
                    <div className="form-group col">
                        <label >Destino</label>
                        <input name="destino" value={destino} required onChange={handleInputChange} type="text" className="form-control" placeholder="Destino" />
                    </div>

                </div>

                <div className='row'>


                    <div className="col">
                        <label >Peso</label>
                        <input name="peso"  min="0" required  value={peso} onChange={handleInputChange}type="number" className="form-control" placeholder="kg" />
                    </div>

                    <div className="col">
                        <label >Valor</label>
                        <input name="valor" min="1"  required value={valor} onChange={handleInputChange} type="number" className="form-control" placeholder="$" />
                    </div>

                    <div className="col">
                        <label >Número de bultos</label>
                        <input name="bultos"  min="1" required value={bultos} onChange={handleInputChange} type="number" className="form-control" placeholder="#" />
                    </div>

                </div>
                
                
                <br></br>
                <button disabled={!disableSubmitButton} type="submit" className="btn btn-primary btn-lg">Crear paquete</button>


            </div>
            
        </form>
    </>
  )
}
