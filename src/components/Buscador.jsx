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
    <div className="container">
      <div className="box cep-input-box">
        <input
          type="text"
          placeholder="00000-000"
          value={ input }
          onChange={ (e) => setInput(e.target.value) }
          maxLength={ 8 }
          data-testid="cep-input"
        />
        <button
          className="button is-dark"
          type="button"
          onClick={ handleClick }
          data-testid="answer-box"
        >
          Buscar CEP
        </button>
      </div>
      {Object.keys(data).length > 0 && (
      <div className="box answer-box" data-testid="answer-box">
        <span> <strong>CEP:</strong> { data.cep }</span>
        <span> <strong>Estado:</strong> { data.uf }</span>
        <span> <strong>Cidade:</strong> { data.localidade }</span>
        <span> <strong>Logradouro:</strong> { data.logradouro }</span>
      </div>
      )}
    </div>
  );
}

export default Buscador;
