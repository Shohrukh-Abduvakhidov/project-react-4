import React, { useState, useEffect } from "react";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import car from "./assets/DSC_5903.webp"
import "@ant-design/icons"
import { DeleteFilled } from "@ant-design/icons";

const Api = "https://6788f5c12c874e66b7d708f0.mockapi.io/users";

const App = () => {
  const [data, setData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [click, setClick] = useState(false);

  async function  get() {
    try {
      const {data} = await axios.get(Api)
      setData(data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (trigger) {
      get()
    }
    return () => setTrigger(true);
  }, [trigger, click]);

  async function deleteUSer(id)
  {
    await axios.delete(`${Api}/${id}`)
    get() 
  }
  return (
    data.map((item) => (
      <Card key={item.id} sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={car} title="green iguana" />
        <Typography>{item.id}</Typography>
        <CardContent>
          <Button onClick={() => setClick(prev => !prev)}>Click</Button>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {item.desc}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
          <DeleteFilled  color="red" onClick={() => deleteUSer(item.id)}/>
        </CardActions>
      </Card>
    ))
  );
};

export default App;