import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Typography, Grid, Button } from "@mui/material";
import axios from "axios";

function Landing() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/me", {
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem('token'),
            }
        }).then(res => {
            setEmail(res.data.username);
        })
    }, [])

    if(!email){
        return <div style={{
            height : "100vw"
        }}>
        <Grid container style={{ padding: '5vw' }}>
            <Grid item xs={12} md={6} lg={6}>
                <div>
                    <Typography variant={"h2"} >
                        Boost your productivity via our app Fast. Seriously.
                    </Typography>
                    <Button style={{
                        margin : 10,
                    }}
                        size={"large"}
                        variant={"contained"}
                        onClick={() => {
                            navigate("/signup")
                        }}
                    >Signup</Button>
                    <Button
                        size={"large"}
                        variant={"contained"}
                        onClick={() => {
                            navigate("/login")
                        }}
                    >Log in</Button>
                </div>
            </Grid>
            <Grid item xs={12} md={6} lg={6} >
                <img style={{
                margin : 5 
            }} src={"https://classplusapp.com/growth/wp-content/uploads/2022/06/How-to-sell-courses-through-social-media-1-1024x571.jpg"} width={"100%"} />
            </Grid>
        </Grid>
    </div>
    }else{
        navigate("/todos");
    }
}

export default Landing;