import React from 'react';
import PropTypes from 'prop-types';
import {padLeft, range} from '../utility';
export default class MonthPicker extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isOpen:false,
            selectedYear:this.props.year,
            selectedMonth:this.props.month
        }
    }

    toggleDropdown = (event)=>{
        event.preventDefault()
        this.setState({
            isOpen:!this.state.isOpen
        })
    }

    selectYear = (event,yearNumber)=>{
        event.preventDefault();
        this.setState({
            selectedYear:yearNumber
        })
    }

    selectMonth = (event,monthNumber)=>{
        event.preventDefault();
        this.setState({
            // selectedMonth:monthNumber,
            isOpen:false
        })
        this.props.onChange(this.state.selectedYear,monthNumber)
    }

    render(){
        const {year,month} = this.props;
        const {isOpen} = this.state;
        const {selectedYear,selectedMonth} = this.state;
        const monthRange = range(12,1);
        const yearRange = range(9,-4).map(number=>number + year);
        return(
            <div className="dropdown month-picker-component">
                <h4>选择月份</h4>
                <button 
                    className="btn btn-lg btn-secondary dropdown-toggle"
                    onClick={this.toggleDropdown}
                >
                    {`${year}年 ${padLeft(month)}月`}
                </button>
                { isOpen &&
                  <div className="dropdown-menu" style={{display:'block'}}>
                  {/* 如何给年和月相同逻辑部分提取出来，放在一个函数中？ */}
                      <div className="row" style={{marginLeft:0,marginRight:0}}>
                          <div className="col border-right">
                            {
                                yearRange.map((yearNumber,index)=>(
                                    <a 
                                        key={index} 
                                        className={(yearNumber === selectedYear)? 'dropdown-item active':'dropdown-item'}
                                        href="#"
                                        onClick={(event)=>{this.selectYear(event,yearNumber)}}
                                    >
                                        {yearNumber}年
                                    </a>
                                ))
                            }
                          </div>
                          <div className="col">
                            {
                                monthRange.map((monthNumber,index)=>(
                                    <a 
                                        key={index} 
                                        className={(monthNumber === month)? 'dropdown-item active':'dropdown-item'}
                                        href="#"
                                        onClick={(event)=>{this.selectMonth(event,monthNumber)}}
                                    >
                                        {padLeft(monthNumber)}月
                                    </a>
                                ))
                            }  
                          </div>
                      </div>
                  </div>
                }
            </div>
        )
    }
}
MonthPicker.propTypes = {
    year:PropTypes.number.isRequired,
    month:PropTypes.number.isRequired,
    onChange:PropTypes.func.isRequired
}