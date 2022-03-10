import { Col, Pagination, PaginationItem, PaginationLink } from "reactstrap"

function Paginate({page, totalPaginas, handlePageClick}){
    
    const getPageIndexOptions = (maxNumberOfOptions, pageSize, pageIndex) => {
        const options = [];
        const pivot = Math.ceil(maxNumberOfOptions/2);
        const lastPageIndex = pageSize;
        
        if (lastPageIndex <= maxNumberOfOptions) {
          while(options.length < lastPageIndex) options.push(options.length);
        } else if (pageIndex < pivot) {
          while(options.length < maxNumberOfOptions) options.push(options.length);
        } else if (pageIndex > (lastPageIndex - pivot)) {
          while(options.length < maxNumberOfOptions) options.unshift(lastPageIndex - options.length + 1);
        } else {
          for (var i = pageIndex - (pivot - 1); options.length < maxNumberOfOptions; i++) {
            options.push(i + 1);
          }
        }
    
        return options;
    }
    
    return (
        <Col lg="12">
            <Pagination className="pagination pagination-rounded justify-content-end mb-2">
                <PaginationItem disabled={page === 0}>
                <PaginationLink
                    previous
                    href="#"
                    onClick={() => handlePageClick(page - 1)}
                />
                </PaginationItem>
                {
                getPageIndexOptions(5, totalPaginas, page).map((item, i) => (
                    <PaginationItem active={item === page} key={i}>
                        <PaginationLink
                        onClick={() => handlePageClick(item)}
                        href="#"
                        >
                        {item+1}
                        </PaginationLink>
                    </PaginationItem>
                ))
                }
                <PaginationItem disabled={page+1 === totalPaginas}>
                <PaginationLink
                    next
                    href="#"
                    onClick={() => handlePageClick(page + 1)}
                />
                </PaginationItem>
            </Pagination>
        </Col>
    )

}

export default Paginate