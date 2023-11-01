import React from "react";
import './Paging.css';
import Pagination from "react-js-pagination";

export function PaginationComponent({ activePage, onPageChange }) {
    return (
        <Pagination
            activePage={activePage}
            itemsCountPerPage={15}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={onPageChange}
        />
    );
}
