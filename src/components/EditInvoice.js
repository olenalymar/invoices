import React, { Component } from 'react';
import { Consumer } from '../context';
import TextInputGroup from './TextInputGroup';
import TextArea from './TextArea';
import axios from 'axios';

class EditInvoice extends Component {
  state = {
    id: '',
    no: '',
    createdate: '',
    supplydate: '',
    comment: '',
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(`http://localhost:3000/invoices/${id}`);

    const invoice = res.data;
    this.setState({
      no: invoice.no,
      createdate: invoice.createdate,
      supplydate: invoice.supplydate,
      comment: invoice.comment
    });
  }

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
          createdate: 'Date is required'
        }
      });
      return;
    }

    if (supplydate === '') {
      this.setState({
        errors: {
          supplydate: 'Date is required'
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

    const updatedInvoice = {
      no,
      createdate,
      supplydate,
      comment
    };

    const { id } = this.props.match.params;

    const res = await axios.put(
      `http://localhost:3000/invoices/${id}`,
      updatedInvoice
    );

    dispatch({ type: 'UPDATE_INVOICE', payload: res.data });

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
                <span>Edit Invoice</span>
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
                    Update
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

export default EditInvoice;
