import React, { memo, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import { Provider, Root, Trigger, Portal, Content } from "@radix-ui/react-tooltip";

import AsyncSelect from "react-select/async";
import {
  components,
  ControlProps,
  InputProps,
  MultiValueProps,
  OnChangeValue,
  Options,
} from "react-select";
import { DefaultAvatar, ValueRender } from "./value-render";
import './multi-select.css'


const Control = ({ children, ...props }: ControlProps<Option>) => {
  // @ts-ignore

  const selected = props.getValue();

  if (selected.length > 1) {

    return (
      <components.Control {...props}>
        {children}
      </components.Control>
    );
  }

  return <components.Control {...props}>{children}</components.Control>;
};

const Input = memo(({ children, ...props }: InputProps<Option>) => {
  // @ts-ignore

  const selected = props.getValue();
  // console.log('input', props)
  if (selected.length > 1) {
    return (
      <>
        <Trigger className="value-container" >+{selected.length - 1}</Trigger>
        <components.Input {...props}>{children}</components.Input>
      </>
    );
  }

  return <components.Input {...props}>{children}</components.Input>;
});



const MultiValue = ({
  children,
  ...props
}: MultiValueProps<Option>) => {
  // @ts-ignore
  // console.log("mv:", props.selectProps, children);
  if (props.index > 0) {
    return <></>;
  }
  return (
    <components.MultiValue {...props} className="selected-value">
      {DefaultAvatar(props.data.label)}
      {children}
    </components.MultiValue >
  );
};



export interface Option {
  readonly value: string;
  readonly label: string;
}
type AsyncAutoCompleteProps = {
  filterOptions: (filterString: string) => Promise<Option[]>
  changeHandler: (newSelection: OnChangeValue<Option, true>) => void
  initOptions: Option[]
  selection: Option[]
}
export function AutoComplete({ filterOptions, changeHandler, selection, initOptions = [] }: AsyncAutoCompleteProps) {
  function removeValue(options: Options<Option>, index: number) {
    changeHandler(selection.filter((_, i) => i !== index))
  }
  const [isLoading, setLoading] = useState(false)
  async function loadOptions(input: string) {
    setLoading(true)
    const options = await filterOptions(input)
    setLoading(false)
    return options

  }


  return (<Provider>
    <Root open >
      < AsyncSelect
        className="select-container"
        onChange={changeHandler}
        isLoading={isLoading}
        isMulti
        value={selection}
        defaultOptions={initOptions}
        components={{ Input, MultiValue }}
        loadOptions={loadOptions}
      ></AsyncSelect>
      <Portal>
        <Content >
          <div className="tooltip-content">
            {
              selection.slice(1).map((selectedOption, index) => {
                return <ValueRender label={selectedOption.label} value={selectedOption.value} removeHandler={() => removeValue(selection, index + 1)} key={`${selectedOption.value}`} />
              })
            }
          </div>
        </Content>
      </Portal>
    </Root>
  </Provider >)
};
;
