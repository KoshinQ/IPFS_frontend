import React, { Component } from 'react';
import abi from '../Contracts/IoTSC_ABI';
import web3 from '../Contracts/web3';
// hashCheckコンポーネントを定義する
class hashCheck extends Component {

    // コンポーネントの状態を初期化する
    constructor(props) {
        super(props);
        this.softwareHashCheck = this.softwareHashCheck.bind(this);
        this.input = React.createRef();
        this.state = {
            msg:''
        };
    }

    async softwareHashCheck(event) {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      const contract = new web3.eth.Contract(abi, this.props.takedEID)
      const res = await contract.methods.softwareHashCheck(this.input.current.value).call({from:accounts[0]});
      this.setState({msg: res})
    }

    render() {
        return (
          <div>
            <form onSubmit={this.softwareHashCheck}>
                <label>
                    検証するハッシュ値を入力してください：
                    <input type="text" ref={this.input}/>
                </label>
                <input type="submit" value="検証" />
            </form>
            <p>{this.state.msg}</p>
          </div>
        );
    }
}

export default hashCheck;