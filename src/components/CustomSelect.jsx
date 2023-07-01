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
const CustomSelect = ({ options, onChange, override }) => {
  const customStyle = {
    control: (styles) => ({
      ...styles,
      border: override ? '1px solid #4661E6' : 0,
      boxShadow: 0,
      backgroundColor: override ? "#F2F4FE" : "#373F68",
      padding: override && "10px",
    }),
    indicatorSeparator: (styles) => ({
      ...styles,
      display: "none",
    }),
    option: (styles, state) => {
      return {
        ...styles,
        color: state.isSelected ? "#AD1FEA" : "#647196",
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
        }
    },
    singleValue: (styles) => {
      return {
        ...styles,
        fontWeight: !override && 'bold',
        color: override ? '#647196' : '#F2F4FE'
      }
    },
    dropdownIndicator: (styles, state) => (
      {
          ...styles,
          color: override ? "#4661E6" : "white",
          transition: 'transform .2s ease',
          transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
          ':hover': {
            color: ""
          },
          paddingInline: "0"
      }
  ),
  valueContainer: (styles) => {
    return {
      ...styles,
      padding: "2px"
    }
  },
  menu: (styles) => {
    return {
      ...styles,
      minWidth: "160px"
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
      isSearchable={false}
    />
  );
};

CustomSelect.propTypes = {
  options: PropTypes.array,
  override: PropTypes.bool
};
export default CustomSelect;
