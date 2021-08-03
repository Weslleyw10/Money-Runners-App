import React from 'react'
import { Input } from '../index'
import { TextInputMask } from 'react-native-masked-text'

const TextInputMaskComponent = (inputProps) => {
    return (
        <Input
            {...inputProps}
            render={(props) => <TextInputMask {...props} />}
        />
    );
};

export default TextInputMaskComponent;
