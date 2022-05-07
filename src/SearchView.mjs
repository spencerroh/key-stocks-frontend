import React, { Component } from 'react'

// css
import './SearchView.css';

export default 
class SearchView extends Component {
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
                <tr className="stock-name" key={item.id}>
                    <td className="search-view-col-name text-center">
                    <p>
                        {item.name}
                    </p>
                    <p className="stock-code">
                        ({item.code})
                    </p></td>
                    <td className="search-view-col-date">{item.date}</td>
                    <td className="search-view-col-reason">{item.reason}</td>
                </tr>);            

        return (
            <div>
                <table className="search-view-table">
                    <thead className="search-view-header">
                        <tr>
                            <th className='search-view-col-name'>종목명</th>
                            <th className='search-view-col-date'>날짜</th>
                            <th className='search-view-col-reason'>급등 사유</th>
                        </tr>
                    </thead>
                    <tbody className='search-view-body'>
                    {items}
                    </tbody>
                </table>
            </div>);
    }
}