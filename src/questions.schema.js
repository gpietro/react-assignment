export default {
  definitions: {},
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/root.json",
  type: "object",
  title: "Question Schema",
  required: ["title", "type", "status", "resume", "answers"],
  properties: {
    _id: {
      $id: "#/properties/_id",
      type: "string",
      title: "The _id Schema",
      default: "",
      examples: ["5ccbf922efa7b8002cba9743"],
      pattern: "^(.*)$"
    },
    title: {
      $id: "#/properties/title",
      type: "string",
      title: "Question's title",
      examples: ["Domanda"],
      pattern: "^(.*)$"
    },
    type: {
      $id: "#/properties/type",
      type: "string",
      title: "The Type Schema",
      default: "single",
      examples: ["single"],
      pattern: "^(.*)$"
    },
    required: {
      $id: "#/properties/required",
      type: "boolean",
      title: "Required",
      default: false,
      examples: [true]
    },
    status: {
      $id: "#/properties/status",
      type: "boolean",
      title: "The Status Schema",
      default: false,
      examples: [true]
    },
    resume: {
      $id: "#/properties/resume",
      type: "string",
      title: "The Resume Schema",
      default: "",
      examples: ["always"],
      pattern: "^(.*)$"
    },
    answers: {
      $id: "#/properties/answers",
      type: "array",
      default: [],
      title: "The Answers Schema",
      items: {
        $id: "#/properties/answers/items",
        type: "object",
        title: "The Items Schema",
        required: ["_id", "text", "isDefault", "type"],
        properties: {
          _id: {
            $id: "#/properties/answers/items/properties/_id",
            type: "string",
            title: "The _id Schema",
            default: "",
            examples: ["5ccbf915d34c97686e000001"],
            pattern: "^(.*)$"
          },
          text: {
            $id: "#/properties/answers/items/properties/text",
            type: "string",
            title: "The Text Schema",
            examples: ["Uno"],
            pattern: "^(.*)$"
          },
          isDefault: {
            $id: "#/properties/answers/items/properties/isDefault",
            type: "boolean",
            title: "The Isdefault Schema",
            default: false,
            examples: [false]
          },
          type: {
            $id: "#/properties/answers/items/properties/type",
            type: "string",
            title: "The Type Schema",
            default: "",
            examples: ["text"],
            pattern: "^(.*)$"
          },
          score: {
            $id: "#/properties/answers/items/properties/score",
            type: "string",
            title: "The Score Schema",
            default: "",
            examples: ["2"],
            pattern: "^(.*)$"
          },
          questionIds: {
            $id: "#/properties/answers/items/properties/questionIds",
            type: "array",
            title: "The Questionids Schema",
            items: {
              $id: "#/properties/answers/items/properties/questionIds/items",
              type: "string",
              title: "The Items Schema",
              default: "",
              examples: ["5ccbfab6efa7b8002cba9744"],
              pattern: "^(.*)$"
            }
          }
        }
      }
    }
  }
};
