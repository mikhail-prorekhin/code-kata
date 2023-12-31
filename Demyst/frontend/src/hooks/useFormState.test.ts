import React from "react";
import useFormState from "./useFormState";

function FormDataMock(this: any) {
  this.append = jest.fn();
  this.set = jest.fn();
  this.get = jest.fn();
  return { label: "--FormDataMock--" };
}

describe("hook", () => {
  it("click submit", async () => {
    const event = {
      target: "--Target--",
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };

    const setter = jest.fn() as React.Dispatch<any>;
    jest
      .spyOn(React, "useState")
      .mockReturnValue([{ label: "useState" }, setter]);

    global.FormData = FormDataMock as unknown as {
      new (
        form?: HTMLFormElement | undefined,
        submitter?: HTMLElement | null | undefined
      ): FormData;
      prototype: FormData;
    };

    const action = async () => ({
      companyName: "Horns and Hooves",
      estYear: 2020,
    });

    const [state, handler] = useFormState(action);
    await handler(event as unknown as React.FormEvent<HTMLFormElement>);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(state).toEqual({ label: "useState" });
    expect(setter).toBeCalledWith({
      companyName: "Horns and Hooves",
      estYear: 2020,
    });
  });
});
