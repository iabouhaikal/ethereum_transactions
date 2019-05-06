/**
 * Created by Ibrahim Abouhaikal on 5/4/19.
 */

import React from 'react';
import moment from 'moment'
import FormField from '../components/fields/form-field'
import { HighOrderComponent } from '../utils/component-util'
import { AuthConsumer } from '../auth/auth-context'
import DataTable from './data-table'
import COLUMNS  from './table-columns'

const AccountAddressRef = React.createRef()

const AccountAddressField = HighOrderComponent(FormField, {
  label: 'Address Or Block',
  name: 'address',
  type: 'text',
  className: 'field-ethereum-account',
  placeholder: 'Enter Address or Block: i.e. 2165403 or 0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
  forwardRef: AccountAddressRef
})

class EthereumAccount extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      blockData: {},
      invalidData: false,
      target: 'address',
      targetValue: '',
      apiKey: '3DVUJMJQNA1Z86D3UGFB57HPG5AHGR9EHZ'
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const targetValue = prevState.targetValue;
    const newTargetValue = nextProps.history.location.pathname.split('/').pop();

    if (newTargetValue !== targetValue && newTargetValue !== 'ethereum-account') {
      AccountAddressRef.current.setValue(newTargetValue);
      document.getElementById('form-submit-btn').click();
      return {
        targetValue: newTargetValue
      }
    }
    return null
  }

  handelSubmit = (event) => {
    event.preventDefault();

    const isValidAccount = AccountAddressRef.current.isValidField()
    if (isValidAccount) {
      const value = AccountAddressRef.current.getValue()
      this.getTransactions(value)
    }
  }

  getTransactions = (targetValue) => {
    const target = targetValue.startsWith('0x') ? 'address' : 'block'
    const url = this.getRequestUrl(this.state.apiKey, target, targetValue)

    this.setState({target, targetValue})

    fetch(url)
      .then(res => res.json())
      .then(response => {
        let data = []
        if (parseInt(response.status, 10) === 1) {
          this.setState({invalidData: false});
          if (target === 'block') {
            this.setState({blockData: response.result});
            data = response.result.uncles;
          } else {
            data = response.result;
          }
        } else {
          this.setState({invalidData: true});
          AccountAddressRef.current.setError(`Invalid Account Address: ${targetValue}`)
        }
        this.setState({data});
      })
      .catch(err => {
        this.setState({invalidData: true});
        console.error("Error Loading Transaction: ", err);
        this.setState({data: []});
      })
  }

  getRequestUrl = (apiKey, target, targetValue) => {
    if (target === 'address') {
      return `http://api.etherscan.io/api?module=account&action=txlist&address=${targetValue}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`
    } else if (target === 'block') {
      return `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${targetValue}&apikey=${apiKey}`
    }
  }

  getTableColumns = (target) => {
    return COLUMNS[target]
  }

  render() {
    const target = this.state.target;
    const targetValue = this.state.targetValue;
    const targetDisplay = this.state.target === 'block' ? 'Block' : 'Address';
    const columns = this.getTableColumns(target);
    const blockData = this.state.blockData;
    const invalidData = this.state.invalidData;

    return (
      <AuthConsumer>
        {(props) => (
          <div className="ethereum-account">
            <div className="ethereum-account-action">
              <form action="#" method="GET" onSubmit={this.handelSubmit}>
                <AccountAddressField/>
                <div className="input-group">
                  <button id="form-submit-btn" className="btn btn-primary btn-form btn-ethereum-account"
                          onClick={this.handelSubmit}>Load
                    Transactions
                  </button>
                </div>
              </form>
            </div>

            {!invalidData &&
            <div>
              <h3 className="transactions-title">{targetDisplay} {targetValue} Transactions:</h3>
              {target === 'block' &&
              <div>
                <div>Time: {moment.unix(blockData.timeStamp).format('MM/DD/YYYY')}</div>
                <div>Block Number: {blockData.blockNumber}</div>
                <div>Block Reward: {blockData.blockReward}</div>
                <div>Block Miner: {blockData.blockMiner}</div>
              </div>
              }
            </div>
            }

            <div className="data-container">
              <DataTable columns={columns} data={this.state.data}/>
            </div>
          </div>
        )}
      </AuthConsumer>
    )
  }
}

export default EthereumAccount