/**
 * Created by Ibrahim Abouhaikal on 5/4/19.
 */

import React from 'react';

export function HighOrderComponent(HOCComponent, data) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: data
      }
    }

    render() {
      const forwardedRef = this.state.data.forwardRef
      return (
        <HOCComponent ref={forwardedRef} data={this.state.data} {...this.props} />
      )
    }
  }
}

