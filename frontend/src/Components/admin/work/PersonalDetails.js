import React from 'react'
import { Form, Button, Input, Select, Radio } from 'semantic-ui-react';

const genderOptions = [
  { key: 'm', label: 'Male', value: 'male' },
  { key: 'f', label: 'Female', value: 'female' }
]


const PersonalDetails = (props) => {
  const { gender, age, country } = props.values;

  let ageOptions = []
  for (var i = 18; i < 30; i++) {
    ageOptions.push({ text: i, value: i })
  }

  return (

    <React.Fragment>
      <h1 className="ui centered">Personal Details</h1>

      <Form.Group inline>
        <label>Gender</label>
        {genderOptions.map((opt) =>
          <Form.Field
            control={Radio}
            name="gender"
            label={opt.label}
            value={opt.value}
            key={opt.key}
            checked={gender === opt.value}
            onChange={props.handleChange}
          />
        )}
      </Form.Group>

      <Form.Field
        control={Select}
        label='Age'
        name='age'
        value={age}
        options={ageOptions}
        placeholder='Select your age'
        onChange={props.handleChange}
      />

      <Form.Field
        control={Input}
        label='Country'
        value={country}
        name="country"
        onChange={props.handleChange}
      />

      <Button onClick={props.prev}>Back</Button>
      <Button onClick={props.next}>Next</Button>
    </React.Fragment>


  );
}


export { PersonalDetails };