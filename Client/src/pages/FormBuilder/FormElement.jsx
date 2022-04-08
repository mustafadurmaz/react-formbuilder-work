// import { Input, Form, Checkbox } from "antd";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import React, { useState, useEffect } from "react";

// mapping of our components
const componentMapping = {
  input: InputText,
  textarea: InputTextarea,
  dropdown: Dropdown
}
function FormElement({ type, label, register, errors, name, options, required, unregister, reset }) {
  // dinamically select a component from componentMapping object
  const Component = componentMapping[type] || undefined;
  const [selectedForm, setSelectedForm] = useState(undefined)

  if (Component === undefined) {
    return null
  }
  
  return (
    <div className="my-2">
      <label className="block">{label}</label>
      <Component
        options={options}
        optionLabel="optionsName"
        className={errors[label] && "p-invalid"}
        {...register(label, { required: required })}
        onChange={(e) => {
          const temp = selectedForm ? options : [];
          
          // for (let item of temp) {
          //   console.log(item);
          //   unregister(item.optionsName)
          // }
          // reset()
          console.log(e.value);
          setSelectedForm(e.value.optionsName)
          console.log(selectedForm);
        
        }}
        value={selectedForm}
      />
      {errors[label] && (
        <small className="p-error block">This field is required.</small>
      )}
    </div>
    // <div className="field">
    //   <label>Brand Name</label>
    //   <InputText
    //     defaultValue={facility.brand_name}
    //     className={errors.brand_name && "p-invalid"}
    //     {...register("brand_name", { required: true })}
    //   />
    //   {errors.brand_name && (
    //     <small className="p-error block">This field is required.</small>
    //   )}
    // </div>

  )
}

export default FormElement;