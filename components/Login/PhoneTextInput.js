import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Box, FormControl, Input, } from 'native-base'
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
                <Input
                    className="bg-gray-50 py-2.5  text-gray-900 text-sm rounded-md px-4"
                    borderColor={'#F78F43'}
                    ref={ref}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    autoCompleteType={autoComplete}
                    keyboardType="phone-pad"
                    onChangeText={onChangeText}
                    onSubmitEditing={Keyboard.dismiss}
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