import Image from "next/image";
import React from "react";
import styled from "styled-components";

interface PaginationProps {
  page: number;
  limit: number;
  skip: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.div<{ active: boolean }>`
  margin: 5px;
  // padding: 5px 10px;
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
  background-color: ${({ active }) => (active ? "#F5F5F5" : "transparent")};
  color: black;
  border: none;
  border-radius: 5px;
`;

const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  skip,
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
  return (
    <>
      {show && (
        <PaginationWrapper>
          <PageButton
            active={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <Image
              src={"/icons/arrow-right-sharp.svg"}
              alt=""
              width={10}
              height={10}
            />
          </PageButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <PageNumber
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </PageNumber>
            )
          )}
          <PageButton
            active={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <Image
              src={"/icons/arrow-left-sharp.svg"}
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

export default Pagination;
