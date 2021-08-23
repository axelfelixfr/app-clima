import React, { useState } from 'react';
import { Error } from './Error';
import PropTypes from 'prop-types';
import { useForm } from '../hooks/useForm';

export const Formulario = ({ guardarResultado, guardarError }) => {
  const initialState = {
    ciudad: '',
    pais: ''
  };

  // useForm
  const [formValues, handleInputChange] = useForm(initialState);

  // State para validacion del formulario
  const [validacion, setValidacion] = useState(false);

  // Extraer informacion de busqueda
  const { ciudad, pais } = formValues;

  const consultarAPI = async () => {
    const apiKey = process.env.REACT_APP_API;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}&units=metric`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    // Se guarda el resultado de la API en el state de resultado
    guardarResultado(resultado);

    // Si no encontro resultados, mandara el cod '404'
    if (resultado.cod === '404') {
      // Mandamos el error para que muestre el componente de Error
      guardarError(true);
    } else {
      // Si el cod no es '404' pasa a false el error
      guardarError(false);
    }
  };

  // Cuando se envie el formulario
  const handleSubmit = e => {
    e.preventDefault();

    // Validar antes de hacer consulta
    if (ciudad.trim() === '' || pais.trim() === '') {
      setValidacion(true);
      return;
    }

    // Paso validación
    setValidacion(false);

    // Ejecuta la consulta
    consultarAPI();
  };

  return (
    <form onSubmit={handleSubmit}>
      {validacion && <Error mensaje="Todos los campos son obligatorios" />}

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
  guardarResultado: PropTypes.func.isRequired,
  guardarError: PropTypes.func.isRequired
};
