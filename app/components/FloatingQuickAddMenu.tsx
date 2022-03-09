import { Popover } from "@headlessui/react";
import { Link } from "remix";
import { useFloating } from "@floating-ui/react-dom";

export default function FloatingQuickAddMenu() {
  const { x, y, reference, floating, strategy } = useFloating({
    placement: "top-end",
  });
  return (
    <Popover className="absolute right-10 bottom-10">
      <Popover.Button ref={reference}>+</Popover.Button>
      <Popover.Panel
        ref={floating}
        style={{
          position: strategy,
          top: y ?? "",
          left: x ?? "",
          width: "200px",
        }}
      >
        <Link to="/">New "quick add" list</Link>
        <Link to="/">Select "quick add" list</Link>
      </Popover.Panel>
    </Popover>
  );
}
