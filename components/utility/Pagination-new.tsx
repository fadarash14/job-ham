import Image from "next/image";
import React, { memo } from "react";
import styled from "styled-components";
interface PaginationProps {
  page: number;
  limit: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  font-size: 14px;
`;

const PageButton = styled.div<{ active: boolean }>`
  margin: 5px;
  align-items: center;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width: 16px;
  height: 16px;
  & img {
    margin: auto;
  }
`;

const PageNumber = styled.div<{ active: boolean }>`
  margin: 5px;
  padding: 5px 10px;
  align-items: center;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#db143d" : "transparent")};
  color: ${({ active }) => (active ? "#f5f6fa" : "#111")};
  border: none;
  border-radius: 5px;
  @media (max-width: 576px) {
    background-color: ${({ active }) => (active ? "#db143d" : "#f5f6fa")};
    color: ${({ active }) => (active ? "#f5f6fa" : "#111")};
  }
`;

const Ellipsis = styled.div`
  margin: 5px;
  font-weight: bold;
  cursor: default;
`;

const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = page;
  const show = totalItems > limit;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderPaginationNumbers = () => {
    const adjacentPages = 1;
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - adjacentPages);
    let endPage = Math.min(totalPages, currentPage + adjacentPages);

    if (endPage - startPage < maxPagesToShow - 1) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
    }

    const pagesToShow = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    const firstPage = 1;
    const lastPage = totalPages;

    return (
      <>
        {pagesToShow[0] !== 1 && (
          <>
            <PageNumber
              key={firstPage}
              active={firstPage === currentPage}
              onClick={() => handlePageChange(firstPage)}
            >
              {firstPage}
            </PageNumber>
            <Ellipsis>...</Ellipsis>
          </>
        )}
        {pagesToShow.map((pageNumber) => (
          <PageNumber
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </PageNumber>
        ))}
        {pagesToShow[pagesToShow.length - 1] !== totalPages && (
          <>
            <Ellipsis>...</Ellipsis>
            <PageNumber
              key={lastPage}
              active={lastPage === currentPage}
              onClick={() => handlePageChange(lastPage)}
            >
              {lastPage}
            </PageNumber>
          </>
        )}
      </>
    );
  };

  return (
    <>
      {show && (
        <PaginationWrapper>
          <PageButton
            active={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <Image
              src={"/icons/arrow-backward.svg"}
              alt=""
              width={10}
              height={10}
            />
          </PageButton>
          {renderPaginationNumbers()}
          <PageButton
            active={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <Image
              src={"/icons/arrow-forward.svg"}
              alt=""
              width={10}
              height={10}
            />
          </PageButton>
        </PaginationWrapper>
      )}
    </>
  );
};

export default memo(Pagination);
