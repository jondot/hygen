import React, { Component } from 'react'
import styled from 'styled-components'
import Typist from 'react-typist'

const Button = styled.div`
  border-radius: 5px;
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color};
  margin: 0 3px;
`
const Bar = styled.div`
  margin-top: -8px;
  margin-bottom: 15px;
  margin-left: -12px;
  margin-right: 15px;
  display: flex;
`
const Cmd = styled.div`
  margin-bottom: 1rem;
`
const Add = styled.div`
  color: #34c749;
`
const Inject = styled.div`
  color: magenta;
`
const FauxChrome = () => (
  <Bar>
    <Button color="#FC615D" />
    <Button color="#FDBC40" />
    <Button color="#34C749" />
  </Bar>
)

// we can't wait for prism to initialize, so we're inlining styles here
const FauxWindow = styled.pre`
  font-family: Monaco, 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', monospace;
  background: #fff;
  border: 1px solid #dae4ed;
  padding: 2rem;
  margin: 0px -3rem;
  box-shadow: 0 2px 6px 0 #eff5fa;
  border-radius: 3px;
  max-width: 500px;
  overflow: auto;
  height: 200px;
  margin: 4rem auto;
  font-size: 14px;
  line-height: 1.375;
  direction: ltr;
  text-align: left;
`

class Shell extends Component {
  state = {}
  render() {
    return (
      <div style={this.props.style}>
        <FauxWindow>
          <FauxChrome />
          <Typist
            cursor={{ show: false, hideWhenDone: true, hideWhenDoneDelay: 0 }}
            avgTypingDelay={50}
            onTypingDone={() => this.setState({ typingDone: true })}
          >
            <Cmd>$ hygen component new --name avatar</Cmd>
          </Typist>
          {this.state.typingDone && (
            <div>
              <Add>{`     added: src/components/avatar.js`}</Add>
              <Add>{`     added: src/components/avatar.story.js`}</Add>
              <Add>{`     added: src/components/__tests__/avatar.spec.js`}</Add>
              <Inject>{`    inject: src/components/index.js`}</Inject>
              <Inject>{`    inject: docs/components.md`}</Inject>
            </div>
          )}
        </FauxWindow>
      </div>
    )
  }
}

export default Shell
