var Web3 = require('web3');
var web3;
var address = ["0x288b178f7538633275002f7795e2bdb177dd6358", "0xd18178da6e57ebacc0302d2e046699419914f973",
 "0x29b9ebbecda13c6ed9ed6223962e852b3877d9d2", "0xf97895d1b6808aa44a7fe01a009579d37a311dd7"];
var p_file = 'Deno.sol';
var p_name = ':Deno'
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://18.18.117.118:5587"));
}
var eth = web3.eth;
eth.defaultAccount = address[0]
const fs_c = require('fs')
const solc_c = require('solc')
var source_c = fs_c.readFileSync(p_file,'utf8');
var compileContract_c = solc_c.compile(source_c, 1);
var abi_c = compileContract_c.contracts[p_name].interface;
var bytecode_c = compileContract_c.contracts[p_name].bytecode;
var mycontract = new eth.Contract(JSON.parse(abi_c));
mycontract.options.address = address[0];
mycontract.options.from = address[0];
mycontract.options.gasPrice = 1000000000;
mycontract.options.gas = 5000000;
mycontract.options.data = '0x' + bytecode_c;
mycontract.deploy().send({from: address[0]});
