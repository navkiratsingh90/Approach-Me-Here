
import React, { useState } from 'react';
import styles from './Contact.module.css';
import { GrContact } from 'react-icons/gr';
import img from '../../assets/Contact.jpg'
import {toast} from'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { handleLoading } from '../../Features/Auth/AuthSlice';

function Contact() {
  const [formDetails, setFormDetails] = useState({
    username: '',
    email: '',
    message: ''
  });
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.Auth.isLoading)
  const [formStatus, setFormStatus] = useState('idle');
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        dispatch(handleLoading(true))
        const res = await fetch('http://localhost:7000/api/contact/send', {
          method: 'POST',
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(formDetails)
        })
        const data = await res.json()
        if (res.ok){
          toast.success(data.msg)
          console.log(data.msg);
        setFormStatus('success')
        setTimeout(() => {
          setFormStatus('idle')
        }, 3000);
        }
        else{
          toast.error(data.msg)
          console.log("message not sent");
        }
    } catch (error) {
      console.error("error", error);
    } finally {
      dispatch(handleLoading(false))
    }
  };
  
  return (
    <div className={styles.app}>
      <div className={styles.contactContainer}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <div className={styles.mainHead}>
              <div className={styles.icon}>
                <GrContact className={styles.contactIcon} />
              </div>
              <div className={styles.head}>Get in Touch with Us!</div>
            </div>
            <div className={styles.subHead}>
              Have a question, suggestion, or just want to say hello?
              We'd love to hear from you. Feel free to reach out, and
              we'll get back to you as soon as possible.
            </div>
          </div>
          
          <div className={styles.parent}>
            <div className={styles.img}>
              {/* <div className={styles.imagePlaceholder} />
               */}
               <img className={styles.imagePlaceholder} src={img} alt="" />
            </div>
            
            <div className={styles.formSection}>
              <h1 className={styles.h1}>Contact Us</h1>
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  className={styles.inputField}
                  value={formDetails.username}
                  name="username"
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Your Username"
                  required
                />
                <input
                  className={styles.inputField}
                  value={formDetails.email}
                  onChange={handleInputChange}
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                />
                <textarea
                  className={`${styles.inputField} ${styles.textarea}`}
                  value={formDetails.message}
                  onChange={handleInputChange}
                  name="message"
                  placeholder="Enter your Message"
                  rows="4"
                  required
                ></textarea>
                
                <button 
                  className={`${styles.submitBtn} ${formStatus === 'submitting' ? styles.submitting : ''}`}
                  type="submit"
                  disabled={formStatus === 'submitting'}
                >
                  {isLoading ? (
                    <span className={styles.spinner}></span>
                  ) : (
                    formStatus === 'success' ? '✓ Sent!' : 'Submit'
                  )}
                </button>
                
                {formStatus === 'success' && (
                  <div className={styles.successMessage}>
                    Your message has been sent successfully!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;