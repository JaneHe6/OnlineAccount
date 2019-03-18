import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LIST_VIEW, CHART_VIEW} from './utility';
import PriceList from './components/PriceList';
import TotalPrice from './components/TotalPrice';
import ViewTab from './components/ViewTab';
import MonthPicker from './components/MonthPicker';
const items = [
  {
    "id":1,
    "title":"外出旅游",
    "price":200,
    "date":"2000-01-01",
    "category":{
      "id":"1",
      "name":"旅行",
      "type":"outcome",
      "iconName":"ios-plane"
    }
  },
  {
    "id":2,
    "title":"外出旅游",
    "price":3000,
    "date":"2000-01-01",
    "category":{
      "id":"1",
      "name":"旅行",
      "type":"outcome",
      "iconName":"ios-plane"
    }
  }
]
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        {/* <PriceList 
          items={items}
          onModifyItem={(item)=>{alert(item.id)}}
          onDeleteItem={(item)=>{alert(item.id)}}
        /> */}
        {/* <ViewTab 
          activeTab={LIST_VIEW}
          onTabChange={(view)=>{console.log(view)}}
        /> */}
        {/* <TotalPrice 
          income={1000}
          outcome={300}
        /> */}
        <MonthPicker 
          year={2010}
          month={3}
        />
      </div>
    );
  }
}

export default App;
