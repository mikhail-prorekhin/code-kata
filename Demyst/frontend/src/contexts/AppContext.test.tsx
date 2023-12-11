import React from "react";
import { AppContext, AppProvider } from "./AppContext";
import { render } from "@testing-library/react";
import { initialState } from "../redux/appReducer";
import { asMockFunction } from "../testing/helpers";

jest.mock("../redux/appReducer")

const ConsumerComponent = () => {
  const { state, dispatch } = React.useContext(AppContext);
  return (
    <>
      <p>Company: "{state.company?.companyName}"</p>
      <button onClick={dispatch}></button>
    </>
  )
};


describe("Context", () => {

  it("ConsumerComponent shows default value", () => {

    asMockFunction(initialState).mockReturnValue({
      company: {
        companyName: "Horns and Hooves",
        estYear: 1999
      }
    });
    const { getByText } = render(
      <AppProvider>
        <ConsumerComponent />
      </AppProvider>
    );
    expect(getByText(/^Company:/)).toHaveTextContent('Company: "Horns and Hooves"');
  });

});