import { FC, PropsWithChildren } from "react";

const Layout: FC<
  PropsWithChildren & {
    handleNext: () => void;
    formStep: number;
    title: string;
  }
> = ({ children, handleNext, title, formStep }) => {
  return (
    <div className="flex overflow-hidden rounded-3xl mx-auto border flex-col items-center w-[700px] pb-20 shadow-2xl">
      <ul className="flex items-center justify-between w-full">
        {[1, 2, 3].map((item, index) => (
          <li
            className={`step ${
              formStep == item ? " bg-white" : "bg-primary-50"
            }`}
          >
            Step {item}
          </li>
        ))}
      </ul>

      <div className="w-full px-28 py-10">
        <h1 className="flex uppercase mb-10 font-bold items-center flex-col relative before:absolute before:h-[6px] before:mt-1 before:rounded-md before:w-full before:bg-primary-50 before:top-full">
          {title}
        </h1>
        {children}
      </div>

      <button
        onClick={formStep === 4 ? () => alert("Form submitted") : handleNext}
        className="bg-secondary-100 uppercase text-white cursor-pointer w-[50%] rounded-lg px-10 py-4 font-bold text-lg"
      >
        {formStep === 3 ? "Calculate" : formStep === 4 ? "Contact us" : "Next"}
      </button>
    </div>
  );
};

export default Layout;
