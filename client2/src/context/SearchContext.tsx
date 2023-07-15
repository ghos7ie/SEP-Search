import { Dispatch, SetStateAction, createContext, ReactNode, useState } from "react";

export type Region = {
    id: string;
    name: string;
}

export type Country = {
    id: string;
    region_id: number;
    name: string;
}

export type Faculty = {
    id: string;
    name: string;
}

export type Course = {
    id: string;
    name: string;
}

export type Search = {
    region: Region[];
    country: Country[];
    faculty: Faculty[];
    com_courses: Course[];
    op_courses: Course[];
};

export interface SearchContextInterface {
    search: Search
    setSearch: Dispatch<SetStateAction<Search>>
}

const defaultSearchState = {
    search: {
        region: [],
        country: [],
        faculty: [],
        com_courses: [],
        op_courses: []
    },
    setSearch: (search: Search) => { }
} as SearchContextInterface;

export const SearchContext = createContext(defaultSearchState);

type SearchProviderProps = {
    children: ReactNode
}

export default function SearchContextProvider({ children }: SearchProviderProps) {
    const [search, setSearch] = useState<Search>({
        region: [],
        country: [],
        faculty: [],
        com_courses: [],
        op_courses: []
    });
    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    )
}