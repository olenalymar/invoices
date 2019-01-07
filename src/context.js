import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_INVOICE':
      return {
        ...state,
        invoices: state.invoices.filter(
          invoice => invoice.id !== action.payload
        )
      };
    case 'ADD_INVOICE':
      return {
        ...state,
        invoices: [action.payload, ...state.invoices]
      };
    case 'UPDATE_INVOICE':
      return {
        ...state,
        invoices: state.invoices.map(
          invoice =>
            invoice.id === action.payload.id
              ? (invoice = action.payload)
              : invoice
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    invoices: [
      // {
      //   id: 1,
      //   no: 'INV-000001',
      //   createdate: '20-03-2018',
      //   supplydate: '21-03-2018',
      //   comment: 'Test'
      // },
      // {
      //   id: 2,
      //   no: 'INV-000002',
      //   createdate: '22-03-2018',
      //   supplydate: '25-03-2018',
      //   comment: 'Test two'
      // },
      // {
      //   id: 3,
      //   no: 'INV-000003',
      //   createdate: '27-03-2018',
      //   supplydate: '29-03-2018',
      //   comment: 'Test three'
      // }
    ],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  async componentDidMount() {
    const res = await axios.get('http://localhost:3000/invoices');

    this.setState({ invoices: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
