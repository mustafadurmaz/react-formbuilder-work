import React,{ useState, useEffect} from "react";
import FormElement from "./FormElement";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import FormBuilderService from "../../services/formBuilder";

function FormGenerate() {
  // const components = [
  //   {
  //     type: "input",
  //     label: "First Name",
  //     required: true,
  //     defaultValue: "asddsa",
  //   },
  //   {
  //     type: "input",
  //     label: "Last Name",
  //     required: true,
  //   },
  //   {
  //     type: "input",
  //     label: "Email",
  //     required: true,
  //   },
  //   {
  //     type: "textarea",
  //     label: "test",
  //     required: true,
  //   },
  // ];

  const [forms,setForms] = useState([])
  const [selectedForm,setSelectedForm] = useState(undefined)

  const getForms = () => {
    FormBuilderService.findAll().then(res=>{
      setForms(res.data)
      console.log(res.data);
    })
  }

  useEffect(()=>{
    getForms();
  },[])

  const {
    register,
    handleSubmit,
    reset,
    unregister,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <Dropdown
        optionLabel="name"
        value={selectedForm}
        options={forms}
        onChange={(e) => {
          const temp = selectedForm ? selectedForm.items : [];
          // console.log(temp)
          for(let item of temp){
            unregister(item.label)
          }
          reset()
          setSelectedForm(e.value)
        }}
        placeholder="Select a City"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {selectedForm &&  selectedForm.items.map((component) => (
          <FormElement
            key={component.label}
            errors={errors}
            {...component}
            register={register}
            unregister={unregister}
            reset={reset}
          />
        ))}
        {selectedForm && <Button type="submit">Submit</Button>}
      </form>
    </div>
  );
}
export default FormGenerate;
