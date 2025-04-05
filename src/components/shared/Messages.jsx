import { FormattedMessage } from "react-intl";

export const InfoMessage = ({id, className}) => {
    return (
        <>
            <span className={`text-info ${className}`}>
                <FormattedMessage id={id}/>
            </span>
        </>
    );
}

export const Message = ({id}) => {
    return (
        <>
            <FormattedMessage id={id}/>
        </>
    );
}