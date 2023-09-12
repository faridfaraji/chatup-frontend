import { useTranslation } from "react-i18next"

export const ChatMetadata = ({ metadata }) => {
    const { t } = useTranslation();

    return (
        <div className="live-chat-info">
            <div style={{ display: "inline-flex" }}>
                <div className="badge live-badge">
                    <span className="dot live-dot" />
                    {t("ChatHistory.live")}
                </div>
                {
                    metadata && metadata.city && metadata.country &&
                    <div className="live-chat-meta">
                        {` - ${metadata.city}, ${metadata.country}`}
                    </div>
                }
                {
                    metadata && metadata.country &&
                    <span className={`fi fi-${metadata.country.toLowerCase()} fi`}></span>
                }
            </div>
            {
                metadata &&
                <div className="live-chat-meta">
                    {`IP: ${metadata.ip}`}
                </div>
            }
        </div>
    )
}
