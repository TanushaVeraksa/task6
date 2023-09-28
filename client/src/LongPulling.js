import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {getMessage, getTags} from './http';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const url = 'https://server-task6.onrender.com';

const LongPulling = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('');
    const [tag, setTag] = useState('');
    const [selected, setSelected] = useState(['']);
    const [auto, setAuto] = useState([]);
    const [inputTag, setInputTag] = useState('');

    const TIMOUT = 500;

    useEffect(() => {
        subscribe();
    }, [])

    useEffect(() => {
        getMessage(selected).then(data => {
            setMessages(data)
        })
        getTags().then(data => {
            setAuto(data);
        })
    }, [selected])

    const subscribe = async() => {
        try {
           const {data} = await axios.get(url + '/api/message/get-message');
           setMessages(prev => [data, ...prev]);
            await subscribe();
        } catch(e) {
            setTimeout(() => {
                subscribe();
            }, TIMOUT)
        }
    }

    const sendMessage = async() => {
        if(!auto.includes(inputTag) && inputTag !== '') {
            setAuto(prev => [...prev, inputTag])
        }
        if(!auto.includes(tag) && tag !== '') {
            setAuto(prev => [...prev, tag])
        }
        if(inputTag === '') {
            await axios.post(url + '/api/message/new-message', {
                message: value,
                tag: tag
            })
        } else {
            await axios.post(url + '/api/message/new-message', {
                message: value,
                tag: inputTag
            })
        }
        setValue('')
        setTag('')
    }
    const handleChange = (event, value) => {
        if(!selected.includes(value) && value !== null) {
            setSelected(prev => [...prev, value]);
        } else {
            setSelected(selected.filter(item => item !== value));
        }
    }
    const handleDelete = (event) => {
        setSelected(selected.filter(item => item !== event.target.value));
    }
  return (
    <Row className='mt-2'>
        <Col md={4}>
            <Form.Label>My tags</Form.Label>
            <div>
            <Autocomplete
                className='w-50 mt-2 mb-2'
                options={auto}  
                onChange={handleChange}
                renderInput={(params) => (<TextField {...params} label="Tag" />
            )}
            />
            {selected.map(elem => 
            elem !== '' &&
            <div>
            <Button
            className="mb-2"
                variant="outline-primary"
                onClick={handleDelete}
                value={elem}
            >{elem}
             </Button>
             </div>
            )}
            </div>
        </Col>
        <Col md={8}>
        <Form.Label>Message:</Form.Label>
        <div className='d-flex'>
            <Form.Control 
                type="text" 
                value={value} 
                onChange={e => setValue(e.target.value)} 
                style={{marginRight: 10}}
            />
            <Autocomplete
                className='w-50'
                freeSolo
                options={auto}  
                onChange={(event, newValue) => setInputTag(newValue)}
                inputValue={tag}   
                onInputChange={(event, newInputValue) => {
                    setTag(newInputValue);
                }}
                renderInput={(params) => (<TextField {...params} label="Tag" />
            )}
            />
        </div>
        <Button className='mt-2' variant="primary" onClick={sendMessage}>Send</Button>
        <div>
            {messages.map((msg, index) => 
            <Card className='mt-2' key={index}>
               <Card.Body className='p-2'>{msg.tag !== '' && 
                <div 
                style={{color: "blue"}}
                >{msg.tag}</div>
                } {msg.message}</Card.Body>
             </Card>
            )}
        </div>
        </Col>
    </Row>
  )
}

export default LongPulling