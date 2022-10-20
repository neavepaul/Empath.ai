import React from 'react'
import HALO from 'vanta/dist/vanta.halo.min'

export default class Halo extends React.Component {
  constructor() {
    super()
    this.vantaRef = React.createRef()
  }
  componentDidMount() {
    this.vantaEffect = HALO({
      el: this.vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      size: 1.5,
      minHeight: 400.00,
      minWidth: 600.00,
      backgroundColor: 0x171518,
      baseColor: 0xff,

    })
  }
  componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy()
  }
  render() {
    return <div ref={this.vantaRef} className="halo-box"></div>
  }
}