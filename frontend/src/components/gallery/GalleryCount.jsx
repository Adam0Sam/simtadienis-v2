import { forwardRef, useImperativeHandle, useState } from "react"

import { FormattedMessage } from "react-intl";

/**
 * Renders a component that displays the count of submitted items in a gallery.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.totalCnt - The total count of items in the gallery.
 * @param {React.Ref} ref - The ref object used to access the component's imperative methods.
 * @returns {JSX.Element} The rendered component.
 */
const GalleryCount = forwardRef(function GalleryCount({ totalCnt }, ref) {
    const [submittedCount, setSubmittedCount] = useState(0);

    useImperativeHandle(ref, () => ({
        /**
         * Increases the count of submitted items by 1.
         */
        increaseCnt: () => {
            setSubmittedCount(prevCnt => prevCnt + 1);
        },
        /**
         * Decreases the count of submitted items by 1.
         */
        decreaseCnt: () => {
            setSubmittedCount(prevCnt => prevCnt - 1);
        },
        /**
         * Clears the count of submitted items.
         */
        clearCnt: () => {
            setSubmittedCount(0);
        }
    }))

    return (
        <p className='gallery-info'>
            <FormattedMessage id='submitted' />
            <span className='digit'> {submittedCount} / {totalCnt}</span>
        </p>
    )
})

export default GalleryCount;