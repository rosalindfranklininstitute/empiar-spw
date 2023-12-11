import { Link, useRouteError } from "react-router-dom";

export function WorkFlowError() {
    const error:any = useRouteError();
    return (
        <>
            <div>Error..!!</div>
            <p>{error.message}</p>
            <div>Go to <Link to="/">Home Page</Link></div>
        </>
    );
}