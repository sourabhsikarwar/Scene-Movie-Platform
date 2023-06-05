import React, { useState } from 'react';
import emailjs from 'emailjs-com'

export const Feedback = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [feedback, setFeedback] = useState('');
    emailjs.init('1AkXF-PC-6FG2Ym15');

    const handleSubmit = (e) => {
        e.preventDefault();

        const templateParams = {
            feedback: feedback,
            to_email: 'harshupadhye2832@gmail.com',
            from_email: email
        };
        emailjs
            .send('service_c8wox7q', 'template_47lh3vm', templateParams, '1AkXF-PC-6FG2Ym15')
            .then((response) => {
                console.log('Feedback sent!', response.status, response.text);
                setSubmitted(true);
                setFeedback('');
                setEmail('');
            })
            .catch((error) => {
                console.error('Error sending feedback:', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Enter your feedback"
                    style={{
                        border: '2px solid #ccc',
                        boxSizing: 'border-box',
                        borderRadius: '4px',
                        resize: 'none',
                        width: '50%',
                        height: '100px',
                    }}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
                <input
                    name="email"
                    style={{
                        display: 'flex',
                        alignItems: 'right',
                        border: '2px solid #ccc',
                        width: '50%',
                        height: '50px',
                        borderRadius: '4px',
                    }}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button
                    type="submit"
                    style={{
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        height: '40px',
                        width: '100px',
                        marginTop: '30px',
                    }}
                >
                    Submit
                </button>
            </form>
            {submitted && (
                <div>
                    <p>Sent!</p>
                </div>
            )}
        </div>
    );
};

export default Feedback;
