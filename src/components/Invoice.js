import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../context';
import axios from 'axios';

class Invoice extends Component {
  state = {};

  onDeleteClick = async (id, dispatch) => {
    await axios.delete(`http://localhost:3000/invoices/${id}`);

    dispatch({ type: 'DELETE_INVOICE', payload: id });
  };

  render() {
    // destructuring
    const { invoice } = this.props;
    // or const { id, no, createdate, supplydate, comment } = this.props.invoice;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <tr>
              <td>{invoice.createdate}</td>
              <td>{invoice.no}</td>
              <td>{invoice.supplydate}</td>
              <td>{invoice.comment}</td>
              <td>
                <Link to={`invoice/edit/${invoice.id}`}>
                  <i className="fas fa-edit" />
                </Link>

                <i
                  className="fas fa-trash-alt"
                  onClick={this.onDeleteClick.bind(this, invoice.id, dispatch)}
                />
              </td>
            </tr>
          );
        }}
      </Consumer>
    );
  }
}

Invoice.propTypes = {
  invoice: PropTypes.object.isRequired
};

export default Invoice;
