import React, { Component } from "react";
import { Button } from 'reactstrap';
import {Popup} from 'reactjs-popup';
import * as dataRequest from "../../services/data.request";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import 'reactjs-popup/dist/index.css';
import '../css/pages/popup.page.css'

export default class popCreate extends Component 
{  

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = 
        {
            userId: '',
            montreId: '',
            activite : '',
            accelero : [],
            Tag : ''

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) 
      {
        if(event.target.files)
          {
            let file
            const This = this
            var reader = new FileReader();
            reader.onload = function(e) 
            {  
                file = e.target.result
                file = JSON.parse(file)
                This.setState(
                {
                    [event.target.name]: file.accelero
                }); 
            }
            reader.readAsText(event.target.files[0])
            
          }else
          {
            this.setState(
            {
                [event.target.name]: event.target.value
            }); 
           } 
      }

    handleSubmit(event) 
    {
        alert("Nouvelle donnée ajouté");
        console.log(this.state)
        event.preventDefault();
        dataRequest.postData(this.state);
    }

    render()
    {
        
        return(
            <Popup trigger={<Button><FontAwesomeIcon icon={faPlus}/></Button>} modal nested>
            {
               
                close => (
                    <div className="modal">
                        <button className="close" onClick={close}> &times; </button>

                        <div className="header"> Update </div>
                        <div className="content">
                            <form className="formUserUpdate" onSubmit={this.handleSubmit}>
                                <div>
                                    
                                    <label className="labelUserUpdate" for="fname">userId</label>
                                    <input className="inputUserUpdate" name="userId" placeholder="User Id" onChange={this.handleChange}/>
                                </div>

                                <div>
                                    <label className="labelUserUpdate" for="fname">montreId</label>
                                    <input className="inputUserUpdate" name="montreId" placeholder="Montre Id" onChange={this.handleChange}/>
                                </div>

                                <div>
                                    <label className="labelUserUpdate" for="fname">Activité</label>
                                    <input className="inputUserUpdate" name="activite" placeholder="Activité" onChange={this.handleChange}/>
                                </div>

                                <div>
                                    <label className="labelUserUpdate" for="fname">Data</label>
                                    <input type="file" name="accelero" ref={this.fileInput} onChange={this.handleChange}/>
                                </div>

                                <div>
                                    <label className="labelUserUpdate" for="fname">Tag</label>
                                    <input className="inputUserUpdate" name="tag" placeholder="tag" onChange={this.handleChange}/>
                                </div>

                                <div className="submitDivUserUpdate"><input className="submitUserUpdate" type="submit" /></div>
                            </form>
                        </div>
                    </div>
                )
            }
            </Popup>
        )
    }
}