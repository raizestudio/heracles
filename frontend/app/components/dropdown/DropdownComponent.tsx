import React from "react";

interface DropdownTriggerProps {
  children: React.ReactNode;
}

interface DropdownContentProps {
  children: React.ReactNode;
}

interface DropdownComponentProps {
  isOpen?: boolean;
  children: React.ReactNode; // Standard children slot
}

// Separate components for slots
const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ children }) => (
  <>{children}</>
);
const DropdownContent: React.FC<DropdownContentProps> = ({ children }) => (
  <>{children}</>
);

interface DropdownComponentType extends React.FC<DropdownComponentProps> {
  Trigger: typeof DropdownTrigger;
  Content: typeof DropdownContent;
}

const DropdownComponent: DropdownComponentType = ({ isOpen, children }) => {
  let trigger: React.ReactNode = null;
  let content: React.ReactNode = null;

  // Separate children into trigger and content slots
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === DropdownTrigger) {
      trigger = child;
    } else if (child.type === DropdownContent) {
      content = child;
    }
  });

  return (
    <div className="relative">
      <div>{trigger}</div>
      {isOpen && (
        <div className="absolute bg-gray-50 shadow p-2 my-3 rounded z-10 right-0">{content}</div>
      )}
    </div>
  );
};

// Attach slots to DropdownComponent for better usability
DropdownComponent.Trigger = DropdownTrigger;
DropdownComponent.Content = DropdownContent;

export default DropdownComponent;
