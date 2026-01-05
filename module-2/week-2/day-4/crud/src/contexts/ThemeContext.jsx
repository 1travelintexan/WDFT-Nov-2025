import { createContext, useState } from "react";

//first thing is to create the context
const ThemeContext = createContext();

//second is to create a wrapper
const ThemeWrapper = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(true);
  return (
    <ThemeContext.Provider
      value={{ darkTheme, petName: "Ragnar", setDarkTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

//third is export the wrapper and context and make sure to 'wrap' your <App/>
export { ThemeContext, ThemeWrapper };
