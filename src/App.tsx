import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { FitNumberCard } from "./components/FitNumberCard";
import Layout from "./components/Layout";
import { Slide } from "./components/Slide";
import { formatterCurrency, kFormatter } from "./utils";

const titles = ["PRACTICE VALUATION", "INVESTMENTS", "LIFESTYLE", "SUMMARY"];

enum FIELDS {
  ANNUAL_PRODUCTION = "ANNUAL_PRODUCTION",
  DENTAL_PRODUCTION = "DENTAL_PRODUCTION",
  HYGIENE_PRODUCTION = "HYGIENE_PRODUCTION",
  TOTAL_PRACTICE_EXPENSES = "TOTAL_PRACTICE_EXPENSES",
  INVESTMENTS_SAVINGS_INTEREST_INCOME = "INVESTMENTS_SAVINGS_INTEREST_INCOME",
  DEBT = "DEBT",
  ANNUAL_LIFE_STYLE_EXPENSES = "ANNUAL_LIFE_STYLE_EXPENSES",
  MORTGAGE_RENT = "MORTGAGE_RENT",
  HOME_EXPENSES = "HOME_EXPENSES",
  GROCERIES_HOUSEHOLD = "GROCERIES_HOUSEHOLD",
  EDUCATION = "EDUCATION",
  VEHICLE = "VEHICLE",
  RESTAURANTS_ENTERTAINMENT = "RESTAURANTS_ENTERTAINMENT",
  OTHER = "OTHER",
}

enum TOTALS_FIELDS {
  PRACTICE_VALUAION_FIRST = "PRACTICE_VALUAION_FIRST",
  PRACTICE_VALUAION_SECOND = "PRACTICE_VALUAION_SECOND",
  FIT_NUMBER = "FIT_NUMBER",
}

