import React, { Component } from 'react';
import VenderContract from '../Contracts/VenderSC_ABI';
import web3 from '../Contracts/web3';
// Venderコンポーネントを定義する
class Vender extends Component {

    コンポーネントの状態を初期化する
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = React.createRef();
        this.state = {
          msg:''
        };
    }

    async handleSubmit(event) {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      const resAddress = await VenderContract.methods.IoTDevices(this.input.current.value).call({from:accounts[0]});
      if (resAddress != '0x0000000000000000000000000000000000000000'){
        this.setState({msg: 'アドレスは'+resAddress+'です'})
      }
      else {
        this.setState({msg: 'シリアルナンバーが未登録です'})
      }
    }

    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
          <label>
            シリアルナンバーを入力してください:
            <input type="text" ref={this.input}/>
          </label>
          <input type="submit" value="検索する" />
        </form>
          <p>検索結果：{this.state.msg}
          </p>
        </div>
      );
    }
}

export default Vender;
