import React, {Component} from "react";
// import {importFiles} from "../../app/src/js/script";
import XLSX from "xlsx";
import {make_cols} from "../scripts/excelReader/MakeColumns";
import {SheetJSFT} from "../scripts/excelReader/types";
import styled from "styled-components";
import plus from '../../css/images/plus.svg';
import {GraphProperties} from "../../graphs/GraphProperties";
import {NodeAttributesNames} from "../../graphs/GraphProperties";
import {EdgeAttributesNames} from "../../graphs/GraphProperties";
import {ProjectProperties} from "../../graphs/ProjectProperties";
import * as dataBaseManagement from "../../graphs/dataBaseManagement";
import {parseRawDataToBankTransactionTemple} from "../../graphs/standard/graphForBankTransaction";


const NodeContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    width:100%;
`;

const NodeComposer = styled.div`
    display:flex;
    flex-direction:column;
    border: 1px solid grey;
    padding:15px;
    width:80%;
    margin:50px;
`;

const Add = styled.button`
    border:none;
    background-color:transparent;
    
    & > img{
        width:20px;
    }
`;
const Title = styled.p`

`;

const Label = styled.div`
    display:flex;
    justify-content: space-between;
    padding:25px 0 15px;
    border-bottom: 1px solid grey;
`;
const Connector = styled.div`
    display:flex;
    justify-content: space-between;    
    padding:25px 0 15px;
    margin-bottom:15px;

`;

const NewNodeButton = styled.button`
    
    width:30%;
    margin: 30px auto;  
    padding: 5px 10px;
    border:none;
    background-color: green;

`;

const CheckButton = styled.button`
    width:30%;
    margin: 30px auto;  
    border:none;
    padding:10px 10px;
    background-color: green;

`;

const OptionsContainer = styled.div`
  position:absolute;
  top:50%;
  left:50%;
  padding:20px;
  border: 1px solid grey;
  transform: translate(-50%,-50%);
  z-index: 100;
  background-color:white;
