import { useEffect, useState } from "react";
import { useActivePlan } from "../hooks";

export const AccessWrapper = ({ minimum, children }) => {
    const getPlan = useActivePlan();
    const [accessLevel, setAccessLevel] = useState(100);
    const loadAccess = () => getPlan().then((data) => setAccessLevel(parseInt(data.name.slice(1, 2))))
    useEffect(() => loadAccess(), [])

    if (accessLevel >= minimum) {
        return children
    } else {
        // If the user doesn't have access, display the grayed-out blocker and the message.
        return (
            <div className="blocked-wrapper">
                <div className="blocked-overlay" />
                <div className="blocked-message">
                    <p>You need to upgrade your plan to access this content.</p>
                    <a >Upgrade Now</a>
                </div>
                <div className="blocked-child">{children}</div>
            </div>
        );
    }
};

