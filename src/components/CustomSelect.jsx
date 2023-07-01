/* eslint-disable react/prop-types */
import Select, { components } from "react-select";
import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";
const CustomOption = (props) => (
  <components.Option {...props}>
    <span className="flex items-center justify-between">
      {props.data.label}
      {props.isSelected && (
        <FaCheck style={{ color: "#AD1FEA", width: "13px" }} />
      )}
    </span>
  </components.Option>
);
const CustomSelect = ({ options, onChange }) => {
  const customStyle = {
    control: (styles) => ({
      ...styles,
      border: "0",
      boxShadow: 0,
      backgroundColor: "#373F68"

    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      display: "none",
    }),
    option: (styles, state) => {
      return {
        ...styles,
        color: state.isSelected ? "#AD1FEA" : "",
        backgroundColor: state.isSelected && "",
        borderBottom: "1px solid #F2F4FF",
        ":hover": {
          backgroundColor: "",
          color: "#AD1FEA",
        },
        ":active": {
          backgroundColor: "",
        },
      };
    },
    container: (styles) => {
        return {
            ...styles,
            minWidth: "150px",
        }
    },
    singleValue: (styles) => {
      return {
        ...styles,
        fontWeight: 'bold',
        color: '#F2F4FE'
      }
    },
    dropdownIndicator: (styles, state) => (
      {
          ...styles,
          color: "white",
          transition: 'transform .2s ease',
          transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
          ':hover': {
            color: ""
          },
      }
  ),
  valueContainer: (styles) => {
    return {
      ...styles,
      padding: "2px"
    }
  }
  };
  return (
    <Select
      components={{ Option: CustomOption }}
      styles={customStyle}
      options={options}
      placeholder={options[0]?.label}
      defaultValue={options[0]}
      onChange={onChange}
    />
  );
};

CustomSelect.propTypes = {
  options: PropTypes.array,
};
export default CustomSelect;
