import { createContext, useContext } from 'react';

const SelectContext = createContext<{
    selectedOption: string;
    changeSelectedOption: (option: string) => void;
}>({
            selectedOption: '',
            changeSelectedOption: (option: string) => undefined
        });

const useSelectContext = () => {
    const context = useContext(SelectContext);
    if (!context) {
        throw new Error('Error in creating the context');
    }
    return context;
};

export { useSelectContext, SelectContext };
