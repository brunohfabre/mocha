import { useContext, useEffect, useState } from 'react';

import { Placement } from '@popperjs/core';
import { usePopper } from 'react-popper';

import { AuthContext } from '../../contexts/AuthContext';

interface MenuProps {
  children: any;
  placement: Placement;
}

export function Menu({ children, placement }: MenuProps): JSX.Element {
  const { signOut } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset:
            placement.includes('bottom') || placement.includes('top')
              ? [0, 10]
              : [10, 0],
        },
      },
    ],
  });

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (popperElement && !popperElement.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popperElement, isOpen]);

  function handleToggleMenu(): void {
    setIsOpen(!isOpen);
  }

  // const showToolTip = () => {
  //   setIsOpen(true);
  // };

  // const hideToolTip = () => {
  //   setIsOpen(false);
  // };

  return (
    <>
      <button
        ref={setReferenceElement}
        className="cursor-pointer"
        onClick={e => {
          handleToggleMenu();

          e.stopPropagation();
        }}
      >
        {children[0]}
      </button>

      <div
        ref={setPopperElement}
        className={`bg-white py-2 shadow-md rounded border border-gray-200 ${
          isOpen ? 'visible' : 'invisible'
        }`}
        style={styles.popper}
        {...attributes.popper}
        // onMouseEnter={showToolTip}
        // onMouseLeave={hideToolTip}
      >
        {children[1]}
      </div>
    </>
  );
}
