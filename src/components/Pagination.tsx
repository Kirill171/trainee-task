import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  visiblePages: number[];
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  visiblePages,
  onPageChange
}) => {
  return (
    <PaginationWrapper>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </PageButton>
      {visiblePages.map((page) => (
        <PageButton
          key={page}
          $active={currentPage === page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        →
      </PageButton>
    </PaginationWrapper>
  );
};

export default React.memo(Pagination);

const PaginationWrapper = styled.div`
  margin-top: ${(props) => props.theme.spacing.large};
  display: flex;
  gap: ${(props) => props.theme.spacing.small};
  justify-content: flex-end;
  align-items: center;
  height: 30px;
  font-size: ${(props) => props.theme.fontSizes.medium};
`;

interface PageButtonProps {
  $active?: boolean;
}

const PageButton = styled.button<PageButtonProps>`
  font-size: 100%;
  font-weight: ${(props) =>
    props.$active
      ? props.theme.fontWeight.semiBold
      : props.theme.fontWeight.light};
  padding: ${(props) => (props.$active ? '0' : props.theme.spacing.small)};
  width: ${(props) => (props.$active ? '30px' : 'auto')};
  height: ${(props) => (props.$active ? '30px' : 'auto')};
  background: ${(props) =>
    props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${(props) =>
    props.$active ? props.theme.colors.background : props.theme.colors.text};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.small};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
