import React, { useRef } from "react";
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  RangesDirective,
  RangeDirective,
} from "@syncfusion/ej2-react-spreadsheet";

const SpreadSheet = ({data}) => {
  const spreadsheetRef = useRef(null);

  return (
    <>
      <SpreadsheetComponent>
        <SheetsDirective>
          <SheetDirective>
            <RangesDirective>
              <RangeDirective dataSource={data}></RangeDirective>
            </RangesDirective>
          </SheetDirective>
        </SheetsDirective>
      </SpreadsheetComponent>
    </>
  );
};

export default SpreadSheet;
