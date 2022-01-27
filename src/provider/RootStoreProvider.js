import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

const StoreContext = createContext(undefined);

export function useRootStore() {
    //Custom Hook -- use to access the context
    const context = useContext(StoreContext); //Accepts context obj
    if (context === undefined) {
        throw new Error(
            "useRootStore must be used within rootStoreProvider"
        );
    }

    return context;
}

export function RootStoreProvider({ children, RootStore }) {
    const root = RootStore;

    return (
        <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
    );
}

RootStoreProvider.propTypes = {
    rootStore: PropTypes.object,
    children: PropTypes.any,
};
