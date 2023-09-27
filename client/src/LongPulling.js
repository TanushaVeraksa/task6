import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

function LongPulling() {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('');
    const TIMOUT = 500;

    useEffect(() => {
        subscribe();
    }, [])

    const subscribe = async() => {
        try {
           const {data} = await axios.get('https://server-task6.onrender.com/api/message/get-message');
           setMessages(prev => [data.message, ...prev]);
            await subscribe();
        } catch(e) {
            setTimeout(() => {
                subscribe();
            }, TIMOUT)
        }
    }

    const sendMessage = async()=> {
        await axios.post('https://server-task6.onrender.com/api/message/new-message', {
            message: value,
            tag: 'Comment'
        })
    }
  return (
    <div>
        <Form.Control 
            type="text" 
            value={value} 
            onChange={e => setValue(e.target.value)} 
        />
        <Button variant="primary" onClick={sendMessage}>Send</Button>
        <div>
            {messages.map((msg, index) => 
            <Card className='mt-2'>
               <Card.Body>{msg}</Card.Body>
             </Card>
            )}
        </div>
    </div>
  )
}

export default LongPulling