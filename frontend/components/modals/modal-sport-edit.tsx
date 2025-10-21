import * as React from "react";
import { z } from "zod";
import { Modal } from "@/components/controls/modal";
import { Buttons } from "@/components/controls/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import AvatarPicker from "@/components/pickers/picker-avatar";
import { Form, FormItem } from "@/components/controls/form";
import { Separator } from "@/components/ui/separator";
import { TypeSport } from "@/types/types";
import { ServiceSport } from "@/lib/services/service-sport";

type SportEditModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  sport?: TypeSport;
  onSave: (sportData: TypeSport) => void;
};

const SportEditModal: React.FC<SportEditModalProps> = ({
  isOpen,
  onOpenChange,
  sport,
  onSave,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const formConfig = {
    base64: {
      label: "Sport Logo",
      schema: z.union([z.string(), z.null(), z.undefined()]).optional(),
      control: <AvatarPicker image={sport?.base64}  />,
      className: "flex flex-col",
      required: false,
    },
    name: {
      label: "Sport Name",
      schema: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
      control: <Input />,
      required: true,
    },
    abbr: {
      label: "Abbreviation",
      schema: z
        .string()
        .length(3, "Abbreviation must be exactly 3 characters")
        .regex(/^[A-Z]+$/, "Abbreviation must be 3 uppercase letters"),
      control: <Input maxLength={3} />,
      description: "Enter a 3-letter abbreviation (e.g. FTB, NBA, NFL)",
      required: true,
    },
    note: {
      label: "Description",
      schema: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
      control: <Textarea rows={3} />,
      description: "Optional description of the sport",
    },
    isActive: {
      label: "Active",
      schema: z.boolean(),
      control: <Switch checked={sport?.isActive ?? false} />,
      description: "Toggle sport's active status",
    },
  };

  const triggerFormSubmit = React.useCallback(() => {
    if (formRef.current) {
      try {
        const submitEvent = new Event("submit", { cancelable: true });
        formRef.current.dispatchEvent(submitEvent);

        if (formRef.current.requestSubmit) {
          formRef.current.requestSubmit();
        }
      } catch (error) {
        // Silently handle any submission errors
      }
    }
  }, [formRef, sport]);

  const handleSubmit = React.useCallback(
    (data: any) => {
      const sportData: TypeSport = {
        id: sport?.id || 0,
        name: data.name?.trim(),
        abbr: data.abbr?.trim().toUpperCase(),
        note: data.note?.trim() || undefined,
        base64: data.base64,
        isActive: data.isActive,
      };

      if (sport?.id) {
        ServiceSport.updateSport(sport?.id, sportData).then(() => {
          onSave(sportData);
          onOpenChange(false);
        });
      } else {
        ServiceSport.createSport(sportData).then((newSport) => {
          sportData.id = newSport.id;
          onSave(sportData);
          onOpenChange(false);
        });
      }
    },
    [sport, onSave, onOpenChange]
  );

  return (
    <Modal
      size="md"
      open={isOpen}
      onOpenChange={onOpenChange}
      title={sport?.id ? "Edit Sport" : "Add New Sport"}
      description={
        sport?.id
          ? "Update the details of the existing sport"
          : "Create a new sport in the system"
      }
    >
      <Form
        ref={formRef}
        config={formConfig}
        onSubmit={handleSubmit}
        className="flex gap-4"
        initialValues={sport}
      >
        <FormItem key="base64" className="w-[120px]" />
        <Separator orientation="vertical" />
        <div className="space-y-4 w-full">
          <FormItem key="name" />
          <FormItem key="abbr" />
          <FormItem key="note" />
          <FormItem key="isActive" />
        </div>
      </Form>

      <Separator />
      {/* Footer with centered buttons */}
      <div className="flex justify-center space-x-2">
        <Buttons.Save onClick={triggerFormSubmit} />
        <Buttons.Cancel onClick={() => onOpenChange(false)} />
      </div>
    </Modal>
  );
};

export default SportEditModal;
