import { useState } from "react";
import api from "../services/api";

function Buscador() {

  const [input, setInput] = useState('');
  const [data, setData] = useState({});

  function validateInput() {
    if (isNaN(input) || input.length <= 7) {
      return alert('Digite um CEP válido!');
    } else {
      return input;
    }
  }

  async function handleClick() {
    validateInput();
    
    try {
      const responce = await api.get(`${ input }/json`)
      setData(responce.data);
      setInput('');
    } catch {
      alert('Erro ao buscar');
      setInput('');
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="00000-000"
          value={ input }
          onChange={ (e) => setInput(e.target.value) }
          maxLength={ 8 }
        />
        <button
          type="button"
          onClick={ handleClick }
        >
          Buscar CEP
        </button>
      </div>

      {Object.keys(data).length > 0 && (
        <div>
          <span>CEP: { data.cep }</span>
          <span>Estado: { data.uf }</span>
          <span>Cidade: { data.localidade }</span>
          <span>Logradouro: { data.logradouro }</span>
        </div>
      )}
    </div>
  );
}

export default Buscador;
