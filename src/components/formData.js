import React, { useState } from "react";
import Select from "react-select";
import "./formData.css";
import { sectorsOptions } from "./sectorsOptions";

const MyFormData = () => {
  const [name, setName] = useState("");
  const [sectors, setSectors] = useState([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSectorsChange = (selectedOptions) => {
    setSectors(selectedOptions);
  };

  const handleTermsChange = (event) => {
    setAgreeTerms(event.target.checked);
  };

  const handleSave = () => {
    if (name.trim() === "" || sectors.length === 0 || !agreeTerms) {
      alert("Please fill in all fields");
      return;
    }

    const newData = {
      name: name.trim(),
      sectors: sectors.map((sector) => sector.value),
      agreeTerms
    };

    if (editMode) {
      // Edit existing data
      setSavedData((prevData) => {
        const updatedData = [...prevData];
        updatedData[editIndex] = newData;
        return updatedData;
      });
      setEditMode(false);
      setEditIndex(null);
    } else {
      // Add new data
      setSavedData((prevData) => [...prevData, newData]);
    }

    // Reset form fields
    setName("");
    setSectors([]);
    setAgreeTerms(false);
  };

  const handleEdit = (index) => {
    const dataToEdit = savedData[index];
    setName(dataToEdit.name);
    setSectors(
      sectorsOptions.filter((option) =>
        dataToEdit.sectors.includes(option.value)
      )
    );
    setAgreeTerms(dataToEdit.agreeTerms);
    setEditMode(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setSavedData((prevData) => {
      const updatedData = [...prevData];
      updatedData.splice(index, 1);
      return updatedData;
    });
  };

  return (
    <div className="container my-form">
  <h2>Please enter your name and pick the Sectors you are currently involved in.</h2>
  <div className="form-row">
    <label htmlFor="name" className="col-md-2 col-form-label">Name:</label>
    <div className="col-md-10">
      <input type="text" className="form-control" id="name" value={name} onChange={handleNameChange} />
    </div>
  </div>
  <div className="form-row">
    <label htmlFor="sectors" className="col-md-2 col-form-label">Sectors:</label>
    <div className="col-md-10">
      <Select
        id="sectors"
        options={sectorsOptions}
        isMulti
        value={sectors}
        onChange={handleSectorsChange}
      />
    </div>
  </div>
  <div className="form-row">
    <div className="col-md-10 ">
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="agreeTerms"
          checked={agreeTerms}
          onChange={handleTermsChange}
        />
        <label className="form-check-label" htmlFor="agreeTerms">
          Agree to terms
        </label>
      </div>
    </div>
  </div>
  <button className="btn btn-primary" onClick={handleSave}>{editMode ? "Update" : "Save"}</button>

  <h3>Saved Data</h3>
  <div className="data-table">
    {savedData.length === 0 ? (
      <p>No data available</p>
    ) : (
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Sectors</th>
            <th>Agreed to terms</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {savedData.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>
                <ul className="list-styled">
                  {data.sectors.map((sector, index) => (
                    <li key={index}>{sector}</li>
                  ))}
                </ul>
              </td>
              <td>{data.agreeTerms ? "Yes" : "No"}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(index)}>Edit</button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>

  );
};

export default MyFormData;
