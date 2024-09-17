import styled from "styled-components";
import { marginRight } from "styled-system";
import TableHeadCustom from "./TableHeadCustom";

type TableProps = {
  data: {}[];
  footer: {}[];
  tableHeader: {
    id: string;
    label: string;
  }[];
};

const Div = styled.div`
  width: 100%;
  margin: 0 auto;
`;
const Table = styled.table`
  margin-right: "auto";
  margin-left: "auto";
  margin-top: "30px";
  display: "flex";
  flex-direction: "column";
  width: 100%;
`;
const TableContainer = styled.div``;
const Tbody = styled.tbody`
  margin-left: 5px;
`;
const Row = styled.tr`
  display: flex;
  justify-content: space-between;
  width: 100%;
  // margin-bottom: 10px;
  align-items: center;
  border-bottom: 1px solid #1c474546;
`;
const FooterRow = styled.tr`
  display: flex;
  flex-direction: column;
`;
const Footer = styled.tfoot`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;
const Cell = styled.td`
  border: 0px;
  display: flex;
  justify-content: center;
  width: 125px;
  align-items: center;
  background-color: white;
  padding: 5px;
  :first-child {
    justify-content: right;
    margin: 0px;
    width: 35%;
    background-color: unset;
  }
`;

const TableSkeleton = (props: TableProps) => {
  return (
    <Div>
      <TableContainer style={{ minWidth: 800 }}>
        <Table
          style={{
            marginRight: "auto",
            marginLeft: "auto",
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            minWidth: "800px",
            // alignItems: "center",
          }}
        >
          <TableHeadCustom headLabel={props.tableHeader} />
          <Tbody>
            {props.data.length > 0 &&
              props.data.map((row: any) => (
                <Row key={row.id}>
                  {Object.keys(row).map(
                    (index) =>
                      index !== "id" && (
                        <Cell key={index}>
                          {typeof row[index] === "object"
                            ? row[index][0]
                            : row[index]}
                        </Cell>
                      )
                  )}
                </Row>
              ))}
          </Tbody>
          <Footer>
            {props.footer.length > 0 &&
              props.footer.map((row: any) => (
                <FooterRow key={row.id}>
                  <Cell>{row.button}</Cell>
                </FooterRow>
              ))}
          </Footer>
        </Table>
      </TableContainer>
    </Div>
  );
};

export default TableSkeleton;
