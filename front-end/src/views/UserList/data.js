import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    type: 'income',
    name: 'Salário',
    value: 'R$ 200,00',
    category: 'Salário',
    paid: 'Sim'
  },
  {
    id: uuid(),
    type: 'expense',
    name: 'Livraria Saraiva',
    value: 'R$ 50,00',
    category: 'Compras',
    paid: 'Sim'
  }
];
