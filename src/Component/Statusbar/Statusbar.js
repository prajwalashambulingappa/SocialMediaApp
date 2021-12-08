import React, { Component } from "react";
import "../Statusbar/Statusbar.css";
import Avatar from '@mui/material/Avatar';
import statusimg from "../../images/statusicon.jpg";
import statupload from "../../images/statusupload.jpg";

class Statusbar extends Component{
    constructor(props){
        super(props);
        this.state = { 
            statusList: []
        };
    }

    componentDidMount(){
        this.getData();
    }

    getData=()=>{
        let data=[
            {
                "usernae":"User1",
                "imageURL":"../../images/statusicon.jpg"
            },
            {
                "usernae":"User2",
                "imageURL":"../../images/statusicon.jpg"
            },
            {
                "usernae":"User3",
                "imageURL":"../../images/statusicon.jpg"
            },
            {
                "usernae":"User4",
                "imageURL":"../../images/statusicon.jpg"
            },
            {
                "usernae":"User5",
                "imageURL":"../../images/statusicon.jpg"
            },
            {
                "usernae":"User6",
                "imageURL":"../../images/statusicon.jpg"
            },
            {
                "usernae":"User7",
                "imageURL":"../../images/statusicon.jpg"
            },
            {
                "usernae":"User8",
                "imageURL":"../../images/statusicon.jpg"
            },
            {
                "usernae":"User9",
                "imageURL":"../../images/statusicon.jpg"
            },
            {
                "usernae":"User10",
                "imageURL":"../../images/statusicon.jpg"
            },
            {
                "usernae":"User11",
                "imageURL":"../../images/statusicon.jpg"
            }
        ]
        this.setState({statusList: data});
    }

    render(){
        return ( 
            <div>
                <div className="statusbar_container">
                    <div>
                        <img src={statupload} className="statusbar_upload" width="70rem" height="70rem" alt="statusupload" />
                    </div>
                    
                    {
                        this.state.statusList.map((item, index)=>(
                            <div key={item.usernae} className="status">
                            <Avatar className="statusbar_status" src={statusimg} alt="status" />
                            <div className="statusbar_text"> {item.usernae} </div>
                    </div>
                        ))
                    }          
                </div> 
            </div>
        );
    }
}

export default Statusbar;