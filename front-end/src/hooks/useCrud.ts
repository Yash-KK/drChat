import useAxioxWithInterceptor from "../helpers/jwtInteceptor";
import { BASE_URL } from "../../config";
import { useState } from "react";

interface IuseCrud<T> {
    dataCRUD: T[];
    fetchData: () => Promise<void>;
    error: Error | null;
    isLoading: boolean;
}

const useCrud = <T>(initialData: T[], apiURL: string): IuseCrud<T> => {
    const jwtAxios = useAxioxWithInterceptor();
    const [dataCRUD, setDataCRUD] = useState<T[]>(initialData);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {});
            const data = response.data;

            setDataCRUD(data);
            setError(null);

            setIsLoading(false);
            return data;
        } catch (error: any) {
            setIsLoading(false);
            throw error;
        }
    };

    return { fetchData, dataCRUD, error, isLoading };
};

export default useCrud;
