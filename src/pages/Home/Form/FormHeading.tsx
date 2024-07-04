import './Form.style';
import { Row, RowItem } from './Form.style';

const headings = [
  { text: 'ID' },
  { text: 'Name' },
  { text: 'Address' },
  { text: 'Email' },
  { text: 'Rate Per Hour' },
  { text: 'Hours' },
  { text: 'Total' },
  { text: 'Date Range Picker', style: { marginLeft: '35px' } },
  { text: 'Days' },
  { text: 'Actions' },
];

const FormHeading = () => {
  return (
    <Row>
      {headings.map((heading, index) => (
        <RowItem key={index} heading style={heading.style}>
          {heading.text}
        </RowItem>
      ))}
    </Row>
  );
};

export default FormHeading;
