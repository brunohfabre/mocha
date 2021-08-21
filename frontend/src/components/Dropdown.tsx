import { useContext, ReactNode, useEffect, useState } from 'react';

import { usePopper } from 'react-popper';

import { AuthContext } from '../contexts/AuthContext';

interface DropdownProps {
  children: ReactNode;
}

function useOutsideAlerter(ref: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref && !ref.contains(event.target)) {
        alert('You clicked outside of me!');
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export function Dropdown({ children }: DropdownProps): JSX.Element {
  const { signOut } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState<any>(null);
  const [popperElement, setPopperElement] = useState<any>(null);
  const [arrowElement, setArrowElement] = useState<any>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (popperElement && !popperElement.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
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
        className="relative h-full cursor-pointer"
        onClick={handleToggleMenu}
        // onMouseEnter={showToolTip}
        // onMouseLeave={hideToolTip}
      >
        {children}
      </button>

      <div
        ref={setPopperElement}
        className={`bg-white p-4 shadow-md rounded ${
          isOpen ? 'visible' : 'invisible'
        }`}
        style={styles.popper}
        {...attributes.popper}
        // onMouseEnter={showToolTip}
        // onMouseLeave={hideToolTip}
      >
        <button
          type="button"
          onClick={() => signOut()}
          className="text-red-500"
        >
          Sign out
        </button>
      </div>
    </>
  );
}
