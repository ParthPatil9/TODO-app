import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Typography, TextField, Button, CircularProgress, Card } from "@mui/material";
import axios from "axios";

function EditTodo() {
    const { todoId } = useParams();
    const [todo, setTodo] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/todos/" + todoId, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setTodo(res.data.todo)
        })
    }, [])


    if (!todo) {
        return <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 100,
            height : "100vw"
        }}>
            <CircularProgress />
        </div>
    } else {

        return <div style={{
            height : "100vw"
        }}>
            <div style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <UpdateTodo todo={todo} setTodo={setTodo} />
        </div>
        </div>
        
    }

}

function UpdateTodo({ todo, setTodo }) {
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);

    return <div style={{
        display: "flex",
        justifyContent: "center"
    }}>
        <Card variant="outlined" style={{ width: 400, padding: 20, margin: 5 }}>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant="h6">Edit Todo below</Typography>
            </div>
            <TextField variant="outlined"
                label="title"
                value={title}
                fullWidth={true}
                style={{
                    marginBottom: 10
                }}
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />

            <TextField variant="outlined"
                label="description"
                value={description}
                fullWidth={true}
                style={{
                    marginBottom: 10
                }}
                onChange={(e) => {
                    setDescription(e.target.value);
                }}
            />

            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Button variant="contained" onClick={async () => {
                    try {
                        const res = await axios.put("http://localhost:3000/edit-todos/" + todo._id, {
                            title: title,
                            description: description
                        }, {
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        })
                        setTodo(res.data.todo);
                        window.alert(res.data.message);
                    } catch (e) {
                        window.alert(e.response.data.message)
                    }

                }}>Save</Button>
            </div>

        </Card>
    </div>
}
export default EditTodo;