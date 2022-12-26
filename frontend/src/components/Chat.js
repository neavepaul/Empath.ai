import React from 'react'

export default function Chat() {
  return (
    <div className='body'>
      <div className='chat-parent'>
        <div className='bot-message message'>Hello lmao</div>    
        <div className='user-message message'>I am sad as fuck</div>
      </div>
      <div className='center'>
        <input className='chat-box' placeholder='Enter your message'></input>    
      </div>
    </div>
  )
}
