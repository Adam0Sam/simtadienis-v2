import { useIntl } from "react-intl";
import { forwardRef } from "react";

const FormInput = forwardRef(function ({ id, customClassNames, placeholder, onValueChange, type, inputValue, ...props }, ref) {
    const intl = useIntl();

    const textIdList = ['name', 'surname'];

    return (
        <input
            className={`${id ? `form-${id}` : ''} ${customClassNames ? customClassNames : ''}`}
            type={`${type ? type : (textIdList.includes(id) ? 'text' : 'password')}`}
            placeholder={placeholder ? placeholder : (id ? intl.formatMessage({ id: id }) : '...')}
            id={id}
            required
            onChange={onValueChange}
            value={inputValue}
            ref={ref}
            {...props}
        />
    )
})

export default FormInput;