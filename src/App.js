import { useEffect, useState } from 'react';
import { Clima } from './components/Clima';
import { Error } from './components/Error';
import { Formulario } from './components/Formulario';
import { Header } from './components/Header';

function App() {
  // State del Formulario
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  // State para consultar a la API
  const [consulta, setConsulta] = useState(false);

  // Resultado (los datos que se obtuvieron en la consulta)
  const [resultado, setResultado] = useState({});

  // Error de la consulta
  const [error, setError] = useState(false);

  // Extraemos ciudad y pais de busqueda para pasarlos a la url
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consulta) {
        const apiKey = process.env.REACT_APP_API;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}&units=metric`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        // Se guarda el resultado de la API en el state de resultado
        setResultado(resultado);

        // Se pasa la consulta a false para que no haga más peticiones a la API
        setConsulta(false);

        // Si no encontro resultados, mandara el cod '404'
        if (resultado.cod === '404') {
          setError(true);
        } else {
          // Si el cod no es '404' pasa a false el error
          setError(false);
        }
      }
    };

    // Ejecuta la consulta
    consultarAPI();
  }, [consulta, ciudad, pais]);

  let componente;
  // Renderizado condicional
  if (error) {
    componente = <Error mensaje="No hay resultados" />;
  } else {
    componente = <Clima resultadoClima={resultado} />;
  }

  return (
    <>
      <Header titulo="Clima React App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={setBusqueda}
                guardarConsulta={setConsulta}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
