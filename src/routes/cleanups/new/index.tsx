// @ts-nocheck
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import type { Cleanup } from '@/types';
import { useState } from 'react';
import {useMutation} from '@tanstack/react-query';
import Select from "react-select";
import { toast } from 'react-toastify';
import { createCleanup } from '@/api/cleanups';

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
  const [environmentType, setEnvironmentType] = useState('');
  const [totalItemsCollected, setTotalItemsCollected] = useState(null);
  const [totalBagsCollected, setTotalBagsCollected] = useState(null);
  
  // useEffect(() => {
  //   // Focus the title input when the component mounts
  //   if(inputRef.current) {
  //       inputRef.current.focus();
  //   }
  // }, []);
    
  // const inputRef = useRef(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCleanup,
    onSuccess: () => {
      navigate({to: '/cleanups'});
      toast.success('Cleanup created successfully!');
      window.alert('Cleanup created successfully')
    }
  });

  const environmentTypeOptions = [
    { value: "", label: "Select an environment type", disabled: true },
    { value: "path", label: "Path" },
    { value: "park", label: "Park" },
    { value: "beach", label: "Beach" },
    { value: "other", label: "Other" },
  ];

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !location || !environmentType) {
      toast.error('Please fill in all required fields.');
      window.alert('Please fill in all required fields - title, date, location, environment type')
      return;
    }

    try {
      // await mutateAsync({
      //   title,
      //   date,
      //   description: description ? description : '',
      //   location,
      //   // group_size: groupSize,
      //   group_size: parseInt(groupSize.toString()),
      //   env_type: environmentType,
      //   // total_items: totalItemsCollected ? totalItemsCollected : null,
      //   total_items: totalItemsCollected ? parseInt(totalItemsCollected) : null,
      //   // total_bags: totalBagsCollected ? totalBagsCollected : null,
      //   total_bags: totalBagsCollected ? parseInt(totalBagsCollected) : null,

      await mutateAsync({
        title,
        date,
        description,
        location,
        group_size: parseInt(groupSize.toString()),
        env_type: environmentType,
        total_items: totalItemsCollected ? parseInt(totalItemsCollected) : null,
        total_bags: totalBagsCollected ? parseInt(totalBagsCollected) : null,
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
          />
      </div>
      
      <div className="form-group">
          <label htmlFor="location">Location*</label>
          <input
              id="location"
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
          />
      </div>

      <div className="form-group grid-2">
          <div>
              <label htmlFor="environment-type">Environment Type</label>
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
          <div>
              <label htmlFor="groupSize">Group Size</label>
              <input
                  id="groupSize"
                  style={styles.number}
                  type="number"
                  name="groupSize"
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  min="1"
                  max="9999"
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
              <label htmlFor="groupSize">Total Bags Collected</label>
              <input
                  id="totalBagsCollected"
                  style={styles.number}
                  type="number"
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
