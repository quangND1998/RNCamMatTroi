import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { TextInput } from 'react-native'
import { Box, FormControl } from 'native-base'
function PhoneTextInput({
    placeholder,
    autoComplete,
    autoFocus,
    value,
    onChange
}, ref) {
    // Instead of `onChangeText` it could use `onChange` and get `value` from `nativeEvent.text`.
    const onChangeText = useCallback((value) => {
        onChange({
            preventDefault() { this.defaultPrevented = true },
            target: { value }
        })
    }, [onChange])
    return (
        <Box className="my-3 relative flex pr-10">
            <TextInput
                className="bg-gray-50 border py-2.5 border-[#F78F43] text-gray-900 text-sm rounded-lg px-4"
                ref={ref}
                placeholder={placeholder}
                autoFocus={autoFocus}
                autoCompleteType={autoComplete}
                keyboardType="phone-pad"
                onChangeText={onChangeText}
                value={value} />
        </Box>
    )
}

PhoneTextInput = React.forwardRef(PhoneTextInput)

PhoneTextInput.propTypes = {
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default PhoneTextInput