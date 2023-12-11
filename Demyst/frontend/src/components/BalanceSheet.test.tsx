import { sort } from "./BalanceSheet"

describe("BalanceSheet", () => {
    describe("sortting", () => {
        test("sort years and month", () => {
            expect([{
                "year": 2023,
                "month": 12,
                "profitOrLoss": 2023,
                "assetsValue": 2023
            },
            {
                "year": 2023,
                "month": 1,
                "profitOrLoss": 2023,
                "assetsValue": 2023
            },
            {
                "year": 2022,
                "month": 1,
                "profitOrLoss": 2023,
                "assetsValue": 2023
            },
            {
                "year": 2019,
                "month": 12,
                "profitOrLoss": 2023,
                "assetsValue": 2023
            },

            ].sort(sort)).toEqual([
                {
                    year: 2019,
                    month: 12,
                    profitOrLoss: 2023,
                    assetsValue: 2023,
                },
                {
                    year: 2022,
                    month: 1,
                    profitOrLoss: 2023,
                    assetsValue: 2023,
                },
                {
                    year: 2023,
                    month: 1,
                    profitOrLoss: 2023,
                    assetsValue: 2023,
                },
                {
                    year: 2023,
                    month: 12,
                    profitOrLoss: 2023,
                    assetsValue: 2023,
                },
            ])
        })
    })
})