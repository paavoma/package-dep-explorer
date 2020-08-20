import React, {Component} from 'react';
import Aux from '../../hoc/Auxil';
import InputForm from '../../components/InputForm/InputForm'


class ExplorerMain extends Component {


  render() {
    return (
      <Aux>
        {
           <InputForm></InputForm> 
        }
      </Aux>
    );
  }
}

export default ExplorerMain;