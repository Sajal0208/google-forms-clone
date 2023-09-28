import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

export default function MyForms () {
    const currentUser = useUser();
    if(!currentUser) return null;
    const forms = api.forms.getAllForms.useQuery();

    return (
        <>
            <h1>My Forms</h1> 
        </>
    );
}