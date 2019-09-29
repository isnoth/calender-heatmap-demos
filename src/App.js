import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import CalHeatMap from 'cal-heatmap'
import 'cal-heatmap/cal-heatmap.css'
import dayjs from 'dayjs'

const secondsOfDate = (date) => dayjs(date).startOf('day')/1000

const Inc = (datas, date, num=1) => {
    const key =  secondsOfDate(date)
    if (datas[key]) {
        return Object.assign({}, datas, {[key]: datas[key]+1})
    } else {
        return Object.assign({}, datas, {[key]:1 })
    }
}

class HeatMap extends Component {
    constructor(props) {
        super(props)
        this.cal = new CalHeatMap();
        const datas = this.props
        this.state = {
            datas
        }
    }
    componentDidMount() {
        this.cal.init({
            itemSelector: "#cal-heatmap",
            domain: "month",
            subDomain: "day",
            cellSize: 20, subDomainTextFormat: "%d",
            range: 3,
            start: new Date(new Date().getTime() - 1000*60*60*24/*hour*/ * 60/*day*/),
            displayLegend: false,
            data: this.state.datas,
            onClick: (date, nb) => {
                this.setState({
                    datas: Inc(this.state.datas, date, 1)
                })
                this.cal.update(this.state.datas)
            }
        });
    }

    componentWillUnmount() {
        this.cal.destroy()
    }

    render() {
        return <p id="cal-heatmap"> world</p>
    }
}

class Item extends Component {
}

function App() {
  return (
    <div className="App">
        hello world
      <HeatMap/>
    </div>
  );
}

export default App;
