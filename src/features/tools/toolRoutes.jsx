import { Link, useParams } from "react-router-dom";
import { Wrench } from "lucide-react";

import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";

import { Base64Tool } from "./tools/base64/Base64Tool";
import { JsonFormatter } from "./tools/json/JsonFormatter";
import { JwtDecoder } from "./tools/jwt/JwtDecoder";
import { MarkdownPreviewer } from "./tools/markdown/MarkdownPreviewer";
import { RegexTester } from "./tools/regex/RegexTester";
import { UrlEncoder } from "./tools/url/UrlEncoder";
import { UuidGenerator } from "./tools/uuid/UuidGenerator";

export const toolComponents = {
  "json-formatter": JsonFormatter,
  "jwt-decoder": JwtDecoder,
  base64: Base64Tool,
  "url-encoder": UrlEncoder,
  "uuid-generator": UuidGenerator,
  "regex-tester": RegexTester,
  "markdown-preview": MarkdownPreviewer,
};

export const ToolRoute = () => {
  const { toolId } = useParams();
  const ToolComponent = toolComponents[toolId];

  if (!ToolComponent) {
    return (
      <div className="container-narrow pt-32 pb-24">
        <EmptyState
          icon={Wrench}
          title="That tool doesn't exist"
          description="The tool may have been renamed. Everything currently available is listed in the tools library."
          action={
            <Button as={Link} to="/tools">
              Back to tools
            </Button>
          }
        />
      </div>
    );
  }

  return <ToolComponent />;
};

export default ToolRoute;
