import React, { useState } from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  console.log(pages.length);
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item ">
            <button
              className="page-link"
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              Previous
            </button>
          </li>
          {pages.map((page, index) => {
            return (
              <li className="page-item" key={index}>
                <button
                  className="page-link"
                  onClick={() => {
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </button>
              </li>
            );
          })}

          <li className="page-item">
            <button
              className="page-link"
              onClick={() => {
                if (currentPage < pages.length) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
