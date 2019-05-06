/**
 * Created by Ibrahim Abouhaikal on 5/5/19.
 */

const COLUMNS = {
  address: [
    {
      id: 'transactionIndex',
      display: 'Transaction Index'
    },
    {
      id: 'to',
      display: 'To'
    },
    {
      id: 'blockNumber',
      display: 'Block Number'
    },
    {
      id: 'confirmations',
      display: 'Confirmations'
    },
    {
      id: 'gasPrice',
      display: 'Gas Price'
    },
    {
      id: 'gasUsed',
      display: 'Gas Used'
    }
  ],
  block: [
    {
      id: 'miner',
      display: 'Miner'
    },
    {
      id: 'unclePosition',
      display: 'Uncle Position'
    },
    {
      id: 'blockreward',
      display: 'Block Reward'
    }
  ]
}


export default COLUMNS
