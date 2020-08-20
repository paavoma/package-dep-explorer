import React, {Component} from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import ExplorerMain from './containers/ExplorerMain/ExplorerMain';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <ExplorerMain/>
        </Layout>
      </div>
    );
  }
}

export default App;