`;


const Item = styled.div`
padding:5px;
& label > input{ margin-right: 5px;}
`;

class Properties extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            data: [],
            cols: [],
            value:'Nie wybrano żadnego pliku',
            nodes: [
                {
                    id: '',
                    name: '',
                    properties:[],
                    edgeLabel:'',
                    edgeFrom: '',
                    edgeTo: ''
                },{
                    id: '',
                    name: '',
                    properties:[]
                }
            ],
            nodeNr: 0,
            activeNode: 0,
            active : '',
            type: '',
            optionsHidden : true,
            selectedOption: null

                // { // node structure
                //     id: '',
                //     name: '',
                //     properties:''
                // }
            //]
        };
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderNewNode = this.renderNewNode.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        const files = e.target.files;
        if (files && files[0]) this.setState({ file: files[0], value: files[0].name }, () => this.handleFile());
    };

    handleFile() {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;

        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);
            /* Update state */
            this.setState({ data: data, cols: make_cols(ws)});
        };

        if (rABS) {
            reader.readAsBinaryString(this.state.file);
        } else {
            reader.readAsArrayBuffer(this.state.file);
        }
    };

    handleSubmit(){
        const n = this.state.nodes;
        switch(this.state.active){
            case 'Id':{
                n[this.state.activeNode].id = this.state.cols[this.state.selectedOption].name;
                break;
            }
            case 'Name':{
                n[this.state.activeNode].name = this.state.cols[this.state.selectedOption].name;
                break;
            }
            case 'Info':{
                n[this.state.activeNode].properties.push(this.state.cols[this.state.selectedOption].name);
                break;
            }
            case 'Edge label': {
                n[0].edgeLabel = this.state.cols[this.state.selectedOption].name;
                break;
            }
            case 'Edge label from': {
                n[0].edgeFrom = this.state.cols[this.state.selectedOption].name;
                break;
            }
            case 'Edge label to': {
                n[0].edgeTo = this.state.cols[this.state.selectedOption].name;
                break;
            }
            default : return null;
        }
        this.setState({
            nodes: n,
            optionsHidden: true,
            activeNode: 0,
            active: '',
            selectedOption: null
        })
    }

    handleSaveNodes = () => {
        dataBaseManagement.addRawDataToDataBase(this.props.db.getDataCollectionWithRowData(),this.state.data);

        let graphP = new GraphProperties(new NodeAttributesNames(this.state.nodes[0].id, this.state.nodes[0].name, this.state.nodes[0].properties),
            new NodeAttributesNames(this.state.nodes[1].id, this.state.nodes[1].name,this.state.nodes[1].properties),
            new EdgeAttributesNames(this.state.nodes[0].edgeLabel,[this.state.nodes[0].edgeFrom,this.state.nodes[0].edgeTo]));

        parseRawDataToBankTransactionTemple(this.props.db, graphP);
        let nodes = this.props.db.getCollectionForNodesData();
        console.log(nodes.find());
    };

    renderOptions = () => {
       return(
           <OptionsContainer>
               <Title>{this.state.active}</Title>
               <form>
                   {this.state.cols.map(item => {
                       return (
                           <Item>
                           <label>
                               <input
                                   type={this.state.type}
                                   name="header-options"
                                   value={item.key}
                                   checked={this.state.selectedOption === item.key}
                                   onChange={() => this.setState({selectedOption: item.key})}
                               />
                               {item.name}
                           </label>
                       </Item>
                       )
                   })}
               </form>
               <button id="save" className="next" onClick={this.handleSubmit}>Save</button>
           </OptionsContainer>
       )
    };

    renderNewNode(nr){
        return(
                <NodeComposer>
                    <Title>{`Node${nr}`}</Title>
                    <Label>
                        Id: {this.state.nodes[nr].id}
                        <Add onClick={() => {
                            this.setState({optionsHidden: false, activeNode: nr,  active: 'Id',type: 'radio'});
                        }}><img src={plus}/></Add>
                    </Label>
                    <Label>
                        Name: {this.state.nodes[nr].name}
                        <Add onClick={() => {
                            this.setState({optionsHidden: false,activeNode: nr, active: 'Name', type: 'radio'});
                        }}><img src={plus}/></Add>
                    </Label>
                    <Connector>
                        Info: {this.state.nodes[nr].properties.toString()}
                        <Add onClick={() => {
                            this.setState({optionsHidden: false,activeNode: nr, active: 'Info', type: 'checkBox'});
                        }}><img src={plus}/></Add>
                    </Connector>
                </NodeComposer>
        );
    }

    render () {
        return (
            <div>
                <div className="propertiesWrapper">
                    <div className="form" id="form">
                        <div id="fileName" className="textField">{this.state.value}</div>
                        <input id="fileInput" type="file" accept={SheetJSFT} onChange={this.handleChange}/>
                        <label className="fileInput" htmlFor="fileInput">Wybierz plik</label>
                    </div>
                    <NodeContainer>
                        {this.renderNewNode(this.state.nodeNr )}
                        {this.renderNewNode(this.state.nodeNr + 1)}
                    </NodeContainer>
                    <NodeComposer edge>
                        <Label>
                            Edge label:
                            {this.state.nodes[0].edgeLabel}
                            <Add onClick={() => {
                                this.setState({optionsHidden: false, active: 'Edge label', type: 'radio'});
                            }}><img src={plus}/></Add>
                        </Label>
                        <Connector>
                            Connector:
                            <NodeComposer edge>
                                <Label>
                                    Node 1 value:
                            {this.state.nodes[0].edgeFrom}
                            <Add onClick={() => {
                                this.setState({optionsHidden: false, active: 'Edge label from', type: 'radio'})
                            }}><img src={plus}/> </Add>
                                </Label>
                                <Connector>
                                    Node 2 value:
                            {this.state.nodes[0].edgeTo}
                            <Add onClick={() => {
                                this.setState({optionsHidden: false, active: 'Edge label to', type: 'radio'})
                            }}><img src={plus}/></Add>
                                </Connector>
                            </NodeComposer>

                        </Connector>Check values where value from Node1 equals value in Node2
                    </NodeComposer>

                    {/*<NewNodeButton onClick={() => {*/}
                        {/*this.setState({nodes: this.state.nodes + 1});*/}
                    {/*}}>*/}
                        {/*Add new node*/}
                    {/*</NewNodeButton>*/}

                    {!this.state.optionsHidden && this.renderOptions()}


                    <CheckButton>Check result</CheckButton>
                    <button onClick={this.handleSaveNodes}>Save</button>
                </div>
            </div>
        );
    }
}

export default Properties;