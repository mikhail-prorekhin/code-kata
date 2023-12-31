import { ReactNode } from "react";
import { render } from "@testing-library/react";
import Page from './Page';
import { AppContext } from '../contexts/AppContext';

const dispatchStub = jest.fn()
const getState = jest.fn()
const getDispatch = jest.fn().mockReturnValue(dispatchStub)


const StubProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppContext.Provider value={{ state: getState(), dispatch: getDispatch() }}>
      {children}
    </AppContext.Provider>
  );
};

describe("Page", () => {
  it("display  auth Form on default", () => {
    getState.mockReturnValue({})
    const view = render(
      <StubProvider>
        <Page />
      </StubProvider>

    );
    expect(view.getByTestId('auth-data')).toBeInTheDocument();
  })


  it("display request accout info ", () => {
    getState.mockReturnValue({
      user: {
        login: "user name",
        gwt: {
          accessToken: "accessToken",
          refreshToken: "refreshToken"
        }
      },
    })
    const { getByTestId } = render(
      <StubProvider>
        <Page />
      </StubProvider>

    );
    expect(getByTestId('account-data')).toBeInTheDocument();
  })

  it("display Review form", () => {
    getState.mockReturnValue({
      user: {
        login: "user name",
        gwt: {
          accessToken: "accessToken",
          refreshToken: "refreshToken"
        }
      },
      company: {
        companyName: "Horns and Hooves",
        estYear: 1999
      },
      accountProvider: "myob",
      loanAmount: "100",
      balanceSheet: [
        {
          year: 2023,
          month: 12,
          profitOrLoss: 250000,
          assetsValue: 1234
        }]
    })
    const view = render(
      <StubProvider>
        <Page />
      </StubProvider>

    );
    expect(view.getByTestId('review-data')).toBeInTheDocument();
  })

  it("display final result", () => {
    getState.mockReturnValue({
      user: {
        login: "user name",
        gwt: {
          accessToken: "accessToken",
          refreshToken: "refreshToken"
        }
      },
      company: {
        companyName: "Horns and Hooves",
        estYear: 1999
      },
      decision: "approved",
      accountProvider: "myob",
      loanAmount: "100",
      balanceSheet: [
        {
          year: 2023,
          month: 12,
          profitOrLoss: 250000,
          assetsValue: 1234
        }]
    })
    const { getByTestId } = render(
      <StubProvider>
        <Page />
      </StubProvider>

    );
    expect(getByTestId('review-decision')).toBeInTheDocument();
  })

  it("display loading", () => {
    getState.mockReturnValue({
      networkInProgress: true,
      company: {
        companyName: "Horns and Hooves",
        estYear: 1999
      },
      decision: { decision: "approved" },
      accountProvider: "myob",
      loanAmount: "100",
      balanceSheet: [
        {
          year: 2023,
          month: 12,
          profitOrLoss: 250000,
          assetsValue: 1234
        }]
    })
    const view = render(
      <StubProvider>
        <Page />
      </StubProvider>

    );
    expect(view.getByTestId('loading-spiner')).toBeInTheDocument();
  })




})