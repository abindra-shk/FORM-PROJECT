declare module "react-input-mask" {
  import * as React from "react";

  export interface InputMaskProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    maskChar?: string | null;
    formatChars?: { [key: string]: string };
    alwaysShowMask?: boolean;
    maskPlaceholder?: string | null;
    value?: string | null;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    className?:string;
  }

  const InputMask: React.FC<InputMaskProps>;

  export default InputMask;
}
