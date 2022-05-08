import _ from 'lodash'

// css
import './Pagination.css';

export default function Pagination(props) {
    const count = props.count || 0;
    const current = props.current || 1;
    const itemsPerPage = props.itemsPerPage || 10;
    const pagesPerSection = props.pagesPerView || 10;
    const pageMoved = props.pageMoved || ((i) => {});

    if (count === 0 || count <= itemsPerPage)
        return (<div></div>);
    
    const pages = _.ceil(count / itemsPerPage);
    const sections = _.ceil(pages / pagesPerSection);
    const currentSection = _.ceil(current / pagesPerSection);

    const movePage = (page) => {
        console.log('movePage', page);
        pageMoved(page);
    };

    let pageItems = _
        .range(
            (currentSection - 1) * pagesPerSection + 1, 
            Math.min(pages, currentSection * pagesPerSection) + 1)
        .map(page => (
            <button 
                key={page} 
                className={`${page == current ? 'pagination-now' : ''}`}
                onClick={() => movePage(page)}>{page}</button>
        ));
    
    let prev = null;
    if (currentSection != 1)
        prev = (<button 
            className="pagination-pn"
            onClick={() => movePage((currentSection - 1) * pagesPerSection)}>PREV</button>);

    let next = null;
    if (currentSection != sections)
        next = (<button
            className="pagination-pn"
            onClick={() => movePage(currentSection * pagesPerSection + 1)}>NEXT</button>);

    return (
        <div className="pagination-container">
            {prev}
            {pageItems}
            {next}
        </div>
    );
}