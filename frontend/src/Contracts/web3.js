// web3ライブラリの読み込み
import Web3 from 'web3';

let currentWeb3;

// MetaMask ver0.5以降のチェック処理
if (window.ethereum) {

    // web3のインスタンスを作成する
    let instance = new Web3(window.ethereum);
    try {
    
        // アカウントへのアクセスを要求する
        window.ethereum.request();
	
        // MetaMaskのプロバイダの使用
        currentWeb3 = instance;
    } catch (error) {
    
        // アクセスを拒否された時のアラートを表示
        alert('Please allow access for the app to work');
    }

// MetaMask ver0.5以前のチェック処理
} else if (window.web3) {

    // MetaMaskのプロバイダの使用
    currentWeb3 = new Web3(window.web3.currentProvider);
} else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

export default currentWeb3;
