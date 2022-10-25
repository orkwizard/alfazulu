import { NumericFormat }  from 'react-number-format';

export const formatNumber = (number) => {
  return (
    <NumericFormat 
      value={number === null ? 0 : number}
      prefix="$"
      decimalScale={2}
      fixedDecimalScale
      thousandSeparator
      displayType="text"
    />
  );
};
