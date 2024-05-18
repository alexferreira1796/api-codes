export type CodeGeneratorType = "BR" | "INT";

export const codeGenerator = (type: CodeGeneratorType): string => {
  const prefix = type === "BR" ? "BR3" : "CN4";

  const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
  return `${prefix}${randomNumber}BR`;
};

export default codeGenerator;
