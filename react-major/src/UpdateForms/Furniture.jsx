// FurnitureUpdateModal.jsx
import {React, useState} from 'react';
import s from './Main.module.css';
import { indianCities } from '../Utils/IndianCities';

export default function FurnitureUpdateModal({ data, onClose, onSubmit }) {
  const [form, setForm] = useState({
    soldOut : data.soldOut || 'false',
    brand: data.brand || '',
    modelYear: data.modelYear || '',
    title: data.title || '',
    condition: data.condition || '',
    description: data.description || '',
    category: data.prodCategory || '',
    location: data.location || '',
    sellingPrice: data.sellingPrice || '',
    phoneNumber: data.phoneNumber || '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (form.soldOut == 'true'){
      setForm({...form, soldOut: true})
    }
    else{
      setForm({...form, soldOut: false})
    }
    onSubmit(form);
  };

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.modal} onClick={e => e.stopPropagation()}>
        <h2 className={s.title}>Update Furnitures Details</h2>
        <form className={s.grid} onSubmit={handleSubmit}>

          <label className={s.label}>
            Model Year
            <input
              className={s.inputField}
              type="number"
              name="modelYear"
              value={form.modelYear}
              onChange={handleChange}
            />
          </label>

          <label className={s.label}>
            Title
            <input
              className={s.inputField}
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </label>
          <label className={s.label}>
            Status
            <select
              className={s.input}
              name="soldOut"
              value={form.soldOut}
              onChange={handleChange}>
                <option value="select status">Select Status</option>
                <option value={'true'}>Sold</option>
                <option value='false'>Unsold</option>
                
            </select>
          </label>

          <label className={s.label}>
            Description
            <textarea
              className={` ${s.textarea}`}
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </label>
          <label className={s.label}>Select Condition
          <select
       name="condition"
       value={form.condition}
       onChange={handleChange}
       className={s.selectField}
        required
      >
        <option value="">-- Select Condition --</option>
        <option value="Brand New (Sealed)">Brand New (Sealed)</option>
        <option value="Like New">Like New</option>
        <option value="Gently Used">Gently Used</option>
        <option value="Used (Good Condition)">Used (Good Condition)</option>
        <option value="For Parts / Not Working">For Parts / Not Working</option>
      </select>
      </label>
          <label className={s.label}>
            Category
            <select
              className={s.selectField}
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
                <option value="Sofa">Sofa</option>
                <option value="Bed">Bed</option>
                <option value="Almirah">Almirah</option>
                <option value="Dressing Table">Dressing Table</option>
                <option value="Dining Table">Dining Table</option>
            </select>
          </label>

          <label className={s.label}>
            Location
            <select
              className={s.selectField}
              name="location"
              value={form.location}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {/* Add your city options here */}
              {
								indianCities.map((ele,idx) => <option value={ele}>{ele}</option>)
							}
            </select>
          </label>

          <label className={s.label}>
            Selling Price
            <input
              className={s.inputField}
              type="number"
              name="sellingPrice"
              value={form.sellingPrice}
              onChange={handleChange}
            />
          </label>

          <label className={s.label}>
            Phone Number
            <input
              className={s.inputField}
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </label>

          <div className={s.buttonRow}>
            <button
              type="button"
              className={s.button}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={s.button}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
