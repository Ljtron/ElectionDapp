import { LineChart, PieChart } from 'react-chartkick'
import 'chart.js'
import React, { Component } from "react";

class Winner extends Component{

    render(){
        return(
            <div class="container" style={{paddingTop: "5%"}}>
                <PieChart data={{"Jim Born": this.props.stats[0], "Gavan Bush": this.props.stats[0], "Lincoln Harn": this.props.stats[0]}} />
            </div>
        );
    }
}

export default Winner;