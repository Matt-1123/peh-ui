// @ts-nocheck
import { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { Cleanup } from '@/types';
import {useMutation} from '@tanstack/react-query';
import Select from "react-select";
import { toast } from 'react-toastify';
import { createCleanup } from '@/api/cleanups';
import { RiInformation2Line } from 'react-icons/ri';
import { SearchBox  } from '@mapbox/search-js-react';

export const Route = createFileRoute('/cleanups/new/')({
  component: NewCleanupPage,
})

function NewCleanupPage() {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [groupSize, setGroupSize] = useState(1);
  const [duration, setDuration] = useState(null);
  const [environmentType, setEnvironmentType] = useState('');
  const [totalItemsCollected, setTotalItemsCollected] = useState(null);
  const [totalBagsCollected, setTotalBagsCollected] = useState(null);
  const [showBagInfoBox, setShowBagInfoBox] = useState(false)

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCleanup,
    onSuccess: () => {
      navigate({to: '/cleanups'});
      toast.success('Cleanup created successfully!');
    }
  });

  // Get today's date in YYYY-MM-DD format for the html date input's max attribute
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const environmentTypeOptions = [
    { value: "", label: "Select an environment type", disabled: true },
    { value: "path", label: "Path" },
    { value: "park", label: "Park" },
    { value: "beach", label: "Beach" },
    { value: "other", label: "Other" },
  ];

  const handleBagInfo = () => {
    setShowBagInfoBox(!showBagInfoBox);
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !location || !environmentType) {
      toast.error('Please fill in all required fields.');
      window.alert('Please fill in all required fields - title, date, location, environment type')
      return;
    }

    try {
      await mutateAsync({
        title,
        date,
        description,
        location,
        group_size: parseInt(groupSize.toString()),
        duration: duration ? parseInt(duration) : null,
        env_type: environmentType,
        total_items: totalItemsCollected ? parseInt(totalItemsCollected) : null,
        total_bags: totalBagsCollected ? parseFloat(totalBagsCollected) : null,
      });
    } catch (error) {
      console.error('Error creating cleanup:', error);
      toast.error('Failed to create cleanup. Please try again.');
    }
  }

  return (
    <form className="container-narrow bg-dark" onSubmit={submitForm}>
      <h2 className="text-primary font-lg">Cleanup Action</h2>
      
      <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input
              id="title"
              type="text"
              name="title"
              placeholder="Cleanup Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              // ref={inputRef}
          />
      </div>
      
      <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
              name="description" 
              id="description" 
              placeholder="(Optional) Describe your cleanup action"
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
          <label htmlFor="location">Location*</label>
          <SearchBox
            accessToken={import.meta.env.VITE_MAPBOX}
            value={location}
            onChange={(value) => setLocation(value)}
            onRetrieve={(result) => {
              // When user selects a suggestion, use the full address
              setLocation(result.features[0].properties.full_address || result.features[0].properties.place_formatted);
            }}
            placeholder="Enter location"
            options={{
              language: 'en'
            }}
          />
      </div>

      <div className="form-group grid-3">
          <div>
              <label htmlFor="environment-type">Environment Type*</label>
              <Select
                  styles={customStyles}
                  // defaultInputValue={}
                  onChange={(selectedOption) => {
                      setEnvironmentType(selectedOption.value);
                  }}
                  options={environmentTypeOptions}
                  placeholder="Choose an environment type"
                  required={true}
              />
          </div>
          <div className='center-input'>
              <label htmlFor="groupSize">Group Size*</label>
              <input
                  id="groupSize"
                  style={styles.number}
                  type="number"
                  name="groupSize"
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  min="1"
                  max="999"
                  required
              />
          </div>
          <div>
              <label htmlFor="duration">Duration (in minutes)</label>
              <input
                  id="duration"
                  style={styles.number}
                  type="number"
                  name="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="1"
                  max="600"
              />
          </div>
      </div>

      <div className="form-group grid-2">
          <div>
              <label htmlFor="totalItemsCollected">Total Items Collected</label>
              <input
                  id="totalItemsCollected"
                  style={styles.number}
                  type="number"
                  name="totalItemsCollected"
                  // value={totalItemsCollected}
                  onChange={(e) => setTotalItemsCollected(e.target.value)}
                  min="0"
                  max="99999"
              />
          </div>
          <div>
              <label htmlFor="totalBagsCollected">Total Bags Collected <RiInformation2Line onClick={handleBagInfo} style={{ cursor: 'pointer', position: 'relative' }}/></label>
              {showBagInfoBox && <div className="infoBox">Please enter 0.25 increments. Bags are calculated based on a standard 13 gallon size. For 30 gallon bags, enter 2.25 for a full bag. For a 5 gallon bag, round up to 0.5.</div>}
              <input
                  id="totalBagsCollected"
                  style={styles.number}
                  type="number"
                  step="0.25"
                  name="totalBagsCollected"
                  // value={totalBagsCollected}
                  onChange={(e) => setTotalBagsCollected(e.target.value)}
                  min="0"
                  max="999"
              />
          </div>
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
