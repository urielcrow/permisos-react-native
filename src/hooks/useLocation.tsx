import React from 'react'
import Geolocation from '@react-native-community/geolocation';

export interface Location {
    latitude:number,
    longitude:number
}

export const useLocation = ()=>{

    const [hasLocation, setHasLocation] = React.useState(false);//bandera para indicar cuando se tiene la posición INICIAL del usuario
    const [route, setRoute] = React.useState<Location[]>([]);//guardamos todas las posiciones del usuario para trazar su trayectoria


    const [initialPosition, setInitialPosition] = React.useState<Location>({//Guardamos la posición inicial podriamos juntarla con hasLocation
        longitude:0,
        latitude:0
    });

    const [userLocation, setUserLocation] = React.useState<Location>({//aquí guardamos la nueva posición (gracias al watchPosition) y avisamos en react del cambio
        longitude:0,
        latitude:0
    });

    const idWatch = React.useRef(0);//Guardamos la referencia del Geolocation.watchPosition ya que cambia cada que es llamada y emite un entero de referencia
    const isMounted = React.useRef(true);

    React.useEffect(() => {
        isMounted.current = true;
        return ()=>{
            isMounted.current = false;
        }
    }, []);

    //Obtenemos la posición inicial del usuario
    React.useEffect(() => {
        if(!isMounted.current )
            return;
        getCurrentLocation()
        .then( (location) =>{ 
            setInitialPosition(location);
            setUserLocation(location);
            setRoute(route => [...route,location] );
            setHasLocation(true);
        })
        .catch(console.log);
    }, []);


    //Centramos el mapa dependiendo de la posición del usuario
    const getCurrentLocation = () : Promise<Location>=>{
        return new Promise((resolve,reject)=>{
            Geolocation.getCurrentPosition( 
                ({coords : {latitude,longitude}}) =>{
                    resolve({
                        latitude,
                        longitude
                    });
                 },
                (err) => reject({err}),
                {
                    //enableHighAccuracy:true,
                }
            );
        });
    }

    //seguimos al usuario, gracias a watchPosition que emite cada que exista algún cambio en este caso cada 10 metros
    const followUserLocation = () =>{
        idWatch.current = Geolocation.watchPosition(
            ({coords : {latitude,longitude}}) =>{
                const location : Location = {
                    latitude,
                    longitude
                }
                setUserLocation(location)
                setRoute(route => [...route,location] );
             },
            (err) => console.log({err}),
            {
                //enableHighAccuracy:true,
                distanceFilter:10
            }
        )
    }

    //Limpiamos la suscripción al watchPosition ya que cambia es como un removeEventListener
    const stopFolowUserLocation = ()=>{
        Geolocation.clearWatch(idWatch.current);
    }

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        userLocation,
        followUserLocation,
        stopFolowUserLocation,
        route
    }
}