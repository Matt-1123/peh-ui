// @ts-nocheck
import { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { DietActionMeal } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createDietActionMeal } from '@/api/dietActions';
import { RiInformation2Line } from 'react-icons/ri';
import foodsCO2e from '@/utils/foodsCO2e'
import Select from 'react-select';
import getTodaysDate from '@/utils/getTodaysDate'

export const Route = createFileRoute('/actions/diet/new/')({
  component: NewDietActionPage,
})

function NewDietActionPage() {
  const navigate = useNavigate();
  
  const [actionType, setActionType] = useState('');
  const [showTypeInfoBox, setShowTypeInfoBox] = useState(false)
  const [mealName, setMealName] = useState('');
  const [date, setDate] = useState(getTodaysDate());
  const [description, setDescription] = useState('');
  const [foodsAvoided, setFoodsAvoided] = useState([]);
  const [totalCO2Avoided, setTotalCO2Avoided] = useState(null);
  const [avoidedFoodsCheckedState, setAvoidedFoodsCheckedState] = useState(
    new Array(foodsCO2e.length).fill(false)
  );

  // const handleAvoidedFoodsOnChange = (position) => {
  //   const updatedCheckedState = avoidedFoodsCheckedState.map((item, index) =>
  //     index === position ? !item : item
  //   );

  //   setAvoidedFoodsCheckedState(updatedCheckedState);
  // };

  useEffect(() => {
    console.log('foodsAvoided: ', foodsAvoided)
    console.log('foodsAvoided length: ', foodsAvoided.length)
  }, [foodsAvoided]);


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
    setShowTypeInfoBox(!showTypeInfoBox);
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
      <p className='mb-1'>A diet action can be anything from a single environmentally friendly meal to a diet change. Record a meal, or for bigger changes, log how long you've avoided certain foods or set a goal.</p>
      <p>When logging a meal, you can optionally add which foods you've avoided. The dropdown list contains the foods with the highest carbon emissions associated with their production. Enter the amount and unit of each food to determine the amount of CO2e prevented.</p>
      
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
        <p style={{ fontWeight: 'bold' }}>Foods Avoided</p>        
        <Select
          // menuIsOpen={true} // keep open for styling in browser
          classNamePrefix="react-select"
          isMulti
          name="colors"
          options={foodsCO2e}
          className="basic-multi-select"
          onChange={(selectedOptions) => {
            console.log('selected options: ', selectedOptions)
            
            // Update the checked state array based on selected options
            const updatedCheckedState = foodsCO2e.map((food, index) => 
              selectedOptions?.some(option => option.value === food.value) || false
            );
            setAvoidedFoodsCheckedState(updatedCheckedState);
            
            // Preserve existing amount and unit values when updating selected foods
            const updatedFoodsAvoided = selectedOptions?.map(option => {
              const existingFood = foodsAvoided.find(f => f.value === option.value);
              return existingFood 
                ? { ...option, amount: existingFood.amount, unit: existingFood.unit }
                : option;
            }) || [];

            setFoodsAvoided(updatedFoodsAvoided);
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              // borderColor: state.isFocused ? 'grey' : 'red',
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,
              color: '#222',
              position: 'relative'
            })
          }}
        />
        {foodsAvoided.length > 0 && (
          <div>
            <p className='mt-1' style={{ fontWeight: 'bold' }}>Amount Avoided</p>
            <div id='amountAvoidedTableContainer'>
              <table>
                <thead>
                  <tr>
                    <th>Food</th>
                    <th>Amount</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {foodsAvoided.map((food) => (
                    <tr>
                      <td>{food.label}</td>
                      <td>
                        <input
                          type="number"
                          value={food.amount || ''}
                          onChange={(e) => {
                            const updatedFoods = foodsAvoided.map((f) =>
                              f.value === food.value
                                ? { ...f, amount: e.target.value }
                                : f
                            );
                            setFoodsAvoided(updatedFoods);
                          }}
                          style={{ width: '100%', padding: '4px' }}
                          min="0"
                          step="0.1"
                        />
                      </td>
                      <td>
                        <select
                          value={food.unit || ''}
                          onChange={(e) => {
                            const updatedFoods = foodsAvoided.map((f) =>
                              f.value === food.value
                                ? { ...f, unit: e.target.value }
                                : f
                            );
                            setFoodsAvoided(updatedFoods);
                          }}
                          style={{ width: '100%', padding: '4px' }}
                        >
                          <option value="" disabled>Select unit</option>
                          <option value="servings">Servings</option>
                          <option value="pounds">Pounds</option>
                          <option value="ounces">Ounces</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
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
