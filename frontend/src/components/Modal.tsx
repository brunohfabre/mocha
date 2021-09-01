import React, { ReactNode } from 'react';

import ReactModal from 'react-modal';

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

export function Modal({
  isOpen,
  onRequestClose,
  children,
}: ModalProps): JSX.Element {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 flex items-center justify-center"
      className="bg-white rounded-lg p-4 max-w-3xl w-full"
    >
      {children}
    </ReactModal>
  );
}
