import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [contact, setContact] = useState('')
    const [errors, setErrors] = useState({
        email: '',
        company: '',
        contact: '',
    });
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleInputChange = (e : any, type : string) => {
        switch (type) {
            case 'email':
                setEmail(e.target.value)
                break

            case 'company':
                setCompany(e.target.value)
                break

            case 'contact':
                setContact(e.target.value)
                break

            default: return null;
        }
    }

    const handleSubmit = async () => {
        let isValid = true;
        const newErrors = {
            email: '',
            company: '',
            contact: '',
        };

        // Validate form fields
        if (!email) {
            isValid = false;
            newErrors.email = 'Please insert email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            isValid = false;
            newErrors.email = 'Invalid email format';
        }
        if (!company) {
            isValid = false;
            newErrors.company = 'Please insert company';
        }
        if (!contact) {
            isValid = false;
            newErrors.contact = 'Please insert contact';
        }

        setErrors(newErrors);

        try {
            if (isValid) {
                const response = await axios.post(`${import.meta.env.VITE_REACT_BASE_URL}/login.php`,
                    { action: 'signup', email, company, contact },
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        }
                    }
                );                
            
                if (response.data.status === 200) {
                    setMessage('Signup successfully! Redirecting...');
                    setTimeout(() =>{
                        navigate('/')
                    }, 5000)
                } else {
                    setErrorMessage('Signup fail! Please check your information again or contact administrator');
                }
            }
        } catch (error) {
            console.error('An error occurred during processing:', error);
        }
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm">
                    <div className='pb-5 pt-3'><img src="../TRU_logo.png" alt="Toys R Us" /></div>
                                
                    {
                        message !== "" && <p className='w-100 text-center alert alert-success'><span>{message}</span></p>
                    }
                    {
                        errorMessage !== "" && <p className='w-100 text-center alert alert-danger'><span>{errorMessage}</span></p>
                    }
                                
                    <h5 className='pb-2 text-center'>Create an account</h5>

                    <div className="input-container">
                        <input type="email" id="email" name="email" value={email}
                            onChange={(e) => handleInputChange(e, "email")} placeholder='delivery@toysrus.com.au' required />
                        <label htmlFor="email">Email *</label>
                        <p className="text-danger"><i>{errors.email}</i></p>
                    </div>

                    <div className="input-container">
                        <input type="text" id="company" name="company" value={company}
                            onChange={(e) => handleInputChange(e, "company")} placeholder='Toys R Us' required />
                        <label htmlFor="company">Company *</label>
                        <p className="text-danger"><i>{errors.company}</i></p>
                    </div>

                    <div className="input-container">
                        <input type="text" id="contact" name="contact" value={contact}
                            onChange={(e) => handleInputChange(e, "contact")} placeholder='John Delivery' required />
                        <label htmlFor="contact">Contact *</label>
                        <p className="text-danger"><i>{errors.contact}</i></p>
                    </div>

                    <div className='row'>
                        <div className="col-sm">
                            <button type="button" className="btn btn-fullwidth bg-blue" onClick={() => handleSubmit()}>Create</button>
                        </div>
                        <div className="col-sm">
                            <button type="button" className="btn btn-fullwidth bg-darkgray" onClick={() => navigate('/')}>Cancel</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>
    )
}

export default Signup