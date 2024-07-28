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
import { Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-jsx";

LANGUAGES.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

THEMES.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));
/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import { LANGUAGES, THEMES } from "@/constants";
import { useState } from "react";
import { useGetTopics } from "../api/use-get-topics";
import MultiSelect from "@/components/multi-select";
import { toast } from "sonner";
import { insertNotesWithTopicsSchema } from "@/db/schema";

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
  const [language, setLanguage] = useState<string>("");
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
            <FormItem>
              <FormLabel>Topics</FormLabel>
              <FormControl>
                <MultiSelect
                  disabled={isLoading}
                  options={data?.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                  onChange={field.onChange}
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
            <FormItem>
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
            <FormItem>
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
            <FormItem>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Select
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
            <FormItem>
              <FormLabel>Snippet</FormLabel>
              <FormControl>
                <AceEditor
                  className="w-full"
                  style={{
                    width: "100%",
                    height: "300px",
                  }}
                  placeholder="Share your code"
                  mode={language ?? ""}
                  theme="monokai"
                  name="blah2"
                  onChange={field.onChange}
                  fontSize={14}
                  lineHeight={19}
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row  gap-4">
          <Button disabled={disabled} type="submit">
            {id ? "Save changes" : "Create"}
          </Button>
          {!!id && (
            <Button
              disabled={disabled}
              type="button"
              variant={"outline"}
              onClick={handleDelete}
            >
              <Trash className="size-4 mr-2" />
              <span>Delete</span>
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
