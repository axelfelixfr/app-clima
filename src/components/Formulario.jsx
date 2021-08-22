import React, { useState } from 'react';
import { Error } from './Error';
import PropTypes from 'prop-types';

export const Formulario = ({ busqueda, guardarBusqueda, guardarConsulta }) => {
  const [error, setError] = useState(false);

  // Extraer informacion de busqueda
  const { ciudad, pais } = busqueda;

  // Función que coloca los elementos del state
  const handleInputChange = e => {
    // Actualizar el state
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    });
  };

  // Cuando se envie el formulario
  const handleSubmit = e => {
    e.preventDefault();

    // Validar
    if (ciudad.trim() === '' || pais.trim() === '') {
      setError(true);
      return;
    }

    // Paso validación
    setError(false);

    // Consulta a la API
    guardarConsulta(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Error mensaje="Todos los campos son obligatorios" />}

      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={handleInputChange}
        />
        <label htmlFor="ciudad">Ciudad:</label>
      </div>

      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={handleInputChange}>
          <option value="" disabled defaultValue="selected">
            --Seleccione un país--
          </option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">País:</label>
      </div>

      <div className="input-field col s12">
        <button
          type="submit"
          className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
        >
          Buscar Clima
        </button>
      </div>
    </form>
  );
};

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  guardarBusqueda: PropTypes.func.isRequired,
  guardarConsulta: PropTypes.func.isRequired
};
