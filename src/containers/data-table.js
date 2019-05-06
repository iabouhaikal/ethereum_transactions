/**
 * Created by Ibrahim Abouhaikal on 5/4/19.
 */

import React from 'react';
import { Link } from 'react-router-dom'

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.data) {
      return {
        data: nextProps.data
      }
    }
    return null
  }

  createTableHeader = (columns) => {
    return columns.map((column, index) => {
      return (<th key={index} className="data-header-cell">{column.display}</th>)
    })
  }

  createTableRows = (columns, data) => {
    return data.map((dataSet, index) => {
      const className = index % 2 === 0 ? 'even-row' : 'odd-row'
      return (
        <tr key={index} className={`data-row ${className}`}>{this.createTableCells(columns, dataSet)}</tr>
      )
    })
  }

  createTableCells = (columns, dataSet) => {
    return columns.map((column, index) => {
      const id = column.id
      let value = dataSet[id] ? dataSet[column.id] : '---'

      if((id === 'to' || id === 'blockNumber') && value !== '---' ) {
        value = (
          <Link className="clickable-elem" to={`/ethereum-account/${value}`}>
            {value}
          </Link>
        )
      }

      return (
        <td key={`cell-${index}`} className="data-cell">{value}</td>
      )
    })
  }


  createEmptyRow = (columns) => {
    return(
      <tr key="0" className="data-row">
        <td key="0" className="no-data" colSpan={columns.length}>No Data Available.</td>
      </tr>
    )
  }

  render() {
    const columns = this.props.columns;
    const data = this.state.data;
    return (
      <table className="data-table">
        <tbody>
        <tr className="data-header">
          {this.createTableHeader(columns)}
        </tr>
        {data.length ?
          this.createTableRows(columns, data) :
          this.createEmptyRow(columns)
        }
        </tbody>
      </table>
    )
  }
}

export default DataTable;
