import React, { Component } from "react";
import * as Service from '../../services/user.service'
import Paper from "@material-ui/core/Paper";
import { Button, ButtonGroup } from 'reactstrap';
import DataGrid, { Column, Pager, Paging } from 'devextreme-react/data-grid';

import Navbar from "./components/navbar";
import "../css/core.css";
import "../css/input.css";
import "../css/pages/gestionTag.css"

class GestionTag extends Component
{
    constructor(props)
    {
        super(props)
        this.state =
        {
            isLoading: true,
            rows: [],
            showColumnLines: true,
            showRowLines: true,
            showBorders: true,
            rowAlternationEnabled: true
        };
    }


   renderGridAction(cellData)
   {
     return(
      <ButtonGroup>
        {/* <UpdatePop></UpdatePop> */}
        <Button size="sm" color="danger" onClick={() => {Service.deleteUser(cellData.data.Id)}}>Delete</Button>
      </ButtonGroup>
    )
   }


    componentDidMount()
    {
        this.setState({isLoading: true});

        Service.getUsers().then((res) => 
        {
            console.log(`resultat de la request :${res}`);
            console.log(res);
            let row = []
            res.map(Data => 
            {
              row.push(
                {
                  Id : Data.tag_id, 
                  Email : Data.email,
                  Password: Data.password,
                  Admin: Data.admin
                })
            });
            this.setState({data : res, isLoading: false, rows : row})
        });
    }

    render()
    {
        const {isLoading,  showColumnLines, showRowLines, showBorders, rowAlternationEnabled} = this.state
        if(isLoading) 
        {
            return <p>Loading .....</p>
        }

        return(
            <header className="body">

              <Paper elevation={3} className="paper">
                  <DataGrid
                    dataSource={this.state.rows}
                    showColumnLines={showColumnLines}
                    showRowLines={showRowLines}
                    showBorders={showBorders}
                    rowAlternationEnabled={rowAlternationEnabled}>

                    <Paging defaultPageSize={5} />
                    <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} showInfo={true} />

                    <Column dataField="Id" width={50}/>
                    <Column dataField="Email" width={350}/>
                    <Column dataField="Password" width={750}/>
                    <Column dataField="Action" width={260} cellRender={this.renderGridAction}/>
                  </DataGrid>
              </Paper>

            <Navbar></Navbar>

          </header>
        )
    }
}

export default GestionTag 