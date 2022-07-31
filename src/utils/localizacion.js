const calcularDireccion = async( lat, lon ) => {
       
    const direccion = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=c08d0f2842dfb61e96bad69fa449eef4`)
    const ubicacion = await direccion.json();
    const ciudad = ubicacion[0].name;
    localStorage.setItem("origen" ,ciudad)
    // alert(`Origen: ${ciudad}`)
    // const field = document.getElementById("origen");
    return ciudad;

}
const onUbicacionConcedida = async ubicacion => {
    console.log("Tengo la ubicación: ", ubicacion);
    const {latitude,  longitude  } = ubicacion.coords;
    await calcularDireccion(latitude,  longitude);
}

const onErrorDeUbicacion = err => {
    console.log("Error obteniendo ubicación: ", err);
}



const opcionesDeSolicitud = {
    enableHighAccuracy: true, // Alta precisión
    maximumAge: 0, // No queremos caché
    timeout: 5000 // Esperar solo 5 segundos
};

const sendCity = (city) => {

}


export const getLocation  = () =>  {

    if (!"geolocation" in navigator) {
		return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
	}

	// Solicitar
	navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
    
};


