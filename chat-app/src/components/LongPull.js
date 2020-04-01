import React, { useState, useEffect } from "react";
import axios from "axios";

const id = Math.ceil(Math.random() * 100000);

const LongPull = props => {
    const [messages, setMassages] = useState([]);
    const [input, setInput] = useState("");
    const [Name, setName] = useState("");

    const subscribe = messages => {
        axios.post(`http://localhost:5000/subscribers`, { id }).then(res => {
            setMassages(messages.concat(res.data));
            subscribe(messages.concat(res.data));
        });
    };

    useEffect(() => {
        subscribe(messages);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post("http://localhost:5000/subscribers/message", {
                content: input,
                name: Name
            })
            .then(() => {});
    };

    const handleChange = e => {
        const {
            target: { value }
        } = e;
        setInput(value);
    };

    const SetName = e => {
        const {
            target: { value }
        } = e;
        setName(value);
    };

    return (
        <div>
            <h1>
                <strong>LongPull</strong>
            </h1>
            <form>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={Name}
                    onChange={SetName}
                    placeholder="Enter your name..."
                />
                <input
                    id="content"
                    type="text"
                    name="content"
                    placeholder="Enter your message....."
                    onChange={handleChange}
                    value={input}
                />
                <button type="submit" onClick={handleSubmit}>
                    Send
                </button>
            </form>
            <div>
                {messages.map(m => (
                    <div key={m.content}>
                        <span>
                            <p>
                                <strong>{m.name}</strong>: {m.content}
                            </p>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LongPull;
