declare module 'react-datepicker' {
    import React from 'react';
  
    interface DatePickerProps {
      // Define the props for the DatePicker component
      // Add your specific prop types here based on the documentation
      // For example, you can include props like onChange, selected, etc.
    }
  
    declare const DatePicker: React.FunctionComponent<DatePickerProps>;
  
    export default DatePicker;
  }