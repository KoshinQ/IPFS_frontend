import React, { Component } from 'react';
import IoT from './components/IoT'
import Hash from './components/hashCheck'
import VenderContract from './Contracts/VenderSC_ABI';
import IoTContract from './Contracts/IoTSC_ABI';
import web3 from './Contracts/web3';
import './App.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
    this.state ={
      EID: '',
      History: [],
      decmsg: '',
      info : '',
      sn : '',
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const resAddress = await VenderContract.methods.IoTDevices(this.input.current.value).call({from:accounts[0]});
    if (resAddress !== '0x0000000000000000000000000000000000000000'){
      this.setState({EID: resAddress })
    }
    else {
      this.setState({EID: '未登録'})
      this.setState({info: ''})
    }
    this.setState({sn: this.input.current.value})
    const IoTcontractAcc = new web3.eth.Contract(IoTContract, resAddress)
    const resHistry = await IoTcontractAcc.methods.showPatientHistory().call();
    this.setState({History: resHistry})
    const sleep = waitTime => new Promise( resolve => setTimeout(resolve, waitTime) );
    for (let i = 0; i < this.state.History.length; i++) {
      let addinfo = ""
    await fetch('http://localhost:5000/ipfsanddec', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        CID: this.state.History[i]
      })
    })
    .then((response) => response.json())
    .then(data => {
      this.setState({
        decmsg: data.dectxt
      })
    })
      await sleep( 10 );
      this.addinfo += "所有者情報：" + this.state.decmsg + "\n"
      console.log(this.addinfo)
    }
    this.setState({info: this.addinfo})
    this.addinfo = ""
  }

  render() {
    return (
      <div>
        <h3>病院向けサイト(IPFS)</h3>
        <form onSubmit={this.handleSubmit}>
        <label>
          シリアルナンバーを入力してください：　
          <input type="text" ref={this.input}/>
        </label>
          <input type="submit" value="検索" />
        </form>
        <p>操作対象アドレス：{this.state.EID}</p>
        <p>所有者情報：氏名，住所　(暗号化データを復号)</p>
        <p>{this.state.info}</p>
        <IoT takedEID={this.state.EID} takedHistory={this.state.History} takedSn={this.state.sn}/>
        <Hash takedEID={this.state.EID}/>
      </div>
    );
  }
}

export default App;