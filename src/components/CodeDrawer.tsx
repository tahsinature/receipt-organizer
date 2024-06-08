"use client";

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { JsonViewer } from "@textea/json-viewer";

type CodeDrawerProps = {
  code: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const CodeDrawer = (props: CodeDrawerProps) => {
  return (
    <Drawer open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DrawerContent>
        <JsonViewer rootName="localStorage" collapseStringsAfterLength={20} displayDataTypes={false} value={props.code} theme={"dark"} />
      </DrawerContent>
    </Drawer>
  );
};

export default CodeDrawer;
