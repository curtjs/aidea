import React, { FunctionComponent, useRef, useState } from "react";

interface DropdownProps {
  options: string[];
  optionSelected: (option: string) => void;
}

/**
 * A DaisyUI dropdown wrapper. Will hide when an option is selected
 */
const Dropdown: FunctionComponent<DropdownProps> = ({
  options,
  optionSelected,
}) => {
  const [selection, setSelection] = useState(options[0]);
  const dropdown = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, i: number) => {
    e.preventDefault();
    setSelection(options[i]);
    optionSelected(options[i]);

    toggleDropdown();
  };

  const toggleDropdown = () => {
    if (dropdown.current) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      dropdown.current.classList.toggle("dropdown-open");
    }
  };

  return (
    <div ref={dropdown} className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn m-1"
        onClick={toggleDropdown}
      >
        {selection}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {options.map((option, i) => (
          <li
            key={i}
            onClick={(e) => {
              handleClick(e, i);
            }}
          >
            <a>{option}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
