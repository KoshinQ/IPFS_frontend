import React, { Component } from 'react';
import abi from '../Contracts/IoTSC_ABI';
import web3 from '../Contracts/web3';
// IoTコンポーネントを定義する
class IoT extends Component {

  //コンポーネントの状態を初期化する
  constructor(props) {
    super(props);
    this.addPatientHistry = this.addPatientHistry.bind(this);
    this.input = React.createRef();
    this.state ={
      encmsg: '',
      IPFSCID: '',
    }
  }

  async addPatientHistry(event) {
  event.preventDefault();
  // POST送信
  await fetch('http://localhost:5000/enc', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      plaintxt: this.input.current.value
    })
  })
  .then((response) => response.json())
  .then(data => {
    this.setState({
      IPFSCID: data.enctxt
    })
  })
  console.log(this.state.IPFSCID)
  // await fetch('http://localhost:5000/ipfs', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     CID: this.state.IPFSCID
  //   })
  // })
  // .then((response) => response.json())
  // .then(data => {
  //   this.setState({
  //     encmsg: data.encdata
  //   })
  // })
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(abi, this.props.takedEID)
  console.log(this.state.encmsg)
  await contract.methods.addPatientHistry(this.state.IPFSCID).send({from:accounts[0]});

  }

  render() {
      return (
        <div>
          <form onSubmit={this.addPatientHistry}>
            <label>
              追加する所有者情報を入力してください：
              <input type="text" ref={this.input}/>
            </label>
            <input type="submit" value="登録" />
          </form>
        </div>
      );
  }
}

export default IoT;