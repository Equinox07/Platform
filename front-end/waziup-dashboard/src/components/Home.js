import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FullWidthSection from './FullWidthSection'
import Page from '../App'

class Home extends Component {
  render() {
    return (
      <div>
        <h1 className="page-title">Dashboard</h1>
        <FullWidthSection useContent={true}></FullWidthSection>
      </div>
      );
  }
}

export default Home;

