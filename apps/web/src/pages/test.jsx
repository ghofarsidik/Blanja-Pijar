import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Checkbox,
} from '@material-tailwind/react';

const CheckboxApp = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState([false, false, false, false]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCheckboxes(checkboxes.map(() => newSelectAll));
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
    setSelectAll(newCheckboxes.every(checkbox => checkbox));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96">
        <CardBody>
          <Typography variant="h4" className="mb-4">
            Checkbox Select All Example
          </Typography>
          <div className="mb-2">
            <Checkbox
              id="select-all"
              checked={selectAll}
              onChange={handleSelectAll}
              label="Select All"
            />
          </div>
          {checkboxes.map((isChecked, index) => (
            <div key={index} className="mb-2">
              <Checkbox
                checked={isChecked}
                onChange={() => handleCheckboxChange(index)}
                label={`Item ${index + 1}`}
              />
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default CheckboxApp;
