import React from "react";
import { CCol, CRow } from "@coreui/react";
import { CDatePicker } from "@coreui/react-pro";

export const DatePickerMonthsExample = () => {
  return (
    <CRow>
      <CCol className="mb-sm-0 mb-3" sm={6} lg={5}>
        <CDatePicker
          label="Month Picker"
          locale="en-US"
          selectionType="month"
        />{" "}
      </CCol>
      <CCol sm={6} lg={5}>
        <CDatePicker
          label="Month Picker"
          locale="en-US"
          selectionType="month"
          date="2022-08"
        />
      </CCol>
    </CRow>
  );
};
