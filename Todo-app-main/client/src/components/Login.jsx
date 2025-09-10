import { Typography, Card, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div style={{
        height : "100vw"
    }}>
        <Typography variant="h6" style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 150,
            marginBottom: 5
        }}>
            Welcome to My Todos App. Log in below
        </Typography>
        <div style={{
            display: "flex",
            justifyContent: "center",
        }}>
            <Card variant="outlined" style={{
                width: 400,
                padding: 40,
            }}>
                <TextField
                    fullWidth={true}
                    variant="outlined"
                    label="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}>

                </TextField>
                <TextField
                    fullWidth={true}
                    variant="outlined"
                    label="password"
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    style={{
                        marginTop: 15
                    }}>
                </TextField>
                <Button size={"large"}
                    variant="contained"
                    fullWidth={true}
                    style={{
                        marginTop: 15
                    }}
                    onClick={async () => {
                        try {
                            const res = await axios.post("http://localhost:3000/login", JSON.stringify({
                                username: email,
                                password: password
                            }), {
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            });
                            window.alert(res.data.message);
                            localStorage.setItem("token", res.data.token);
                            navigate("/todos");
                        } catch (e) {
                            window.alert(e.response.data.message)
                        }
                    }}>
                    Login
                </Button>
            </Card>
        </div>
    </div>
}

export default Login;