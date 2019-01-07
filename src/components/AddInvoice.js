import React, { Component } from 'react';
import { Consumer } from '../context';
import TextInputGroup from './TextInputGroup';
import TextArea from './TextArea';
// import uuid from 'uuid';
import axios from 'axios';

class AddInvoice extends Component {
  state = {
    id: '',
    no: '',
    createdate: '',
    supplydate: '',
    comment: '',
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { no, createdate, supplydate, comment } = this.state;

    // check for errors
    if (no.length < 3) {
      this.setState({
        errors: {
          no: 'Number should have at least 3 characters'
        }
      });
      return;
    }

    if (createdate === '') {
      this.setState({
        errors: {
          createdate: 'Enter a date please'
        }
      });
      return;
    }

    if (!createdate.match(/(\d{4})-(\d{2})-(\d{2})/)) {
      this.setState({
        errors: {
          createdate: 'Invalid date'
        }
      });
      return;
    }

    if (supplydate === '') {
      this.setState({
        errors: {
          supplydate: 'Enter a date please'
        }
      });
      return;
    }

    if (!supplydate.match(/(\d{4})-(\d{2})-(\d{2})/)) {
      this.setState({
        errors: {
          supplydate: 'Invalid date'
        }
      });
      return;
    }

    if (comment.length > 160) {
      this.setState({
        errors: {
          comment: 'Comment should have no more than 160 characters'
        }
      });
      return;
    }

    const newInvoice = {
      // id: uuid(),
      no,
      createdate,
      supplydate,
      comment
    };

    const res = await axios.post('http://localhost:3000/invoices', newInvoice);
    dispatch({ type: 'ADD_INVOICE', payload: res.data });

    // clear form
    this.setState({
      no: '',
      createdate: '',
      supplydate: '',
      comment: '',
      errors: {}
    });

    // redirect to the main page
    this.props.history.push('/');
  };

  render() {
    const { no, createdate, supplydate, comment, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <main id="content">
              <h2 className="heading">
                <span>Create Invoice</span>
              </h2>
              <div className="card">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <div className="flex">
                    <TextInputGroup
                      label="Number:"
                      name="no"
                      placeholder=""
                      value={no}
                      onChange={this.onChange}
                      error={errors.no}
                    />
                    <TextInputGroup
                      label="Invoice date:"
                      type="date"
                      name="createdate"
                      value={createdate}
                      onChange={this.onChange}
                      error={errors.createdate}
                    />
                  </div>
                  <TextInputGroup
                    label="Supply date:"
                    type="date"
                    name="supplydate"
                    value={supplydate}
                    onChange={this.onChange}
                    error={errors.supplydate}
                  />
                  <TextArea
                    label="Comment"
                    name="comment"
                    placeholder=""
                    value={comment}
                    onChange={this.onChange}
                    error={errors.comment}
                  />
                  <button type="submit" className="button left">
                    Save
                  </button>
                </form>
              </div>
            </main>
          );
        }}
      </Consumer>
    );
  }
}

export default AddInvoice;
