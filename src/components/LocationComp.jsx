function SelectALocation() {

    const[selectedLocation, setSelectedLocation] = useState("Berlin");
  
    return (
      <div>
          <label>Select a location: </label>
          <select 
          value ={selectedLocation} 
          defaultValue="Berlin"
          onChange={e => setSelectedLocation(e.target.value)}>
            <option value="Berlin">Berlin</option>
            <option value="London">London</option>
             {/* {locations.map((location, index) => (Options({ location })))} */}
          </select>
          {/* <button onClick={handleSubmit(selectedLocation)}>Submit</button> */}
      </div>
    );
  }
  
  
  
  export function SelectLocationComp() {
    return (
      <>
      <div>
        <p>Choose a location</p>
          <SelectALocation />
      </div>
      </>
    );
  }