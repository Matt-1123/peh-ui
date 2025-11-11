// @ts-nocheck
import { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { DietActionMeal } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createDietActionMeal } from '@/api/dietActions';
import { RiInformation2Line } from 'react-icons/ri';
import foodsCO2e from '@/utils/foodsCO2e'

export const Route = createFileRoute('/actions/diet/new/')({
  component: NewDietActionPage,
})

function NewDietActionPage() {
  const navigate = useNavigate();
  
  const [actionType, setActionType] = useState('');
  const [showTypeInfoBox, setShowTypeInfoBox] = useState(false)
  const [mealName, setMealName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [foodsAvoided, setFoodsAvoided] = useState({});
  const [totalCO2Avoided, setTotalCO2Avoided] = useState(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createDietActionMeal,
    onSuccess: () => {
      navigate({to: '/'});
      toast.success('Action created successfully!');
    }
  });

  // Get today's date in YYYY-MM-DD format for the html date input's max attribute
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleTypeInfo = () => {
    setShowTypeInfoBox(!showBagInfoBox);
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!actionType || !date || !mealName) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      await mutateAsync({
        mealName,
        date,
        description,
        foodsAvoided,
        totalCO2Avoided
      });
    } catch (error) {
      console.error('Error creating diet meal action:', error);
      toast.error('Failed to submit this action. Please try again.');
    }
  }

  return (
    <form className="container-narrow bg-dark" onSubmit={submitForm}>
      <h2 className="text-primary font-lg">Diet Action</h2>
      
      <div className="form-group">
          <label htmlFor="actionType">Select a diet action type: *</label>
          <select id="actionSelect" value={actionType} onChange={(e) => setActionType(e.target.value)}>
              <option value="">-- Choose an option --</option>
              <option value="meal">Meal</option>
              <option value="goal" disabled>Goal (coming soon)</option>
              <option value="log" disabled>Log (coming soon)</option>
          </select>
      </div>

      <div className="form-group">
          <label htmlFor="mealName">Meal Name*</label>
          <input
              id="mealName"
              type="text"
              name="mealName"
              placeholder="Meal Name"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              required
          />
      </div>
      
      <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
              name="description" 
              id="description" 
              placeholder="(Optional) Describe your action"
              style={{ maxWidth: '100%', minWidth: '100%', whiteSpace: 'pre-line' }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
          ></textarea>
      </div>

      <div className="form-group">
          <label htmlFor="date">Date*</label>
          <input
              id="date"
              type="date"
              name="date"
              max={getTodayDate()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
          />
      </div>

      <div className="form-group">
        <h2>Foods Avoided</h2>
        <ul>
          {foodsCO2e.map(({ name, kgCO2ePerKg }, index) => {
            return (
              <li key={index}>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      id={`avoided-food-${index}`}
                      name={name}
                      value={name}
                    />
                    <label htmlFor={`avoided-food-${index}`}>{name}</label>
                  </div>
                  <div>{kgCO2ePerKg} CO2e per kg</div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <div>
          <input
              type="submit"
              value="Submit"
              disabled={isPending}
              className="btn btn-primary--dark btn-block"
          />
      </div>

      <p className="font-sm">* required</p>
    </form>
  )
}

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: "#000",
    }),
}

const styles = {
  number: {
    display: "inherit",
    padding: "8px 4px",
    minWidth: "120px"
  }
};
