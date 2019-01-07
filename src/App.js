import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Invoices from './components/Invoices';
import AddInvoice from './components/AddInvoice';
import EditInvoice from './components/EditInvoice';
import NotFound from './components/NotFound';

import { Provider } from './context';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Invoices} />
              <Route exact path="/invoice/add" component={AddInvoice} />
              <Route exact path="/invoice/edit/:id" component={EditInvoice} />
              <Route exact component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
