"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { JsonViewer } from "@textea/json-viewer";

type CodeDrawerProps = {
  code: string;
};

const CodeDrawer = (props: CodeDrawerProps) => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>
              <JsonViewer value={props.code} theme={"dark"} />
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="secondary">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CodeDrawer;
