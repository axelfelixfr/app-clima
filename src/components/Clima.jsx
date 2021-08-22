import React from 'react';
import PropTypes from 'prop-types';

export const Clima = ({ resultadoClima }) => {
  // Extraer valores
  const { name, main } = resultadoClima;

  // Si no existe la propiedad name significa que no hay consulta exitosa por lo tanto que retorne null
  if (!name) return null;

  return (
    <div className="card-panel white col s12">
      <div className="black-text">
        <h2>El clima de {name} es:</h2>
        <p className="temperatura">
          {main.temp} <span>&#x2103;</span>
        </p>

        <p>
          Temperatura Máxima:
          {main.temp_max} <span>&#x2103;</span>
        </p>

        <p>
          Temparatura Mínima:
          {main.temp_min} <span>&#x2103;</span>
        </p>
      </div>
    </div>
  );
};

Clima.propTypes = {
  resultadoClima: PropTypes.object.isRequired
};
