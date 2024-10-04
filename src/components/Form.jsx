import { useEffect, useState } from "react";
import { postData, updatedPostData } from "../api/PostApi";

export const Form = ({ data, setData, updataData, setUpdataData}) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  useEffect(()=>{
      updataData && setAddData({
        title : updataData.title  || "" ,
        body : updataData.body|| "" ,
      });
  },[updataData])

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await postData(addData);
    console.log("res", res);

    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  const updatePost= async ()=>{
    const res = await updatedPostData(updataData.id , addData)
    console.log(res)
    
    if(res.status == 200){
      setData((prev)=>{
        return prev.map((curData)=>{
            return curData.id === res.data.id ? res.data : curData;
        })
    })
    setAddData({body:"" , title:""})
    setUpdataData({})
    }
  }

  let isEmpty= Object.keys(updataData).length === 0;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if(action === "Add"){
      addPostData();
    }
    else if(action === "Edit"){
        updatePost();
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Add Post"
          id="body"
          name="body"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add" : "Edit"}</button>
    </form>
  );
};