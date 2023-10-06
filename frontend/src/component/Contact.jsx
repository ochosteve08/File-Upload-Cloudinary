import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [files, setFiles] = useState([]);

  const HandleOnChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "name") {
      setName(value);
    } else if (name === "images") {
      setFiles(files);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // Handle File Data from the state Before Sending
      const data = new FormData();

      data.append("name", name);
      Array.from(files).forEach((file) => {
        data.append("images", file);
      });
    

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
      const result = await response.json();
      console.log(result.data.name);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>PROFILE</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="name"></label>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          id="name"
          name="name"
          onChange={HandleOnChange}
        />
        <input type="file" name="images" multiple onChange={HandleOnChange} />
        <br />
        <br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Contact;