function App() {
  const [formFields, setFormFields] = useState({
    [FIELDS.ANNUAL_PRODUCTION]: 0,
    [FIELDS.DENTAL_PRODUCTION]: 0,
    [FIELDS.HYGIENE_PRODUCTION]: 0,
    [FIELDS.TOTAL_PRACTICE_EXPENSES]: 0,
    [FIELDS.INVESTMENTS_SAVINGS_INTEREST_INCOME]: 0,
    [FIELDS.DEBT]: 0,
    [FIELDS.ANNUAL_LIFE_STYLE_EXPENSES]: 0,
    [FIELDS.MORTGAGE_RENT]: 0,
    [FIELDS.HOME_EXPENSES]: 0,
    [FIELDS.GROCERIES_HOUSEHOLD]: 0,
    [FIELDS.EDUCATION]: 0,
    [FIELDS.VEHICLE]: 0,
    [FIELDS.RESTAURANTS_ENTERTAINMENT]: 0,
    [FIELDS.OTHER]: 0,
  });
  const [formStep, setFormStep] = useState(1);
  const [formTitle, setFormTitle] = useState("SUMMARY");
  const [disabledField, setDisabledField] = useState<FIELDS[] | null>(null);
  const [totals, setTotals] = useState<
    { field: TOTALS_FIELDS; total: number }[]
  >([
    {
      field: TOTALS_FIELDS.PRACTICE_VALUAION_FIRST,
      total: 0,
    },
    {
      field: TOTALS_FIELDS.PRACTICE_VALUAION_SECOND,
      total: 0,
    },
    {
      field: TOTALS_FIELDS.FIT_NUMBER,
      total: 0,
    },
  ]);

  const handleNext = () => {
    setFormStep(formStep + 1);
    setFormTitle(titles[formStep]);
  };

  const handleSubmit = () => {};

  const handleFitNumber = () => {
    const D = earningBeforeTax() * 7.5;
    const E = Number(formFields[FIELDS.INVESTMENTS_SAVINGS_INTEREST_INCOME]);
    const F = Number(formFields[FIELDS.DEBT]);
    const G =
      Number(formFields[FIELDS.MORTGAGE_RENT]) +
      Number(formFields[FIELDS.HOME_EXPENSES]) +
      Number(formFields[FIELDS.GROCERIES_HOUSEHOLD]) +
      Number(formFields[FIELDS.EDUCATION]) +
      Number(formFields[FIELDS.VEHICLE]) +
      Number(formFields[FIELDS.RESTAURANTS_ENTERTAINMENT]) +
      Number(formFields[FIELDS.OTHER]);
    const total = D + E - F - G * 300;
    console.log("total", total);

    return formatterCurrency(total);
  };

  const earningBeforeTax = () => {
    const ap =
      Number(formFields[FIELDS.ANNUAL_PRODUCTION]) +
      Number(formFields[FIELDS.DENTAL_PRODUCTION]) +
      Number(formFields[FIELDS.HYGIENE_PRODUCTION]);

    return ap - formFields[FIELDS.TOTAL_PRACTICE_EXPENSES];
  };

  const handleTotals = () => {
    return kFormatter(earningBeforeTax() * 7.5);
  };

  const handlePracticeValuationValidation = (
    value: number,
    field: FIELDS | null
  ) => {
    if (field === FIELDS.ANNUAL_PRODUCTION && value > 0) {
      setDisabledField([FIELDS.DENTAL_PRODUCTION, FIELDS.HYGIENE_PRODUCTION]);
    } else if (
      (field === FIELDS.DENTAL_PRODUCTION ||
        field === FIELDS.HYGIENE_PRODUCTION) &&
      value > 0
    ) {
      setDisabledField([FIELDS.ANNUAL_PRODUCTION]);
    } else if (field === FIELDS.ANNUAL_LIFE_STYLE_EXPENSES && value > 0) {
      setDisabledField([
        FIELDS.MORTGAGE_RENT,
        FIELDS.HOME_EXPENSES,
        FIELDS.GROCERIES_HOUSEHOLD,
        FIELDS.EDUCATION,
        FIELDS.VEHICLE,
        FIELDS.RESTAURANTS_ENTERTAINMENT,
        FIELDS.OTHER,
      ]);
    } else if (
      (field === FIELDS.MORTGAGE_RENT ||
        field === FIELDS.HOME_EXPENSES ||
        field === FIELDS.GROCERIES_HOUSEHOLD ||
        field === FIELDS.EDUCATION ||
        field === FIELDS.VEHICLE ||
        field === FIELDS.RESTAURANTS_ENTERTAINMENT ||
        field === FIELDS.OTHER) &&
      value > 0
    ) {
      setDisabledField([FIELDS.ANNUAL_LIFE_STYLE_EXPENSES]);
    } else {
      setDisabledField(null);
    }
  };

  useEffect(() => {
    setFormTitle(titles[formStep - 1]);
  }, [formStep]);

  useEffect(() => {
    if (formFields.ANNUAL_PRODUCTION > 0 && formFields.DENTAL_PRODUCTION == 0) {
      handlePracticeValuationValidation(
        formFields.ANNUAL_PRODUCTION,
        FIELDS.ANNUAL_PRODUCTION
      );
    } else if (formFields.DENTAL_PRODUCTION > 0) {
      handlePracticeValuationValidation(
        formFields.DENTAL_PRODUCTION,
        FIELDS.DENTAL_PRODUCTION
      );
    } else if (formFields.HYGIENE_PRODUCTION > 0) {
      handlePracticeValuationValidation(
        formFields.HYGIENE_PRODUCTION,
        FIELDS.HYGIENE_PRODUCTION
      );
    } else if (formFields.ANNUAL_LIFE_STYLE_EXPENSES > 0) {
      handlePracticeValuationValidation(
        formFields.ANNUAL_LIFE_STYLE_EXPENSES,
        FIELDS.ANNUAL_LIFE_STYLE_EXPENSES
      );
    } else if (formFields.MORTGAGE_RENT > 0) {
      handlePracticeValuationValidation(
        formFields.MORTGAGE_RENT,
        FIELDS.MORTGAGE_RENT
      );
    } else if (formFields.HOME_EXPENSES > 0) {
      handlePracticeValuationValidation(
        formFields.HOME_EXPENSES,
        FIELDS.HOME_EXPENSES
      );
    } else if (formFields.GROCERIES_HOUSEHOLD > 0) {
      handlePracticeValuationValidation(
        formFields.GROCERIES_HOUSEHOLD,
        FIELDS.GROCERIES_HOUSEHOLD
      );
    } else if (formFields.EDUCATION > 0) {
      handlePracticeValuationValidation(formFields.EDUCATION, FIELDS.EDUCATION);
    } else if (formFields.VEHICLE > 0) {
      handlePracticeValuationValidation(formFields.VEHICLE, FIELDS.VEHICLE);
    } else if (formFields.RESTAURANTS_ENTERTAINMENT > 0) {
      handlePracticeValuationValidation(
        formFields.RESTAURANTS_ENTERTAINMENT,
        FIELDS.RESTAURANTS_ENTERTAINMENT
      );
    } else if (formFields.OTHER > 0) {
      handlePracticeValuationValidation(formFields.OTHER, FIELDS.OTHER);
    } else {
      handlePracticeValuationValidation(0, null);
    }
  }, [formFields]);

  const renderForm = () => {
    switch (formStep) {
      case 1:
        return (
          <>
            <label htmlFor="">
              <h1 className="my-8"> Annual Production</h1>
              <Slide
                disabled={disabledField?.includes(FIELDS.ANNUAL_PRODUCTION)}
                min="0"
                max="5000000"
                steps={10}
                value={formFields.ANNUAL_PRODUCTION}
                onChange={(e) =>
                  setFormFields((preState) => ({
                    ...preState,
                    [FIELDS.ANNUAL_PRODUCTION]: e.target.value,
                  }))
                }
              />
            </label>

            <label className="flex gap-3 items-center my-12">
              <span>
                Dental <br /> Production
              </span>
              <div className="w-full">
                <Slide
                  disabled={disabledField?.includes(FIELDS.DENTAL_PRODUCTION)}
                  min="0"
                  max="5000000"
                  steps={10}
                  value={formFields.DENTAL_PRODUCTION}
                  onChange={(e) =>
                    setFormFields((preState) => ({
                      ...preState,
                      [FIELDS.DENTAL_PRODUCTION]: e.target.value,
                    }))
                  }
                />
              </div>
            </label>

            <label className="flex gap-3 items-center">
              <span>
                Hygiene <br /> Production
              </span>
              <div className="w-full">
                <Slide
                  disabled={disabledField?.includes(FIELDS.HYGIENE_PRODUCTION)}
                  min="0"
                  max="5000000"
                  steps={10}
                  value={formFields.HYGIENE_PRODUCTION}
                  onChange={(e) =>
                    setFormFields((preState) => ({
                      ...preState,
                      [FIELDS.HYGIENE_PRODUCTION]: e.target.value,
                    }))
                  }
                />
              </div>
            </label>
            <label htmlFor="">
              <h1 className="my-10">Total Practice Expenses</h1>
              <Slide
                min="0"
                max="2000000"
                steps={10}
                value={formFields.TOTAL_PRACTICE_EXPENSES}
                onChange={(e) =>
                  setFormFields((preState) => ({
                    ...preState,
                    [FIELDS.TOTAL_PRACTICE_EXPENSES]: e.target.value,
                  }))
                }
              />
            </label>

            <div className="flex justify-between items-center text-secondary-100 my-16">
              <h1 className="">Practice Valuation</h1>
              <div className="border-2 rounded-2xl w-[45%] flex items-center justify-center border-secondary-100 py-3 px-7 ">
                $ {handleTotals()}
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <label htmlFor="">
              <h1 className="my-8">Investments + Savings + Interest Income</h1>
              <Slide
                min="0"
                max="20000000"
                steps={10}
                value={formFields.INVESTMENTS_SAVINGS_INTEREST_INCOME}
                onChange={(e) =>
                  setFormFields((preState) => ({
                    ...preState,
                    [FIELDS.INVESTMENTS_SAVINGS_INTEREST_INCOME]:
                      e.target.value,
                  }))
                }
              />
            </label>

            <label htmlFor="">
              <h1 className="my-10">Debt</h1>
              <Slide
                min="0"
                max="20000000"
                steps={10}
                value={formFields.DEBT}
                onChange={(e) =>
                  setFormFields((preState) => ({
                    ...preState,
                    [FIELDS.DEBT]: e.target.value,
                  }))
                }
              />
            </label>

            <div className="flex justify-between items-center text-secondary-100 my-16">
              <h1 className="">Practice Value</h1>
              <div className="border-2 rounded-2xl w-[45%] flex items-center justify-center border-secondary-100 py-3 px-7 ">
                $ {handleTotals()}
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <label htmlFor="">
              <h1 className="my-8">Annual Lifestyle Expenses</h1>
              <Slide
                disabled={disabledField?.includes(
                  FIELDS.ANNUAL_LIFE_STYLE_EXPENSES
                )}
                min="0"
                max="50000"
                steps={10}
                value={formFields.ANNUAL_LIFE_STYLE_EXPENSES}
                onChange={(e) =>
                  setFormFields((preState) => ({
                    ...preState,
                    [FIELDS.ANNUAL_LIFE_STYLE_EXPENSES]: e.target.value,
                  }))
                }
              />
            </label>

            <label className="flex gap-3 items-center my-12">
              <span className="block w-[21%]">
                Mortgage /<br />
                Rent
              </span>
              <div className="w-full">
                <Slide
                  disabled={disabledField?.includes(FIELDS.MORTGAGE_RENT)}
                  min="0"
                  max="25000"
                  steps={10}
                  value={formFields.MORTGAGE_RENT}
                  onChange={(e) =>
                    setFormFields((preState) => ({
                      ...preState,
                      [FIELDS.MORTGAGE_RENT]: e.target.value,
                    }))
                  }
                />
              </div>
            </label>

            <label className="flex gap-3 items-center my-12">
              <span className="block w-[21%]">
                Home <br />
                Expenses
              </span>
              <div className="w-full">
                <Slide
                  disabled={disabledField?.includes(FIELDS.HOME_EXPENSES)}
                  min="0"
                  max="10000"
                  steps={10}
                  value={formFields.HOME_EXPENSES}
                  onChange={(e) =>
                    setFormFields((preState) => ({
                      ...preState,
                      [FIELDS.HOME_EXPENSES]: e.target.value,
                    }))
                  }
                />
              </div>
            </label>
            <label className="flex gap-3 items-center">
              <span className="block w-[21%]">
                Groceries /<br /> Household
              </span>
              <div className="w-full">
                <Slide
                  disabled={disabledField?.includes(FIELDS.GROCERIES_HOUSEHOLD)}
                  min="0"
                  max="10000"
                  steps={10}
                  value={formFields.GROCERIES_HOUSEHOLD}
                  onChange={(e) =>
                    setFormFields((preState) => ({
                      ...preState,
                      [FIELDS.GROCERIES_HOUSEHOLD]: e.target.value,
                    }))
                  }
                />
              </div>
            </label>

            <label className="flex gap-3 items-center my-12">
              <span className="block w-[21%]">Education</span>
              <div className="w-full">
                <Slide
                  disabled={disabledField?.includes(FIELDS.EDUCATION)}
                  min="0"
                  max="10000"
                  steps={10}
                  value={formFields.EDUCATION}
                  onChange={(e) =>
                    setFormFields((preState) => ({
                      ...preState,
                      [FIELDS.EDUCATION]: e.target.value,
                    }))
                  }
                />
              </div>
            </label>
            <label className="flex gap-3 items-center my-12">
              <span className="block w-[21%]">Vehicle</span>
              <div className="w-full">
                <Slide
                  disabled={disabledField?.includes(FIELDS.VEHICLE)}
                  min="0"
                  max="10000"
                  steps={10}
                  value={formFields.VEHICLE}
                  onChange={(e) =>
                    setFormFields((preState) => ({
                      ...preState,
                      [FIELDS.VEHICLE]: e.target.value,
                    }))
                  }
                />
              </div>
            </label>

            <label className="flex gap-3 items-center">
              <span>
                Restaurants /<br />
                Entertainment
              </span>
              <div className="w-full">
                <Slide
                  disabled={disabledField?.includes(
                    FIELDS.RESTAURANTS_ENTERTAINMENT
                  )}
                  min="0"
                  max="10000"
                  steps={10}
                  value={formFields.RESTAURANTS_ENTERTAINMENT}
                  onChange={(e) =>
                    setFormFields((preState) => ({
                      ...preState,
                      [FIELDS.RESTAURANTS_ENTERTAINMENT]: e.target.value,
                    }))
                  }
                />
              </div>
            </label>
            <label className="flex gap-3 items-end my-12">
              <span>Other</span>
              <div className="w-full">
                <Slide
                  disabled={disabledField?.includes(FIELDS.OTHER)}
                  min="0"
                  max="10000"
                  steps={10}
                  value={formFields.OTHER}
                  onChange={(e) =>
                    setFormFields((preState) => ({
                      ...preState,
                      [FIELDS.OTHER]: e.target.value,
                    }))
                  }
                />
              </div>
            </label>
          </>
        );
      case 4:
        return (
          <>
            <div className="flex justify-between items-center text-secondary-100 ">
              <h1 className="">Practice Valuation</h1>
              <div className="border-2 rounded-2xl w-[45%] flex items-center justify-center border-secondary-100 py-3 px-7 ">
                $ {handleTotals()}
              </div>
            </div>

            <div className="border-2 rounded-2xl text-secondary-100 mx-auto mt-14 text-center border-secondary-100 py-8 px-20">
              <h1 className="text-xl text-black font-bold ">FIT Number</h1>
              <hr className="w-[90%] mx-auto my-1 border-secondary-100" />
              <p className="text-lg text-black">
                Your practice could be worth:
              </p>
              <h2 className="font-bold text-3xl mt-1 text-secondary-50">
                {handleFitNumber()}
              </h2>
            </div>
            <i className="text-center block mt-5 text-secondary-100 w-[80%] mx-auto">
              Your FIT # is your Financial Independent Target. SDP helps you
              reach the lifestyle you've worked hard for.
            </i>

            <div className="mt-10 text-center text-xl">
              <h4 className="w-[80%]  mx-auto ">
                Estimate values only. Contact us for your personalized practice
                evaluation.
              </h4>
              <p className="w-[73%] mt-3 font-light mx-auto ">
                Book a time to speak with our partners to learn about your
                options.
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <Layout
      title={formTitle}
      handleNext={() => {
        if (formStep === 1) {
          setTotals((prev) => [
            ...prev,
            {
              field: TOTALS_FIELDS.PRACTICE_VALUAION_FIRST,
              total: earningBeforeTax() * 7.5,
            },
          ]);
        } else if (formStep === 2) {
          setTotals((prev) => [
            ...prev,
            {
              field: TOTALS_FIELDS.PRACTICE_VALUAION_SECOND,
              total:
                earningBeforeTax() * 7.5 +
                formFields[FIELDS.DEBT] +
                formFields[FIELDS.INVESTMENTS_SAVINGS_INTEREST_INCOME],
            },
          ]);
        } else if (formStep === 3) {
          // setTotals((prev) => [
          //   ...prev,
          //   {
          //     field: TOTALS_FIELDS.FIT_NUMBER,
          //     total: handleFitNumber(),
          //   },
          // ]);
        }

        handleNext();
      }}
      formStep={formStep}
    >
      {renderForm()}
    </Layout>
  );
}

export default App;
