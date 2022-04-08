import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState, useRef } from "react";
import FormBuilderService from "../../services/formBuilder";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";

const InputComponent = (props) => {
  console.log(props);
  return (
    <div key={props.index} className="field">
      <InputText
        placeholder="label"
        className="block mb-2"
        onChange={(e) => {
          props.setItems((prevValue) => {
            const temp = [...prevValue];
            temp[props.index].label = e.target.value;
            return temp;
          });
        }}
        value={props.item.label}
      />

      <InputText disabled placeholder="value" />
      <div className="my-2">
        <Checkbox
          inputId="cb1"
          onChange={(e) => {
            props.setItems((prevValue) => {
              const temp = [...prevValue];
              temp[props.index].rules.required = !temp[props.index].rules.required;
              return temp;
            });
          }}
          checked={props.items[props.index].rules.required}
        ></Checkbox>
        <label htmlFor="cb1" className="p-checkbox-label">
          isRequired
        </label>
      </div>
    </div>
  );
};

const InputTextareaComponent = (props) => {
  return (
    <div key={props.index} className="field">
      <InputText
        placeholder="label"
        className="block mb-2"
        onChange={(e) => {
          props.setItems((prevValue) => {
            const temp = [...prevValue];
            temp[props.index].label = e.target.value;
            return temp;
          });
        }}
        value={props.item.label}
      />

      <InputTextarea disabled placeholder="value" />
      <div className="my-2">
        <Checkbox
          inputId="cb1"
          onChange={(e) => {
            props.setItems((prevValue) => {
              const temp = [...prevValue];
              temp[props.index].required = !temp[props.index].required;
              return temp;
            });
          }}
          checked={props.isRequired}
        ></Checkbox>
        <label htmlFor="cb1" className="p-checkbox-label">
          isRequired
        </label>
      </div>
    </div>
  );
};

const DropDownComponent = (props) => {
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");
  const dialogFuncMap = {
    displayResponsive: setDisplayResponsive,
  };
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => {
            props.setItems((prevValue) => {
              const temp = [...prevValue];
              temp[props.index].options = inputList;
              return temp;
            });
            setTimeout(() => {
              onHide(name);
            }, 500);
            
          }}
          autoFocus
        />
      </div>
    );
  };

  const [inputList, setInputList] = useState([{ optionsName: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { optionsName: "" }]);
  };
  return (
    <div key={props.index} className="field">
      <InputText
        placeholder="label"
        className="block mb-2"
        onChange={(e) => {
          props.setItems((prevValue) => {
            const temp = [...prevValue];
            temp[props.index].label = e.target.value;
            return temp;
          });
        }}
        value={props.item.label}
      />

      <Dropdown disabled placeholder="value" />
      <Button
        className="ml-3"
        label="Options"
        icon="pi pi-external-link"
        onClick={() => onClick("displayResponsive")}
      />
      <Dialog
        header="Options"
        visible={displayResponsive}
        onHide={() => onHide("displayResponsive")}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "30vw" }}
        footer={renderFooter("displayResponsive")}
      >
        {inputList.map((x, i) => {
          return (
            <div className="box">
              <InputText
                name="optionsName"
                placeholder="Enter Option Name"
                value={x.optionsName}
                onChange={(e) => handleInputChange(e, i)}
              />
              <div className="btn-box">
                {inputList.length !== 1 && (
                  <Button className="my-2" onClick={() => handleRemoveClick(i)}>
                    Remove
                  </Button>
                )}
                {inputList.length - 1 === i && (
                  <Button className="my-2 ml-2" onClick={handleAddClick}>
                    Add
                  </Button>
                )}
              </div>
            </div>
          );
        })}
        <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
      </Dialog>
      <div className="my-2">
        <Checkbox
          inputId="cb1"
          onChange={(e) => {
            props.setItems((prevValue) => {
              const temp = [...prevValue];
              temp[props.index].required = !temp[props.index].required;
              return temp;
            });
          }}
          checked={props.isRequired}
        ></Checkbox>
        <label htmlFor="cb1" className="p-checkbox-label">
          isRequired
        </label>
      </div>
    </div>
  );
};

// const CalendarComponent = (props) => {
//   return (
//     <div key={props.index} className="field">
//       <InputText
//         placeholder="label"
//         className="block mb-2"
//         onChange={(e) => {
//           props.setItems((prevValue) => {
//             prevValue[props.index].label = e.target.value;
//             return prevValue;
//           });
//         }}
//       />

//       <Calendar disabled placeholder="value" />
//     </div>
//   );
// };

function FormBuilderCreate() {
  const [items, setItems] = useState([]);
  const [formName, setFormName] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="grid">
        <div className="col-3">
          <div>
            <Button
              className="mt-5"
              onClick={() => {
                setItems([
                  ...items,
                  {
                    type: "input",
                    label: "",
                    rules:{required: false},
                  },
                ]);
              }}
            >
              Input
            </Button>
          </div>
          <div>
            <Button
              className="mt-4"
              onClick={() => {
                setItems([
                  ...items,
                  {
                    type: "textarea",
                    label: "",
                    required: false,
                  },
                ]);
              }}
            >
              Text Area
            </Button>
          </div>
          <div>
            <Button
              className="mt-4"
              onClick={() => {
                setItems([
                  ...items,
                  {
                    type: "dropdown",
                    label: "",
                    required: false,
                    options: [],
                  },
                ]);
              }}
            >
              Dropdown
            </Button>
          </div>
          {/* <div>
            <Button
              className="mt-4"
              onClick={() => {
                setItems([
                  ...items,
                  {
                    type: "date",
                    label: "",
                    required: false,
                  },
                ]);
              }}
            >
              Date
            </Button>
          </div> */}
        </div>

        <div className="col-9">
          <div className="field">
            <label className="block">Form Name</label>
            <InputText
              style={{ width: "50%" }}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>
          {items.map((item, index) => {
            if (item.type === "input") {
              return (
                <InputComponent
                  key={index}
                  index={index}
                  setItems={setItems}
                  item={item}
                  items={items}
                  isRequired={item.required}
                />
              );
            } else if (item.type === "textarea") {
              return (
                <InputTextareaComponent
                  key={index}
                  index={index}
                  setItems={setItems}
                  item={item}
                  items={items}
                  isRequired={item.required}
                />
              );
              // } else if (item.type === "date") {
              //   return <CalendarComponent index={index} setItems={setItems} />;
            } else if (item.type === "dropdown") {
              return (
                <DropDownComponent
                  key={index}
                  index={index}
                  setItems={setItems}
                  item={item}
                  items={items}
                  isRequired={item.required}
                />
              );
            }
          })}

          <Button
            onClick={() => {
              const data = {
                name: formName,
                items: items,
              };
              FormBuilderService.create(data).then((res) => {
                navigate("/formbuilder");
              });
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}

export default FormBuilderCreate;
