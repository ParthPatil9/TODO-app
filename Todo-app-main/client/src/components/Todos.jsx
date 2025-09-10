import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

function Todos() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    
    axios.get("http://localhost:3000/todos", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then(res => {
        setTodos(res.data.todos);
    })
    console.log(todos)
    return <div style={{
        height : "100vw"
    }}>
        <div>
            <Typography variant="h5" style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 5
            }}>Add a Todo below</Typography>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Card variant={"outlined"} style={{ width: 400, padding: 20 }}>
                    <TextField
                        fullWidth={true}
                        label="Title"
                        variant="outlined"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}>
                    </TextField>

                    <TextField
                        fullWidth={true}
                        label="Description"
                        variant="outlined"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        style={{
                            marginTop: 10
                        }}>
                    </TextField>
                    <Button variant="contained"
                        fullWidth={true}
                        style={{
                            marginTop: 10
                        }}
                        onClick={async() => {
                            try {
                                const res = await axios.post("http://localhost:3000/todo", {
                                    title: title,
                                    description: description
                                }, {
                                    headers: {
                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                    }
                                })
                                window.alert(res.data.message);
                            } catch (e) {
                                window.alert(e.response.data.message)
                            }
                        }}>
                        Add Todo
                    </Button>
                </Card>
            </div>
        </div>

        <Typography variant="h5" style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 50
        }}>Your Todos</Typography>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {todos.map(todo => {
                return <Todo todo={todo}></Todo>
            })} 
        </div>
    </div>
}

function Todo({ todo }) {
    const navigate = useNavigate();
    return <Card variant="outlined" style={{ width: 400, padding: 20, margin: 10 }}>
        <div style={{
            display: "flex",
            justifyContent: "space-between"
        }}>
            <div>
                <Typography variant="h6">{todo.title}</Typography>
                <Typography variant="subtitle1">{todo.description}</Typography>
            </div>
            <DeleteIcon variant="filled" onClick={async () => {
                try {
                    const res = await axios.delete("http://localhost:3000/todo/" + todo._id, {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    window.alert(res.data.message);
                } catch (e) {
                    window.alert(e.response.data.message);
                }
            }}> </DeleteIcon>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
            <Button variant="contained" size="large" style={{height : 30}}  onClick={() => {
                navigate("/todos/" + todo._id);
            }}>Edit</Button>
        </div>
    </Card>
}

export default Todos;