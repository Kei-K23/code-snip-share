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

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-jsx";
const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css",
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal",
];

languages.forEach((lang) => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach((theme) => require(`ace-builds/src-noconflict/theme-${theme}`));
/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2),
  code: z.string().min(2),
});

type FormValues = z.infer<typeof formSchema>;

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
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });

  const handleSubmit = (values: FormValues) => {
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Snippet</FormLabel>
              <FormControl>
                <AceEditor
                  placeholder="Placeholder Text"
                  mode="javascript"
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
          <Button disabled={disabled} type="submit" className="w-full">
            {id ? "Save changes" : "Create snippet"}
          </Button>
          {!!id && (
            <Button
              disabled={disabled}
              type="button"
              className="w-full"
              variant={"outline"}
              onClick={handleDelete}
            >
              <Trash className="size-4 mr-2" />
              <span>Delete account</span>
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
