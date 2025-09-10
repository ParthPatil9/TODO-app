import {Button, TextField, Card, Typography} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Signup(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div style={{
        height : "100vw"
    }}>
        <Typography variant={"h6"} style={{
            display :'flex',
            justifyContent : 'center',
            marginTop : 150,
            marginBottom : 5
        }}>
                Welcome to My Todos App. Sign up below
        </Typography>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card variant={"outlined"} style={{ width: 400, padding : 40 }}>
                <TextField
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    fullWidth={true}    
                    label="Email"
                    variant="outlined"
                    
                />
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type={"password"}
                    style={{
                        marginTop:15    
                    }}
                />

                <Button
                    size={"large"}
                    fullWidth={true}
                    variant="contained"
                    style={{
                        marginTop:15
                    }}
                    onClick={async () => {
                        try {
                            const response = await axios.post("http://localhost:3000/signup", JSON.stringify({
                                username: email,
                                password: password
                            }), {
                                headers: {
                                    "Content-type": "application/json"
                                }
                            })
                            window.alert(response.data.message);
                            localStorage.setItem("token", response.data.token);
                            navigate("/todos");
                        } catch (e) {
                            window.alert(e.response.data.message)
                        }
                    }}

                > Signup</Button>
            </Card>
        </div>
    </div>
}
export default Signup;

