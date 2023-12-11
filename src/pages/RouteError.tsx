import { Link } from "react-router-dom";

export function RoutError() {
    return (
        <>
            <div>Route not found</div>
            <div>Go to <Link to="/">Home Page</Link></div>
        </>
    );
}