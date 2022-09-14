import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

const CEP_INPUT = 'cep-input';

describe('1 - A página inicial do buscador deve conter os seguintes campos e características:', () => {

  test('Um local para que o usuário insira seu cep', () => {
    render(<App />, '/');

    const input = screen.getByTestId(CEP_INPUT);
    expect(input).toBeInTheDocument();
  });

  test('Um botão com o texto \'Buscar CEP\'', () => {
    render(<App />, '/');

    const button = screen.getByText(/Buscar CEP/i);
    expect(button).toBeInTheDocument();
  });
});
