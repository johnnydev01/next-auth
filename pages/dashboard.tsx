import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { setuAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {

    const {user} = useContext(AuthContext);
    useEffect(() => {
        api.get('/me').then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }, [])
    return (
        <h1>Dashboard {user?.email}</h1>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

    const apiClient = setuAPIClient(ctx as any);

    const response = await apiClient.get('/me');

    return {
        props: {}
    }
})