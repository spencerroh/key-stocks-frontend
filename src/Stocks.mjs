import React, { Component } from 'react'

// css
import './Stocks.css';

export default 
class Stocks extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }
    componentDidMount() {

    }

    render() {
        if (this.props.items === null)
            return;

        const items = this.props.items.map(
            item => 
                <tr className="stock" key={item.id}>
                    <td className="stock-name">
                        <p>
                            {item.name}
                        </p>
                        <p className="stock-code">
                            ({item.code})
                        </p>
                    </td>
                    <td className="stock-reason">{item.reason}</td>
                </tr>);            

        return (
            <table className="pretty-table">
                <thead className="table-header">
                    <tr>
                        <th>종목명</th>
                        <th>급등 사유</th>
                    </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </table>);
    }
}