import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { FitNumberCard } from "./components/FitNumberCard";
import Layout from "./components/Layout";
import { Slide } from "./components/Slide";

const titles = ["PRACTICE VALUATION", "INVESTMENTS", "LIFESTYLE", "SUMMARY"];

function App() {
  const [fitNumber, setFitNumber] = useState(0);
  const [formStep, setFormStep] = useState(1);
  const [activeTab, setActiveTab] = useState(1);
  const [formTitle, setFormTitle] = useState("SUMMARY");

  const handleNext = () => {
    setFormStep(formStep + 1);
    setFormTitle(titles[formStep]);
  };

  const handleSubmit = () => {};

  const handleFitNumber = (value: number) => {};

  useEffect(() => {
    setFormTitle(titles[formStep - 1]);
  }, [formStep]);

  const renderForm = () => {
    switch (formStep) {
      case 1:
        return (
          <>
            <label htmlFor="">
              <h1 className="my-8"> Annual Production</h1>
              <Slide min="0" max="100" steps={10} />
            </label>

            <label className="flex gap-3 items-center my-12">
              <span>
                Dental <br /> Production
              </span>
              <div className="w-full">
                <Slide min="0" max="100" steps={10} />
              </div>
            </label>

            <label className="flex gap-3 items-center">
              <span>
                Hygiene <br /> Production
              </span>
              <div className="w-full">
                <Slide min="0" max="100" steps={10} />
              </div>
            </label>
            <label htmlFor="">
              <h1 className="my-10">Total Practice Expenses</h1>
              <Slide min="0" max="100" steps={10} />
            </label>

            <div className="flex justify-between items-center text-secondary-100 my-16">
              <h1 className="">Practice Valuation</h1>
              <div className="border-2 rounded-2xl w-[45%] flex items-center justify-center border-secondary-100 py-3 px-7 ">
                $ 1.3M
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <label htmlFor="">
              <h1 className="my-8">Investments + Savings + Interest Income</h1>
              <Slide min="0" max="100" steps={10} />
            </label>

            <label htmlFor="">
              <h1 className="my-10">Debt</h1>
              <Slide min="0" max="100" steps={10} />
            </label>

            <div className="flex justify-between items-center text-secondary-100 my-16">
              <h1 className="">Practice Value</h1>
              <div className="border-2 rounded-2xl w-[45%] flex items-center justify-center border-secondary-100 py-3 px-7 ">
                $ 1.3M
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <label htmlFor="">
              <h1 className="my-8">Annual Lifestyle Expenses</h1>
              <Slide min="0" max="100" steps={10} />
            </label>

            <label className="flex gap-3 items-center my-12">
              <span className="block w-[21%]">
                Mortgage /<br />
                Rent
              </span>
              <div className="w-full">
                <Slide min="0" max="100" steps={10} />
              </div>
            </label>

            <label className="flex gap-3 items-center my-12">
              <span className="block w-[21%]">
                Home <br />
                Expenses
              </span>
              <div className="w-full">
                <Slide min="0" max="100" steps={10} />
              </div>
            </label>
            <label className="flex gap-3 items-center">
              <span className="block w-[21%]">
                Groceries /<br /> Household
              </span>
              <div className="w-full">
                <Slide min="0" max="100" steps={10} />
              </div>
            </label>

            <label className="flex gap-3 items-center my-12">
              <span className="block w-[21%]">Education</span>
              <div className="w-full">
                <Slide min="0" max="100" steps={10} />
              </div>
            </label>
            <label className="flex gap-3 items-center my-12">
              <span className="block w-[21%]">Vehicle</span>
              <div className="w-full">
                <Slide min="0" max="100" steps={10} />
              </div>
            </label>

            <label className="flex gap-3 items-center">
              <span>
                Restaurants /<br />
                Entertainment
              </span>
              <div className="w-full">
                <Slide min="0" max="100" steps={10} />
              </div>
            </label>
            <label className="flex gap-3 items-end my-12">
              <span>Other</span>
              <div className="w-full">
                <Slide min="0" max="100" steps={10} />
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
                $ 1.3M
              </div>
            </div>

            <div className="border-2 rounded-2xl text-secondary-100 mx-auto mt-14 text-center border-secondary-100 py-8 px-20">
              <h1 className="text-xl text-black font-bold ">FIT Number</h1>
              <hr className="w-[90%] mx-auto my-1 border-secondary-100" />
              <p className="text-lg text-black">
                Your practice could be worth:
              </p>
              <h2 className="font-bold text-3xl mt-1 text-secondary-50">
                $ 193,012
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
    <Layout title={formTitle} handleNext={handleNext} formStep={formStep}>
      {renderForm()}
    </Layout>
  );
}

export default App;
