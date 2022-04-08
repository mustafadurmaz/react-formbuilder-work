import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import FormBuilderService from "../../services/formBuilder";

const dynamicForm = [
  {
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    defaultValue: "",
    rules: {
      required: true,
    },
  },
  {
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
    defaultValue: "",
    rules: {
      required: true,
    },
  },
  {
    label: "Gender",
    type: "radio",
    options: ["male", "female"],
    defaultValue: "",
    rules: {
      required: true,
    },
  },
  {
    label: "Profession",
    type: "dropdown",
    options: ["Frontend Developer", "Backend Developer", "Devops Engineer"],
    defaultValue: "",
    rules: {
      required: true,
    },
  },
  {
    type: "checkbox",
    label: "",
    checkboxLabel: "I hereby agree to the terms.",
    defaultValue: false,
    rules: {
      required: true,
    },
  },
];

//Error Component
const Error = ({ children }) => <p style={{ color: "red" }}>{children}</p>;

const Component = ({ value, onChange, type }) => {
  switch (type) {
    case "input":
      return (
        <InputText
        //   placeholder={rest?.placeholder}
          change={({ value }) => onChange(value)}
          value={value}
        />
      );
    // case "radio":
    //   return rest?.options.map((e) => (
    //     <RadioButton
    //       key={e}
    //       label={e}
    //       value={e}
    //       onChange={(value) => onChange(value)}
    //       checked={value === e}
    //     />
    //   ));
    // case "dropdown":
    //   return (
    //     <Dropdown
    //       dataSource={rest?.options}
    //       select={({ itemData }) => {
    //         onChange(itemData.value);
    //       }}
    //       value={value}
    //     />
    //   );

    // case "checkbox":
    //   return (
    //     <Checkbox
    //       label={rest?.checkboxLabel}
    //       onChange={(e) => onChange(e.target.checked)}
    //       checked={value}
    //     />
    //   );

    default:
      return null;
  }
};

const FormGenerate2 = () => {
  const [formData, setFormData] = useState([]);
  const [selectedForm,setSelectedForm] = useState(undefined);

  const getForms = () => {
    FormBuilderService.findAll().then((res) => {
      setFormData(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getForms();
    console.log("deneme");
    console.log(selectedForm);
  }, []);

  const {
    handleSubmit,
    control,
    // watch,
    reset,
    unregister,
    formState: { errors },
  } = useForm();
  
  

  const onSubmit = (data) => console.log(data);

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="wrapper">
      <Dropdown
        optionLabel="name"
        value={selectedForm}
        options={formData}
        onChange={(e) => {
          const temp = selectedForm ? selectedForm.items : [];
          // console.log(temp)
          for (let item of temp) {
            unregister(item.label);
          }
          reset();
          setSelectedForm(e.value);
          console.log(e.value);
        }}
        placeholder="Select a City"
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        {selectedForm && Object.keys(selectedForm.items).map((e) => {
      
      const { rules, label } = selectedForm.items[e];
            console.log(selectedForm.items[e]);
      return (
        <section key={e}>
          <label>{label}</label>
          <Controller
            name={label}
            control={control}
            rules={rules}
            // defaultValue={defaultValue}
            render={({ field }) => (
              <div>
                <Component
                  value={field.value||""}
                  onChange={field.onChange}
                  {...selectedForm.items[e]}
                />
              </div>
            )}
          />
          {errors[e] && <Error>This field is required</Error>}
        </section>
      );
    })}
        <div style={{ textAlign: "center" }}>
          <Button type="submit">
            Success
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormGenerate2;
