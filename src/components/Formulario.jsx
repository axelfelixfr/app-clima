import React from 'react';

export const Formulario = () => {
  return (
    <form>
      <div className="input-field col s12">
        <input type="text" name="ciudad" id="ciudad" />
        <label htmlFor="ciudad">Ciudad:</label>
      </div>

      <div className="input-field col s12">
        <select name="name" id="pais">
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
    </form>
  );
};
