import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FullWidthSection from './FullWidthSection'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Page from '../App'
import SensorData from './SensorData.js'
// import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Griddle from 'griddle-react';


class Sensors extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : props.data
    };
  }
  defaultProps = {
    data: []
  };
  componentWillReceiveProps(nextProps){
    if (nextProps.data) {
      this.setState({data:nextProps.data})
    }
  }
  tableMeta = [
    {
      "columnName": "id",
      "order": 1,
      "displayName": "ID"
    },
    {
      "columnName": "type",
      "order": 2,
      "visible": true,
      "displayName": "Sensor type"
    },
    {
      "columnName": "owner",
      "order": 3,
      "displayName": "Owner"
    },
    {
      "columnName": "last_value",
      "order": 4,
      "visible": true,
      "displayName": "Last Value",
      "customComponent": SensorData
    },
  ]
  render() {
    let {data} = this.props;
    console.log(this.state);
    return (
      <div>
        <h1 className="page-title">Sensors</h1>
        <FullWidthSection useContent={true}>
        <Griddle resultsPerPage={10} results={this.state.data} columnMetadata={this.tableMeta} columns={["id", "type","owner","last_value"]} showFilter={true} />
        {/*          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Type</TableHeaderColumn>
                <TableHeaderColumn>Last Value</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
                    {this.state.data.map((sensor,index )=> {
                      var text = "";
                      for(var i in sensor){
                          if (i!=='id'&&i!='type') {
                            text = text + i + " : " + sensor[i].value+" \n"
                          }
                      }
                      return (
                          <TableRow key={index}>
                            <TableRowColumn>{index}</TableRowColumn>
                            <TableRowColumn>{sensor.id}</TableRowColumn>
                            <TableRowColumn>{sensor.type}</TableRowColumn>

                            <TableRowColumn>{text}</TableRowColumn>
                          </TableRow>
                      )
                    })}
            </TableBody>
          </Table>*/}
        </FullWidthSection>
        </div>
    );
  }
}
function mapStateToProps(state) {
  return { data: state.example.data };
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Sensors);

