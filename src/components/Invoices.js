import React, { Component } from 'react';
import Invoice from './Invoice';
import { Link } from 'react-router-dom';
import { Consumer } from '../context';

class Invoices extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { invoices } = value;
          return (
            <React.Fragment>
              <main id="content">
                <h2 className="heading">
                  <span>Invoices</span>
                </h2>
                <section className="card">
                  <h3 className="secondary-heading">Actions</h3>
                  <button className="button" id="add">
                    <Link to="/invoice/add">Add new</Link>
                  </button>
                </section>

                <section className="card">
                  <h3 className="secondary-heading">Invoices</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Create</th>
                        <th>No</th>
                        <th>Supply</th>
                        <th>Comment</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map(invoice => (
                        <Invoice key={invoice.id} invoice={invoice} />
                      ))}
                    </tbody>
                  </table>
                </section>
              </main>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Invoices;
