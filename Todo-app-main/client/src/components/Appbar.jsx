import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { Typography, Button } from '@mui/material'

function Appbar() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);

    axios.get("http://localhost:3000/me", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then(res => {
        setEmail(res.data.username);
    });

    if (email) {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
        }}>
            <div style={{ marginLeft: 10 }}>
                <Typography color={'#5FA0E2'} variant={"h6"} fontSize={30}>My Todos</Typography>     
            </div>

            <div >
                <div style={{ marginRight: 10 }}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            localStorage.setItem("token", null);
                            window.location = "/";
                            // navigate("/")
                        }}
                    >Logout</Button>
                </div>
            </div>
        </div>
    } else {
        return <div style={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <div style={{ marginLeft: 10 }}>
                <Typography color={'#5FA0E2'} variant={"h6"} fontSize={30}>My Todos</Typography>                
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: 10 }}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            localStorage.setItem("token", null);
                            // window.location = "/";
                            navigate("/signup")
                        }}
                    >Sign up</Button>
                </div>
                <div>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            localStorage.setItem("token", null);
                            // window.location = "/";
                            navigate("/login");
                        }}
                    >Log in</Button>
                </div>
            </div>
        </div>
    }
}

export default Appbar;