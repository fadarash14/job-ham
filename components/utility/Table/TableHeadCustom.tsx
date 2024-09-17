import styled from "styled-components";

const Thead = styled.thead`
  display: flex;
  width: 100%;
  align-items: "center";
  justify-content: left;
  //   margin-bottom: 50px;
`;
const Row = styled.tr`
  display: flex;
  justify-content: space-around;
  align-items: "center";
  width: 65%;
`;
const Cell = styled.td`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 125px;
  text-align: center;
  background-color: white;
  height: 85px;
  padding: 10px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  border-bottom: 1px solid #1c474546;
`;

export default function TableHeadCustom({
  order,
  orderBy,
  rowCount = 0,
  headLabel,
  numSelected = 0,
  onSort,
  onSelectAllRows,
  sx,
}: any) {
  return (
    <Thead>
      <Row>
        {headLabel.map((headCell: any) => (
          <Cell
            key={headCell.id}
            // align={headCell.align || "left"}
            // sortDirection={orderBy === headCell.id ? order : false}
            // style={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {headCell.label}
          </Cell>
        ))}
      </Row>
    </Thead>
  );
}
