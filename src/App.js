import { useState } from 'react';
import { Clima } from './components/Clima';
import { Error } from './components/Error';
import { Formulario } from './components/Formulario';
import { Header } from './components/Header';

function App() {
  // Resultado (los datos que se obtuvieron en la consulta)
  const [resultado, setResultado] = useState({});

  // Error de la consulta
  const [error, setError] = useState(false);

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
                guardarResultado={setResultado}
                guardarError={setError}
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
