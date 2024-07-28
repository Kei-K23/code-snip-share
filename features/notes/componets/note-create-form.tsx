import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pen, PlusCircle, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { useGetTopics } from "../api/use-get-topics";
import MultiSelect from "@/components/multi-select";
import { toast } from "sonner";
import { insertNotesWithTopicsSchema } from "@/db/schema";
import { useTheme } from "next-themes";
import { LANGUAGES } from "@/constants";
import CodeEditor from "@/components/code-editor";

type FormValues = z.infer<typeof insertNotesWithTopicsSchema>;

type AccountCreateFormProps = {
  id?: string;
  defaultValue?: FormValues;
  onSubmit?: (form: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export default function NoteCreateForm({
  id,
  defaultValue,
  onSubmit,
  onDelete,
  disabled,
}: AccountCreateFormProps) {
  const [language, setLanguage] = useState<string>(
    defaultValue?.language ?? ""
  );
  const { resolvedTheme } = useTheme();
  // Fetch topics to use in note creation
  const { data, isLoading } = useGetTopics();

  // 1. Define your form.
  const form = useForm<z.infer<typeof insertNotesWithTopicsSchema>>({
    resolver: zodResolver(insertNotesWithTopicsSchema),
    defaultValues: defaultValue,
  });

  const handleSubmit = (values: FormValues) => {
    if (!values.topics.length) {
      toast.error("Select at least one topic to create snippet");
      return;
    }
    onSubmit?.(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          control={form.control}
          name="topics"
          render={({ field }) => (
            <FormItem className="mt-7">
              <FormLabel>Topics</FormLabel>
              <FormControl>
                <MultiSelect
                  disabled={isLoading || disabled}
                  options={data?.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                  onChange={field.onChange}
                  defaultValue={defaultValue?.topics || []}
                  placeholder="Please choose topics"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mt-7">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g JavaScript function usage"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-7">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  disabled={disabled}
                  placeholder="e.g Code snippet description"
                  {...field}
                ></Textarea>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="mt-7">
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Select
                  disabled={disabled}
                  onValueChange={(e) => {
                    field.onChange(e);
                    setLanguage(e);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {LANGUAGES.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="mt-7">
              <FormLabel>Code snippet</FormLabel>
              <FormControl>
                <CodeEditor
                  language={language}
                  onChange={field.onChange}
                  resolvedTheme={resolvedTheme}
                  defaultValue={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row mt-7 gap-4">
          <Button
            disabled={disabled}
            type="submit"
            className="flex items-center gap-2"
          >
            {id ? (
              <Pen className="size-2 mr-2" />
            ) : (
              <PlusCircle className="size-1 mr-2" />
            )}
            <span>{id ? "Save changes" : "Create"}</span>
          </Button>
          {!!id && (
            <Button
              disabled={disabled}
              type="button"
              variant={"destructive"}
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash className="size-2 mr-2" />
              <span>Delete</span>
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
