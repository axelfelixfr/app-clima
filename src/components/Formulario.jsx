import React, { useState } from 'react';

export const Formulario = () => {
  // State del Formulario
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });

  const [error, setError] = useState(false);

  // Extraer informacion de busqueda
  const { ciudad, pais } = busqueda;

  // Función que coloca los elementos del state
  const handleInputChange = e => {
    // Actualizar el state
    setBusqueda({
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
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <p className="red darken-4 error">Todos los campos son obligatorios</p>
      )}

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
          <option value="" disabled selected>
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
