import React, { Component } from "react";
import * as Service from '../../services/tag.service'
import Paper from "@material-ui/core/Paper";
import { Button, ButtonGroup } from 'reactstrap';
import DataGrid, { Column } from 'devextreme-react/data-grid';

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

    renderGridCell(cellData) {
      return (<div><img src={cellData.value}></img></div>);
    }

   renderGridAction(cellData)
   {
     return(
      <ButtonGroup>
        {/* <UpdatePop></UpdatePop> */}
        <Button size="sm" color="danger" onClick={() => {Service.deleteTag(cellData.data.Id)}}>Delete</Button>
      </ButtonGroup>
    )
   }
    componentDidMount()
    {
        this.setState({isLoading: true});

        Service.getTags().then((res) => 
        {
            console.log(`resultat de la request :${res}`);
            console.log(res);
            let row = []
            res.map(Data => 
            {
              
              console.log(`LAAAAAAAAAAAAAAAA ${typeof Data.box[0].minX}`)
              row.push(
                {
                  Id : Data.tag_id, 
                  Tag : Data.name,
                  Score: (Math.round(Data.score * 100) / 100).toFixed(2), 
                  minX : (Math.round(Data.box[0].minX * 100) / 100).toFixed(2), 
                  minY : (Math.round(Data.box[0].minY * 100) / 100).toFixed(2), 
                  maxX : (Math.round(Data.box[0].maxX * 100) / 100).toFixed(2), 
                  maxY : (Math.round(Data.box[0].maxY * 100) / 100).toFixed(2), 
                  Img: Data.image
                })
              console.log("row")
              console.log(row)
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
                <div className="paper-table">
                  <DataGrid
                    dataSource={this.state.rows}
                    showColumnLines={showColumnLines}
                    showRowLines={showRowLines}
                    showBorders={showBorders}
                    rowAlternationEnabled={rowAlternationEnabled}>

                    <Column dataField="Id" width={50}/>
                    <Column dataField="Tag" width={260}/>
                    <Column dataField="Score" width={130}/>
                    <Column dataField="minX"width={130}/>
                    <Column dataField="minY"width={130}/>
                    <Column dataField="maxX"width={130}/>
                    <Column dataField="maxY"width={130}/>
                    <Column dataField="Img" width={200} cellRender={this.renderGridCell} />
                    <Column dataField="Action" width={260} cellRender={this.renderGridAction}/>
                  </DataGrid>
                </div>
              </Paper>

            <Navbar></Navbar>

          </header>
        )
    }
}

export default GestionTag 