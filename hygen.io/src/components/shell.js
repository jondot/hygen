import React from 'react'
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
  color: #34f749;
`
const Inject = styled.div`
  color: #ff33ff;
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
  font-weight: 700;
  font-family: Monaco, 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', monospace;
  background: #111;
  color: #fff;
  border: 1px solid #dae4ed;
  padding: 1.2rem;
  margin: 0px -2rem;
  box-shadow: 1px 12px 30px rgba(102, 102, 102, 0.24);
  border-radius: 8px;
  max-width: 500px;
  overflow: auto;
  height: 200px;
  margin: 2rem auto;
  font-size: 14px;
  line-height: 1.375;
  direction: ltr;
  text-align: left;
`

const Shell = ({ style }) => {
  const [typingDone, setTypingDone] = React.useState(false)

  return (
    <div style={style}>
      <FauxWindow>
        <FauxChrome />
        <Typist
          cursor={{ show: false, hideWhenDone: true, hideWhenDoneDelay: 0 }}
          avgTypingDelay={50}
          onTypingDone={() => setTypingDone(true)}
        >
          <Cmd>$ hygen component new --name avatar</Cmd>
        </Typist>
        {typingDone && (
          <div>
            <Add> added: src/components/avatar.js</Add>
            <Add> added: src/components/avatar.story.js</Add>
            <Add> added: src/components/__tests__/avatar.spec.js</Add>
            <Inject> inject: src/components/index.js</Inject>
            <Inject> inject: docs/components.md</Inject>
          </div>
        )}
      </FauxWindow>
    </div>
  )
}

export default Shell
