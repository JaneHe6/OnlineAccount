import React, { Component } from 'react';
import logo from '../logo.svg';

import {LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth, padLeft} from '../utility';
import PriceList from '../components/PriceList';
import TotalPrice from '../components/TotalPrice';
import ViewTab from '../components/ViewTab';
import MonthPicker from '../components/MonthPicker';
import CreateBtn from '../components/CreateBtn';
const items = [
  {
    "id":1,
    "title":"外出旅游",
    "price":200,
    "date":"2018-01-01",
    "cid":1
  },
  {
    "id":2,
    "title":"外出旅游",
    "price":3000,
    "date":"2018-02-01",
    "cid":2
  }
]
const categoies = {
    "1":{
        "id":"1",
        "name":"旅行",
        "type":"outcome",
        "iconName":"ios-plane"
    },
    "2":{
        "id":"2",
        "name":"旅行",
        "type":"outcome",
        "iconName":"ios-plane"
    },
    "3":{
        "id":"3",
        "name":"旅行",
        "type":"income",
        "iconName":"logo-yen"
    }
}

const newItem = {
    "id":4,
    "title":"新添加的项目",
    "price":300,
    "date":"2019-01-01",
    "cid":3
}

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            items,
            currentDate: parseToYearAndMonth(),
            tabView: LIST_VIEW
        }
        // console.log(items);
    }

    changView = (view)=>{
        this.setState({
            tabView: view
        })
    }

    changeDate = (year,month)=>{
        this.setState({
            currentDate:{year,month}
        })
    }

    modifyItem = (modifiedItem)=>{
        const modifiedItems = this.state.items.map(item => {
            if(item.id === modifiedItem.id){
                // 当符合条件时，更新标题，用title覆盖展开后的效果
                return{...item, title:'更新标题'}
            }else{
                return item
            }
        })
        this.setState({
            items: modifiedItems
        })
    }

    createItem = ()=>{
        this.setState({
            // 将newItem赋到原来的items中
            items: [newItem,...this.state.items]
        })
    }
    
    deleteItem = (deletedItem)=>{
        const filteredItems = this.state.items.filter(item => item.id !== deletedItem.id);
        this.setState({
            items: filteredItems
        })
    }

    render(){
        const { items, currentDate, tabView } = this.state;
        console.log(items);
        const itemsWithCategory = items.map(item => {
            item.category = categoies[item.cid]
            return item
        }).filter(item => {
            // 筛选出选择月份的信息
            return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
        })
        let totalIncome = 0,totalOutcome = 0;
        itemsWithCategory.forEach(item => {
            if(item.category.type === TYPE_OUTCOME){
                totalOutcome += item.price
            }else{
                totalIncome += item.price
            }
        })
        return(
            <React.Fragment>
                <header className="App-header">
                    <div className="row mb-5">
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <div className="row">
                        <div className="col" style={{width:300}}>
                            <MonthPicker 
                                year={currentDate.year}
                                month={currentDate.month}
                                onChange = {this.changeDate}
                            />
                        </div>
                        <div className="col" style={{width:300}}>
                            <TotalPrice 
                                income={totalIncome}
                                outcome={totalOutcome}
                            />
                        </div>
                    </div>
                </header>
                <div className="content-area py-3 px-3">
                    <ViewTab 
                        activeTab={tabView}
                        onTabChange={this.changView}
                    />
                    <CreateBtn 
                        onClick={this.createItem}
                    />
                    {
                        tabView === LIST_VIEW &&
                        <PriceList 
                            items={itemsWithCategory}
                            onModifyItem={this.modifyItem}
                            onDeleteItem={this.deleteItem}
                        />
                    }
                    {
                        tabView === CHART_VIEW &&
                        <h1>图表区域</h1>
                    }
                </div>
            </React.Fragment>
        )
    }
}
export default Home;